import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../shared/errors';

export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of err.issues) {
          const path = issue.path.join('.');
          fieldErrors[path || 'general'] = issue.message;
        }
        next(new ValidationError('Please correct the highlighted fields.', fieldErrors));
      } else {
        next(err);
      }
    }
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of err.issues) {
          const path = issue.path.join('.');
          fieldErrors[path || 'general'] = issue.message;
        }
        next(new ValidationError('Invalid query parameters.', fieldErrors));
      } else {
        next(err);
      }
    }
  };
}
