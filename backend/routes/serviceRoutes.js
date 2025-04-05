// backend/routes/serviceRoutes.js
import express from 'express';
import { createRequest, getRequests } from '../controllers/serviceController.js';
import { auth, adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create service request (contact form)
// @route   POST /api/service/request
// @access  Public
router.post('/request', createRequest);

// @desc    Get all service requests
// @route   GET /api/service/requests
// @access  Private (Admin only)
router.get('/requests', auth, adminAuth, getRequests);

export default router;
