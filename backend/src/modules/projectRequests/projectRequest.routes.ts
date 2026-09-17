import { Router } from 'express';
import { ProjectRequestController } from './projectRequest.controller';
import { validateBody } from '../../middleware/validate';
import {
  createProjectRequestSchema,
  updateProjectRequestStatusSchema,
  addProjectRequestNoteSchema,
} from './projectRequest.validation';
import { publicFormLimiter } from '../../middleware/rateLimiters';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

// Public intake endpoint
router.post(
  '/',
  publicFormLimiter,
  validateBody(createProjectRequestSchema),
  ProjectRequestController.submitRequest
);

// Protected Admin endpoints
router.get('/', authenticate, ProjectRequestController.getRequests);
router.get('/:id', authenticate, ProjectRequestController.getRequestById);
router.patch(
  '/:id/status',
  authenticate,
  validateBody(updateProjectRequestStatusSchema),
  ProjectRequestController.updateStatus
);
router.post(
  '/:id/notes',
  authenticate,
  validateBody(addProjectRequestNoteSchema),
  ProjectRequestController.addNote
);

export default router;
