// backend/routes/adminRoutes.js
import express from 'express';
import { getUsers, updateUserRole, getAttendance } from '../controllers/adminController.js';
import { auth, adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', auth, adminAuth, getUsers);
router.put('/users/:id', auth, adminAuth, updateUserRole);
router.get('/attendance', auth, adminAuth, getAttendance);

export default router;
