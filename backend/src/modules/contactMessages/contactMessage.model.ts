import mongoose, { Schema, Document } from 'mongoose';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export type ContactMessageDocument = Document & ContactMessage;

const ContactMessageSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: String, required: true, index: true },
  },
  {
    timestamps: false,
    collection: 'contact_messages',
  }
);

export const ContactMessageModel =
  mongoose.models.ContactMessage ||
  mongoose.model<ContactMessageDocument>('ContactMessage', ContactMessageSchema);
