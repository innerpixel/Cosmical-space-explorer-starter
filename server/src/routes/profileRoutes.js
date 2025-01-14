import express from 'express';
import { body } from 'express-validator';
import * as profileController from '../controllers/profileController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateProfileRequest = [
  body('type')
    .isIn(['explorer', 'scientist', 'engineer', 'commander'])
    .withMessage('Invalid profile type'),
  body('description')
    .isLength({ min: 50, max: 1000 })
    .withMessage('Description must be between 50 and 1000 characters'),
  body('skills')
    .isArray()
    .withMessage('Skills must be an array')
    .notEmpty()
    .withMessage('At least one skill is required'),
  body('currentProfile')
    .notEmpty()
    .withMessage('Current profile is required')
];

// Routes
router.post(
  '/request',
  authenticate,
  validateProfileRequest,
  profileController.submitRequest
);

router.get(
  '/requests/pending',
  authenticate,
  isAdmin,
  profileController.getPendingRequests
);

router.post(
  '/request/:requestId/approve',
  authenticate,
  isAdmin,
  profileController.approveRequest
);

router.post(
  '/request/:requestId/reject',
  authenticate,
  isAdmin,
  [
    body('reason')
      .notEmpty()
      .withMessage('Rejection reason is required')
  ],
  profileController.rejectRequest
);

router.get(
  '/requests/user',
  authenticate,
  profileController.getUserRequests
);

router.get(
  '/request/:requestId/status',
  authenticate,
  profileController.getRequestStatus
);

export default router;
