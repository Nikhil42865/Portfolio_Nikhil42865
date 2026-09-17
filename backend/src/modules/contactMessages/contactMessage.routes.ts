import { Router } from 'express';
import { ContactMessageController } from './contactMessage.controller';
import { validateBody } from '../../middleware/validate';
import { createContactMessageSchema } from './contactMessage.validation';
import { publicFormLimiter } from '../../middleware/rateLimiters';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.post(
  '/',
  publicFormLimiter,
  validateBody(createContactMessageSchema),
  ContactMessageController.submitMessage
);

router.get('/', authenticate, ContactMessageController.getMessages);

export default router;
