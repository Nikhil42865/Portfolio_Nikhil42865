import { z } from 'zod';

export const createProjectRequestSchema = z
  .object({
    serviceType: z
      .string()
      .min(1, 'Please select a service type.')
      .refine(
        (val) => !val.toLowerCase().includes('automation'),
        'Automation is currently not available in Version 1 services.'
      ),
    projectSize: z.string().min(1, 'Please select a project size.'),
    budgetRange: z.string().min(1, 'Please select a budget range.'),
    title: z.string().min(3, 'Title must be at least 3 characters.').max(150),
    description: z.string().min(10, 'Description must be at least 10 characters.').max(5000),
    existingSystem: z.string().max(2000).optional(),
    desiredOutcome: z.string().min(5, 'Desired outcome must be at least 5 characters.').max(1000),
    hasDesign: z.enum(['yes', 'no', 'partial', 'not_sure']).optional(),
    desiredDeadline: z.string().optional(),
    referenceUrl: z
      .string()
      .url('Please provide a valid URL (including https://)')
      .optional()
      .or(z.literal('')),
    contact: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters.').max(100),
      email: z.string().email('Please enter a valid email address.'),
      phone: z.string().max(25).optional().or(z.literal('')),
      company: z.string().max(100).optional().or(z.literal('')),
      preferredMethod: z.enum(['email', 'whatsapp', 'phone']),
    }),
    consent: z.object({
      accepted: z.literal(true, {
        errorMap: () => ({ message: 'You must agree to be contacted regarding this request.' }),
      }),
    }),
    attachments: z
      .array(
        z.object({
          id: z.string(),
          originalName: z.string(),
          fileName: z.string(),
          path: z.string(),
          mimeType: z.string(),
          size: z.number(),
          uploadedAt: z.string(),
        })
      )
      .optional()
      .default([]),
    // Honeypot field for anti-spam
    website_hp: z.string().max(0, 'Spam detected.').optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    // If preferred method is whatsapp or phone, phone is required
    if (
      (data.contact.preferredMethod === 'whatsapp' || data.contact.preferredMethod === 'phone') &&
      (!data.contact.phone || data.contact.phone.trim().length < 6)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number is required when WhatsApp or Phone is selected as preferred contact method.',
        path: ['contact', 'phone'],
      });
    }
  });

export const updateProjectRequestStatusSchema = z.object({
  status: z.enum([
    'New',
    'Reviewing',
    'Need More Information',
    'Quote Sent',
    'Accepted',
    'In Progress',
    'Completed',
    'Declined',
    'Spam',
  ]),
});

export const addProjectRequestNoteSchema = z.object({
  text: z.string().min(1, 'Note cannot be empty.').max(2000),
});
