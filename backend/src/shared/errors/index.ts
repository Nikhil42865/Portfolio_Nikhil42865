export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly fields?: Record<string, string>;

  constructor(
    message: string,
    statusCode = 500,
    code = 'INTERNAL_SERVER_ERROR',
    fields?: Record<string, string>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.fields = fields;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, fields?: Record<string, string>) {
    super(message, 400, 'VALIDATION_ERROR', fields);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later.') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}
