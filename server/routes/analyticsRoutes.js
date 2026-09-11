import express from 'express';
import { getSprintAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/', getSprintAnalytics);

export default router;
