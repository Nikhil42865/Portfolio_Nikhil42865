import rateLimit from 'express-rate-limit';

export const publicFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // max 30 submissions per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many submissions from this IP. Please wait a few minutes before trying again.',
    },
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // max 10 login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many login attempts. Please wait 15 minutes before trying again.',
    },
  },
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
