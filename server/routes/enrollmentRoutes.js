import express from 'express';
import { enrollInCourse, getUserEnrollments } from '../controllers/enrollmentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, enrollInCourse);
router.get('/', verifyToken, getUserEnrollments);

export default router;
