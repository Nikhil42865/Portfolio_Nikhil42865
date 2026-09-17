import { config } from '../../config';
import { Logger } from '../../shared/logger';
import { ProjectRequest } from '../projectRequests/projectRequest.types';

export class NotificationService {
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
====================================
`;

    if (!config.notifications.resendApiKey) {
      Logger.info('[DEV EMAIL NOTIFICATION - Owner]', { content: ownerEmailContent.trim() });
      Logger.info('[DEV EMAIL CONFIRMATION - Client]', { content: clientConfirmationContent.trim() });
      return;
    }

    // If Resend API key is configured, invoke HTTP fetch to Resend
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.notifications.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.notifications.fromEmail,
          to: config.notifications.ownerEmail,
          subject: `[New Lead ${request.referenceNumber}] ${request.serviceType} - ${request.contact.name}`,
          text: ownerEmailContent,
        }),
      });

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.notifications.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.notifications.fromEmail,
          to: request.contact.email,
          subject: `Your Project Request [${request.referenceNumber}] Received - Nikhil Kumar`,
          text: clientConfirmationContent,
        }),
      });
      Logger.info(`Live email notifications dispatched for request ${request.referenceNumber}`);
    } catch (err: any) {
      Logger.error(`Failed to send email via Resend API: ${err.message}`);
    }
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

    if (!config.notifications.resendApiKey) {
      return;
    }

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.notifications.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.notifications.fromEmail,
          to: config.notifications.ownerEmail,
          subject: `[Portfolio Contact] ${data.subject} - from ${data.name}`,
          text: `You have received a new contact message:\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
        }),
      });
      Logger.info(`Live contact email dispatched to ${config.notifications.ownerEmail}`);
    } catch (err: any) {
      Logger.error(`Failed to send contact email via Resend API: ${err.message}`);
    }
  }
}
