import mongoose, { Schema, Document } from 'mongoose';
import { ProjectRequest } from './projectRequest.types';

export type ProjectRequestDocument = Document & ProjectRequest;

const AdminNoteSchema = new Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  { _id: false }
);

const AttachmentSchema = new Schema(
  {
    id: { type: String, required: true },
    originalName: { type: String, required: true },
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: String, required: true },
  },
  { _id: false }
);

const ProjectRequestSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    referenceNumber: { type: String, required: true, unique: true, index: true },
    serviceType: { type: String, required: true, index: true },
    projectSize: { type: String, required: true },
    budgetRange: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    existingSystem: { type: String, default: '' },
    desiredOutcome: { type: String, required: true },
    hasDesign: { type: String, default: 'not_sure' },
    desiredDeadline: { type: String, default: '' },
    referenceUrl: { type: String, default: '' },
    contact: {
      name: { type: String, required: true },
      email: { type: String, required: true, index: true },
      phone: { type: String, default: '' },
      company: { type: String, default: '' },
      preferredMethod: { type: String, default: 'email' },
    },
    consent: {
      accepted: { type: Boolean, required: true },
      acceptedAt: { type: String, required: true },
    },
    status: {
      type: String,
      default: 'New',
      enum: [
        'New',
        'Reviewing',
        'Need More Information',
        'Quote Sent',
        'Accepted',
        'In Progress',
        'Completed',
        'Declined',
        'Spam',
      ],
      index: true,
    },
    attachments: { type: [AttachmentSchema], default: [] },
    notes: { type: [AdminNoteSchema], default: [] },
    notification: {
      ownerStatus: { type: String, default: 'pending' },
      clientStatus: { type: String, default: 'pending' },
      retryCount: { type: Number, default: 0 },
    },
    source: {
      page: { type: String, default: '' },
    },
    createdAt: { type: String, required: true, index: true },
    updatedAt: { type: String, required: true },
  },
  {
    timestamps: false,
    collection: 'project_requests',
  }
);

export const ProjectRequestModel =
  mongoose.models.ProjectRequest ||
  mongoose.model<ProjectRequestDocument>('ProjectRequest', ProjectRequestSchema);
