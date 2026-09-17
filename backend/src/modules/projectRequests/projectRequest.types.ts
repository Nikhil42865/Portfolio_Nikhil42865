export type ProjectRequestStatus =
  | 'New'
  | 'Reviewing'
  | 'Need More Information'
  | 'Quote Sent'
  | 'Accepted'
  | 'In Progress'
  | 'Completed'
  | 'Declined'
  | 'Spam';

export interface AttachmentMetadata {
  id: string;
  originalName: string;
  fileName: string;
  path: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

export interface AdminNote {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface ProjectRequest {
  id: string;
  referenceNumber: string;
  serviceType: string;
  projectSize: string;
  budgetRange: string;
  title: string;
  description: string;
  existingSystem?: string;
  desiredOutcome: string;
  hasDesign?: 'yes' | 'no' | 'partial' | 'not_sure';
  desiredDeadline?: string;
  referenceUrl?: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    preferredMethod: 'email' | 'whatsapp' | 'phone';
  };
  consent: {
    accepted: boolean;
    acceptedAt: string;
  };
  status: ProjectRequestStatus;
  attachments: AttachmentMetadata[];
  notes: AdminNote[];
  notification: {
    ownerStatus: 'pending' | 'sent' | 'failed';
    clientStatus: 'pending' | 'sent' | 'failed';
    retryCount: number;
  };
  source?: {
    page?: string;
  };
  createdAt: string;
  updatedAt: string;
}
