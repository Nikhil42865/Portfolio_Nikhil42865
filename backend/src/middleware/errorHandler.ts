import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors';
import { Logger } from '../shared/logger';

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const requestId = (req.headers['x-request-id'] as string) || `req-${Date.now()}`;

  if (err instanceof AppError) {
    Logger.warn(`AppError [${err.code}]: ${err.message}`, {
      path: req.path,
      method: req.method,
      statusCode: err.statusCode,
      requestId,
    });

    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        fields: err.fields,
        requestId,
      },
    });
  }

  Logger.error(`Unhandled Exception: ${err.message}`, {
    path: req.path,
    method: req.method,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    requestId,
  });

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected server error occurred.',
      requestId,
    },
  });
}
