import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Try loading root .env first, then backend/.env
const rootEnvPath = path.resolve(__dirname, '../../../.env');
const backendEnvPath = path.resolve(__dirname, '../../.env');

if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}
if (fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath, override: true });
}

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  mongodbUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'nikhil-portfolio-secret-key-development-minimum-32-chars',
  admin: {
    email: (process.env.ADMIN_EMAIL || 'nikhil42865@gmail.com').toLowerCase().trim(),
    password: process.env.ADMIN_PASSWORD || 'Admin@123456',
  },
  upload: {
    directory: path.resolve(__dirname, '../../uploads'),
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxTotalFiles: 5,
    allowedMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ],
  },
  notifications: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    ownerEmail: process.env.OWNER_NOTIFICATION_EMAIL || 'nikhil42865@gmail.com',
    fromEmail: process.env.NOTIFICATION_FROM_EMAIL || 'onboarding@resend.dev',
  },
};
