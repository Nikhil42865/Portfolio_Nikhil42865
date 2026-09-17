import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { config } from '../../config';
import { validateBody } from '../../middleware/validate';
import { authLimiter } from '../../middleware/rateLimiters';
import { authenticate } from '../../middleware/authenticate';
import { UnauthorizedError } from '../../shared/errors';
import { Logger } from '../../shared/logger';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

const router = Router();

router.post(
  '/login',
  authLimiter,
  validateBody(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      // Check credentials against configured admin
      const isEmailMatch = normalizedEmail === config.admin.email;
      const isPassMatch = password === config.admin.password;

      if (!isEmailMatch || !isPassMatch) {
        Logger.warn(`Failed login attempt for: ${normalizedEmail}`);
        throw new UnauthorizedError('Invalid credentials provided.');
      }

      const payload = {
        email: config.admin.email,
        role: 'admin' as const,
      };

      const token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: '7d',
      });

      // Set secure cookie with cross-origin support in production
      const isProduction = config.nodeEnv === 'production';
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      Logger.info(`Admin successfully authenticated: ${config.admin.email}`);

      res.json({
        success: true,
        data: {
          user: payload,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/me', authenticate, (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

router.post('/logout', (req: Request, res: Response) => {
  const isProduction = config.nodeEnv === 'production';
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });
  res.json({
    success: true,
    data: {
      message: 'Successfully logged out.',
    },
  });
});

export default router;
