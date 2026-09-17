import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UnauthorizedError } from '../shared/errors';

export interface AuthUser {
  email: string;
  role: 'admin';
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  let token = req.cookies?.auth_token;

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.substring(7);
  }

  if (!token) {
    return next(new UnauthorizedError('Admin authentication required'));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthUser;
    req.user = decoded;
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired authentication session'));
  }
}
