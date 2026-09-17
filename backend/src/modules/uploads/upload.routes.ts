import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import { Router, Request, Response, NextFunction } from 'express';
import { config } from '../../config';
import { ValidationError } from '../../shared/errors';
import { publicFormLimiter } from '../../middleware/rateLimiters';

// Ensure upload directory exists
if (!fs.existsSync(config.upload.directory)) {
  fs.mkdirSync(config.upload.directory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.upload.directory);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `att_${Date.now()}_${crypto.randomBytes(4).toString('hex')}${ext}`;
    cb(null, safeName);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (config.upload.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ValidationError(
        `File type "${file.mimetype}" is not permitted. Allowed: PNG, JPEG, WebP, PDF, DOC, DOCX, TXT.`
      )
    );
  }
};

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: config.upload.maxFileSize,
    files: config.upload.maxTotalFiles,
  },
  fileFilter,
});

const router = Router();

router.post(
  '/',
  publicFormLimiter,
  uploadMiddleware.array('files', config.upload.maxTotalFiles),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        throw new ValidationError('No files were uploaded.');
      }

      const attachments = files.map((f) => ({
        id: `att_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
        originalName: f.originalname,
        fileName: f.filename,
        path: `/uploads/${f.filename}`,
        mimeType: f.mimetype,
        size: f.size,
        uploadedAt: new Date().toISOString(),
      }));

      res.status(201).json({
        success: true,
        data: attachments,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
