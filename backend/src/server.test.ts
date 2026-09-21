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

