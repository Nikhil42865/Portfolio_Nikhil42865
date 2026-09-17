import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { Database } from '../../shared/database';
import { NotificationService } from '../notifications';
import { Logger } from '../../shared/logger';
import { ContactMessageModel } from './contactMessage.model';

export class ContactMessageController {
  static async submitMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, subject, message } = req.body;
      const now = new Date().toISOString();

      const newMsg = {
        id: `msg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
        name,
        email,
        subject,
        message,
        createdAt: now,
      };

      // 1. Save to MongoDB Atlas if active
      if (Database.isMongoActive()) {
        await ContactMessageModel.create(newMsg);
      }

      // 2. Also save to local JSON backup
      const db = Database.readLocalDb();
      if (!db.contactMessages) db.contactMessages = [];
      db.contactMessages.unshift(newMsg);
      Database.writeLocalDb(db);

      Logger.info(`New contact message received from ${email}: "${subject}"`);

      // Send dev/live notification
      NotificationService.sendContactMessageNotification({ name, email, subject, message }).catch((err) => {
        Logger.error(`Error sending contact message notification: ${err.message}`);
      });

      res.status(201).json({
        success: true,
        data: {
          id: newMsg.id,
          message: 'Thank you for your message! Nikhil will respond within 24-48 hours.',
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMessages(_req: Request, res: Response, next: NextFunction) {
    try {
      if (Database.isMongoActive()) {
        const messages = await ContactMessageModel.find().sort({ createdAt: -1 }).lean();
        return res.json({
          success: true,
          data: messages,
        });
      }

      const db = Database.readLocalDb();
      res.json({
        success: true,
        data: db.contactMessages || [],
      });
    } catch (err) {
      next(err);
    }
  }
}
