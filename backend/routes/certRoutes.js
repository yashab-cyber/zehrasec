// backend/routes/certRoutes.js
import express from 'express';
import { generateCertificate } from '../controllers/certController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', auth, generateCertificate);

export default router;
