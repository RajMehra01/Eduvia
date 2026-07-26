import express from 'express';
import { getAllCourses, getCourseById, createCourse } from '../controllers/courseController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', verifyToken, requireRole('INSTRUCTOR'), createCourse);

export default router;
