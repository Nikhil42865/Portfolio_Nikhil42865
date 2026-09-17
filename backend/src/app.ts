import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { config } from './config';
import { apiLimiter } from './middleware/rateLimiters';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './shared/errors';
import { Database } from './shared/database';

import projectRequestRoutes from './modules/projectRequests/projectRequest.routes';
import contactMessageRoutes from './modules/contactMessages/contactMessage.routes';
import authRoutes from './modules/auth/auth.routes';
import uploadRoutes from './modules/uploads/upload.routes';

const app = express();

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS
const allowedOrigins = [
  config.frontendUrl.replace(/\/$/, ''),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.onrender.com') ||
        origin.endsWith('.vercel.app') ||
        config.nodeEnv !== 'production'
      ) {
        return callback(null, true);
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// Parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// Request correlation ID
app.use((req, _res, next) => {
  if (!req.headers['x-request-id']) {
    req.headers['x-request-id'] = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  }
  next();
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// General API rate limiter
app.use('/api', apiLimiter);

// Favicon handler
app.get('/favicon.ico', (_req, res) => {
  res.status(204).end();
});

// Health check endpoints (supports Render health check and all common aliases)
app.get(['/health', '/api/health', '/api/v1/health'], (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: Database.isMongoActive() ? 'mongodb' : 'local-store',
    },
  });
});

// Register Module Routes
app.use('/api/v1/project-requests', projectRequestRoutes);
app.use('/api/v1/contact-messages', contactMessageRoutes);
app.use('/api/v1/admin/auth', authRoutes);
app.use('/api/v1/uploads', uploadRoutes);

// Unmatched Route Handler
app.use('*', (req, _res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} does not exist.`));
});

// Central Error Handler
app.use(errorHandler);

export default app;
