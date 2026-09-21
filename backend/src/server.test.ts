import { describe, it, expect } from 'vitest';
import { createProjectRequestSchema } from './modules/projectRequests/projectRequest.validation';
import { ProjectRequestRepository } from './modules/projectRequests/projectRequest.repository';

describe('Project Request Domain Logic', () => {
  it('generates unique reference numbers with current year prefix', () => {
    const ref1 = ProjectRequestRepository.generateReferenceNumber();
    const ref2 = ProjectRequestRepository.generateReferenceNumber();
    const currentYear = new Date().getFullYear().toString();

    expect(ref1).toContain(`PR-${currentYear}-`);
    expect(ref2).toContain(`PR-${currentYear}-`);
    expect(ref1).not.toBe(ref2);
  });

  it('validates a complete and legitimate project request', () => {
    const validPayload = {
      serviceType: 'React Development',
      projectSize: 'Medium project',
      budgetRange: '₹15,000–₹30,000',
      title: 'Real-time Analytics Dashboard',
      description: 'Need a performant dashboard with interactive charts and WebSocket data streaming.',
      desiredOutcome: 'Clean, responsive UI with sub-second data updates.',
      existingSystem: 'Existing Node.js backend with REST APIs.',
      hasDesign: 'yes',
      contact: {
        name: 'Sarah Connor',
        email: 'sarah@example.com',
        phone: '+91 9876543210',
        company: 'Cyberdyne Systems',
        preferredMethod: 'email',
      },
      consent: {
        accepted: true,
      },
      website_hp: '',
    };

    const parsed = createProjectRequestSchema.safeParse(validPayload);
    expect(parsed.success).toBe(true);
  });

  it('rejects submissions if automation is requested in V1', () => {
    const invalidPayload = {
      serviceType: 'Workflow Automation',
      projectSize: 'Small task',
      budgetRange: '₹2,000–₹5,000',
      title: 'Automate weekly reports',
      description: 'Send scheduled emails automatically from Google Sheets.',
      desiredOutcome: 'No manual work.',
      contact: {
        name: 'John Doe',
        email: 'john@example.com',
        preferredMethod: 'email',
      },
      consent: {
        accepted: true,
      },
    };

    const parsed = createProjectRequestSchema.safeParse(invalidPayload);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues[0].message).toContain('Automation is currently not available in Version 1');
    }
  });

  it('enforces phone requirement when whatsapp or phone is preferred method', () => {
    const payloadWithoutPhone = {
      serviceType: 'Backend/API Development',
      projectSize: 'Small project',
      budgetRange: '₹5,000–₹15,000',
      title: 'Authentication & Stripe API',
      description: 'Set up JWT authentication and webhook handling.',
      desiredOutcome: 'Secure endpoints with role-based access.',
      contact: {
        name: 'Alex Mercer',
        email: 'alex@example.com',
        preferredMethod: 'whatsapp',
        phone: '', // missing phone!
      },
      consent: {
        accepted: true,
      },
    };

    const parsed = createProjectRequestSchema.safeParse(payloadWithoutPhone);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const phoneError = parsed.error.issues.find((i) => i.path.includes('phone'));
      expect(phoneError).toBeDefined();
      expect(phoneError?.message).toContain('Phone number is required');
    }
  });

  it('detects and rejects spam via honeypot', () => {
    const botPayload = {
      serviceType: 'Website Development',
      projectSize: 'Small task',
      budgetRange: '₹2,000–₹5,000',
      title: 'Great Offer SEO',
      description: 'Boost your website ranking fast with backlinks.',
      desiredOutcome: 'Rank #1 on Google in 24 hours.',
      contact: {
        name: 'Spam Bot',
        email: 'bot@spam.com',
        preferredMethod: 'email',
      },
      consent: {
        accepted: true,
      },
      website_hp: 'http://spam-trap.com', // Bot filled the invisible honeypot field
    };

    const parsed = createProjectRequestSchema.safeParse(botPayload);
    expect(parsed.success).toBe(false);
  });
});

describe('Network & IPv4 Routing Constraints', () => {
  it('ensures dns.Resolver does not resolve unreachable IPv6 addresses for Nodemailer', async () => {
    const dns = await import('node:dns');
    await import('./shared/network');

    const resolver = new dns.Resolver();
    return new Promise<void>((resolve, reject) => {
      resolver.resolve6('smtp.gmail.com', (err, addresses) => {
        if (err) {
          reject(err);
          return;
        }
        expect(addresses).toEqual([]);
        resolve();
      });
    });
  });
});

describe('Gmail API REST Service', () => {
  it('creates valid RFC 2822 base64url encoded message with headers and multipart body', async () => {
    const { GmailApiService } = await import('./shared/gmail.service');

    const rawBase64Url = GmailApiService.createMimeMessage({
      to: 'client@example.com',
      subject: 'Test Subject with Unicode: ✨ Project Confirmed',
      text: 'Hello, this is plain text content.',
      html: '<h1>Hello</h1><p>This is HTML content.</p>',
      from: '"Nikhil Kumar" <nikhil42865@gmail.com>',
      replyTo: 'reply@example.com',
    });

    expect(typeof rawBase64Url).toBe('string');
    expect(rawBase64Url.length).toBeGreaterThan(50);
    // RFC 4648 base64url characters only: [A-Za-z0-9_-]
    expect(rawBase64Url).toMatch(/^[A-Za-z0-9_-]+$/);

    // Decode base64url back to utf-8 text
    let base64 = rawBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');

    expect(decoded).toContain('To: client@example.com');
    expect(decoded).toContain('From: "Nikhil Kumar" <nikhil42865@gmail.com>');
    expect(decoded).toContain('Reply-To: reply@example.com');
    expect(decoded).toContain('MIME-Version: 1.0');
    expect(decoded).toContain('multipart/alternative');
    expect(decoded).toContain('Hello, this is plain text content.');
    expect(decoded).toContain('<h1>Hello</h1><p>This is HTML content.</p>');
  });

  it('correctly detects if Gmail API is configured based on credentials presence', async () => {
    const { GmailApiService } = await import('./shared/gmail.service');
    const { config } = await import('./config');

    const originalClientId = config.gmail.clientId;
    const originalClientSecret = config.gmail.clientSecret;
    const originalRefreshToken = config.gmail.refreshToken;

    // Test with missing credentials
    config.gmail.clientId = '';
    config.gmail.clientSecret = '';
    config.gmail.refreshToken = '';
    expect(GmailApiService.isConfigured()).toBe(false);

    // Test with complete credentials
    config.gmail.clientId = 'mock-client-id.apps.googleusercontent.com';
    config.gmail.clientSecret = 'mock-client-secret';
    config.gmail.refreshToken = '1//mock-refresh-token';
    expect(GmailApiService.isConfigured()).toBe(true);

    // Restore
    config.gmail.clientId = originalClientId;
    config.gmail.clientSecret = originalClientSecret;
    config.gmail.refreshToken = originalRefreshToken;
  });
});


