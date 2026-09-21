import '../../shared/network';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { config } from '../../config';
import { Logger } from '../../shared/logger';
import { GmailApiService, SendEmailOptions } from '../../shared/gmail.service';
import { ProjectRequest } from '../projectRequests/projectRequest.types';

let transporterInstance: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!config.smtp.user || !config.smtp.pass) {
    return null;
  }
  if (!transporterInstance) {
    const smtpHost = config.smtp.host || 'smtp.gmail.com';
    const smtpPort = config.smtp.port || 465;

    transporterInstance = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: config.smtp.secure !== false,
      family: 4,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
      tls: {
        servername: smtpHost,
      },
    } as any);
  }
  return transporterInstance;
}

export class NotificationService {
  /**
   * Internal helper to dispatch email via Gmail REST API (preferred on Render)
   * or fallback to SMTP if configured.
   */
  private static async dispatchEmail(options: SendEmailOptions, label: string): Promise<void> {
    if (GmailApiService.isConfigured()) {
      try {
        await GmailApiService.sendEmail(options);
        Logger.info(`${label} successfully delivered via Gmail API to ${options.to}`);
        return;
      } catch (err: any) {
        Logger.error(`Failed to dispatch ${label} via Gmail API: ${err.message}`);
        return;
      }
    }

    const transporter = getTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: options.from,
          to: options.to,
          replyTo: options.replyTo,
          subject: options.subject,
          text: options.text,
          html: options.html,
        });
        Logger.info(`${label} delivered via fallback SMTP to ${options.to}`);
        return;
      } catch (err: any) {
        Logger.error(`Failed to dispatch ${label} via SMTP: ${err.message}`);
        return;
      }
    }

    Logger.warn(
      `Email service not active for ${label}! Please configure GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, ` +
      `and GMAIL_REFRESH_TOKEN in your Render Environment Variables dashboard to send live emails via Gmail API.`
    );
  }

  static async sendProjectRequestNotifications(request: ProjectRequest): Promise<void> {
    const ownerEmailContent = `
=== NEW PROJECT REQUEST RECEIVED ===
Reference Number: ${request.referenceNumber}
Service Type: ${request.serviceType}
Project Size: ${request.projectSize}
Budget: ${request.budgetRange}
Title: ${request.title}
Client: ${request.contact.name} (${request.contact.email}, ${request.contact.phone || 'No phone provided'})
Preferred Method: ${request.contact.preferredMethod}
Outcome: ${request.desiredOutcome}
Description: ${request.description}
Attachments Count: ${request.attachments?.length || 0}
====================================
`;

    const clientConfirmationContent = `
=== CONFIRMATION SENT TO CLIENT ===
To: ${request.contact.email}
Subject: Your Project Request [${request.referenceNumber}] Received - Nikhil Kumar
Dear ${request.contact.name},

Thank you for reaching out with your project requirement: "${request.title}".
Your request has been safely logged with Reference ID: ${request.referenceNumber}.

Next Steps:
1. I will review your requirements, scope, and any attached specifications.
2. I will get back to you via ${request.contact.preferredMethod.toUpperCase()} within 24-48 business hours with an initial assessment and questions or preliminary quote.

Best regards,
Nikhil Kumar
Full-Stack Developer & AI Solutions
WhatsApp: +91 6202591561
====================================
`;

    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0B1020; color: #F7F9FC; margin: 0; padding: 20px; }
    .card { background-color: #121A2E; border: 1px solid rgba(110, 231, 242, 0.2); border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 32px; }
    .header { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 20px; margin-bottom: 24px; }
    .token-box { background: rgba(110, 231, 242, 0.1); border: 1px dashed #6EE7F2; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0; }
    .token-label { font-size: 12px; color: #AAB5CC; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .token-number { font-family: monospace; font-size: 24px; font-weight: bold; color: #6EE7F2; letter-spacing: 0.05em; }
    .details { background: rgba(255,255,255,0.03); border-radius: 8px; padding: 16px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; }
    .details div { margin-bottom: 8px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #6EE7F2, #22B8CF); color: #070B14; font-weight: bold; padding: 12px 24px; border-radius: 30px; text-decoration: none; margin-top: 12px; }
    .footer { font-size: 12px; color: #7E8DA6; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2 style="margin: 0; color: #F7F9FC;">Nikhil Kumar</h2>
      <p style="margin: 4px 0 0 0; color: #AAB5CC; font-size: 13px;">Full-Stack Developer & AI Product Integrator</p>
    </div>

    <h3 style="color: #F7F9FC;">Your Project Request is Confirmed!</h3>
    <p style="color: #AAB5CC; font-size: 14px; line-height: 1.6;">
      Dear ${request.contact.name},<br><br>
      Thank you for submitting your project requirement: <strong>"${request.title}"</strong>.
      I have safely received your submission and specs.
    </p>

    <div class="token-box">
      <div class="token-label">Your Project Reference Number</div>
      <div class="token-number">${request.referenceNumber}</div>
    </div>

    <div class="details">
      <div><strong>Service Requested:</strong> ${request.serviceType}</div>
      <div><strong>Estimated Scope:</strong> ${request.projectSize}</div>
      <div><strong>Budget Range:</strong> ${request.budgetRange}</div>
      <div><strong>Target Deadline:</strong> ${request.desiredDeadline || 'Flexible'}</div>
      <div><strong>Desired Outcome:</strong> ${request.desiredOutcome}</div>
    </div>

    <h4 style="color: #F7F9FC; margin-bottom: 8px;">What Happens Next?</h4>
    <ol style="color: #AAB5CC; font-size: 14px; padding-left: 20px; line-height: 1.6;">
      <li>I will personally review your requirements, scope, and any attached files.</li>
      <li>I will contact you via <strong>${request.contact.preferredMethod.toUpperCase()}</strong> within 24–48 business hours with an assessment and preliminary quote.</li>
      <li>Work begins only after scope, pricing, and milestones are separately agreed.</li>
    </ol>

    <div style="text-align: center; margin-top: 24px;">
      <a href="https://wa.me/916202591561?text=${encodeURIComponent(`Hi Nikhil, I just submitted project request ${request.referenceNumber} ("${request.title}").`)}" class="btn">
        Chat on WhatsApp
      </a>
    </div>

    <div class="footer">
      Nikhil Kumar · Full-Stack &amp; AI Engineer · Phone/WhatsApp: +91 6202591561 · Email: nikhil42865@gmail.com
    </div>
  </div>
</body>
</html>
`;

    // Development console logs
    Logger.info('[PROJECT REQUEST RECEIVED - Owner Notification]', { content: ownerEmailContent.trim() });
    Logger.info('[CONFIRMATION DISPATCH - Client Receipt]', { content: clientConfirmationContent.trim() });

    const fromAddress = config.gmail.from.includes('<')
      ? config.gmail.from
      : `"Nikhil Kumar" <${config.gmail.user}>`;

    // 1. Send Alert to Owner (Nikhil)
    await this.dispatchEmail(
      {
        from: fromAddress,
        to: config.gmail.ownerEmail,
        subject: `[New Lead ${request.referenceNumber}] ${request.serviceType} - ${request.contact.name}`,
        text: ownerEmailContent,
      },
      'Owner notification'
    );

    // 2. Send Confirmation Receipt to Client
    await this.dispatchEmail(
      {
        from: fromAddress,
        to: request.contact.email,
        subject: `Your Project Request [${request.referenceNumber}] Received - Nikhil Kumar`,
        text: clientConfirmationContent,
        html: clientHtml,
      },
      'Client confirmation receipt'
    );
  }

  static async sendContactMessageNotification(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    const logContent = `
=== NEW CONTACT MESSAGE RECEIVED ===
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message: ${data.message}
====================================
`;
    Logger.info('[DEV CONTACT MESSAGE NOTIFICATION]', { content: logContent.trim() });

    const fromAddress = config.gmail.from.includes('<')
      ? config.gmail.from
      : `"Nikhil Kumar" <${config.gmail.user}>`;

    // 1. Send message to Owner
    await this.dispatchEmail(
      {
        from: fromAddress,
        to: config.gmail.ownerEmail,
        replyTo: data.email,
        subject: `[Portfolio Contact] ${data.subject} - from ${data.name}`,
        text: `You have received a new contact message:\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
      },
      'Live contact email to owner'
    );

    // 2. Send confirmation receipt to Sender
    await this.dispatchEmail(
      {
        from: fromAddress,
        to: data.email,
        subject: `Message Received - Nikhil Kumar`,
        text: `Hi ${data.name},\n\nThank you for reaching out through my portfolio. I have received your message regarding "${data.subject}" and will get back to you shortly.\n\nBest regards,\nNikhil Kumar\nFull-Stack & AI Engineer\nWhatsApp / Phone: +91 6202591561\nEmail: ${config.gmail.ownerEmail}`,
      },
      'Contact confirmation receipt to sender'
    );
  }
}
