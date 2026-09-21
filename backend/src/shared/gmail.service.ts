import { config } from '../config';

export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  from?: string;
}

export class GmailApiService {
  private static cachedAccessToken: string | null = null;
  private static tokenExpiresAt: number = 0;

  /**
   * Check if Gmail API credentials are fully configured.
   */
  static isConfigured(): boolean {
    const { clientId, clientSecret, refreshToken } = config.gmail;
    return Boolean(clientId && clientSecret && refreshToken);
  }

  /**
   * Retrieve a valid access token using the OAuth 2.0 refresh token.
   */
  static async getAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.cachedAccessToken && now < this.tokenExpiresAt - 60000) {
      return this.cachedAccessToken;
    }

    const { clientId, clientSecret, refreshToken } = config.gmail;
    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error(
        'Gmail API credentials missing. Ensure GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN are set in your environment variables.'
      );
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const data = (await tokenResponse.json()) as any;

    if (!tokenResponse.ok || !data.access_token) {
      const errorMsg = data.error_description || data.error || tokenResponse.statusText;
      throw new Error(`Failed to refresh Google OAuth access token: ${errorMsg}`);
    }

    this.cachedAccessToken = data.access_token;
    const expiresInMs = (data.expires_in || 3600) * 1000;
    this.tokenExpiresAt = now + expiresInMs;

    return data.access_token;
  }

  /**
   * Compose an RFC 2822 MIME formatted message and encode as base64url.
   */
  static createMimeMessage(options: SendEmailOptions): string {
    const boundary = `====boundary_${Date.now().toString(16)}====`;
    const fromAddress = options.from || `"Nikhil Kumar" <${config.gmail.user}>`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(options.subject, 'utf-8').toString('base64')}?=`;

    const headers: string[] = [
      `From: ${fromAddress}`,
      `To: ${options.to}`,
      `Subject: ${encodedSubject}`,
      `MIME-Version: 1.0`,
    ];

    if (options.replyTo) {
      headers.push(`Reply-To: ${options.replyTo}`);
    }

    let mimeBody = '';

    if (options.html && options.text) {
      headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);
      mimeBody = [
        `--${boundary}`,
        `Content-Type: text/plain; charset="UTF-8"`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        options.text,
        ``,
        `--${boundary}`,
        `Content-Type: text/html; charset="UTF-8"`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        options.html,
        ``,
        `--${boundary}--`,
      ].join('\r\n');
    } else if (options.html) {
      headers.push(`Content-Type: text/html; charset="UTF-8"`);
      mimeBody = options.html;
    } else {
      headers.push(`Content-Type: text/plain; charset="UTF-8"`);
      mimeBody = options.text || '';
    }

    const fullMessage = `${headers.join('\r\n')}\r\n\r\n${mimeBody}`;

    // Base64URL encoding (RFC 4648 §5)
    return Buffer.from(fullMessage, 'utf-8')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  /**
   * Dispatch an email via the Gmail REST API (POST https://gmail.googleapis.com/gmail/v1/users/me/messages/send).
   */
  static async sendEmail(options: SendEmailOptions): Promise<{ id: string; threadId: string }> {
    const accessToken = await this.getAccessToken();
    const rawMessage = this.createMimeMessage(options);

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: rawMessage,
      }),
    });

    const result = (await response.json()) as any;

    if (!response.ok) {
      const errorMsg = result.error?.message || response.statusText;
      throw new Error(`Gmail API HTTP ${response.status}: ${errorMsg}`);
    }

    return { id: result.id, threadId: result.threadId };
  }
}
