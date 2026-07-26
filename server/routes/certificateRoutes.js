import express from 'express';
import { getCertificates, issueCertificate } from '../controllers/certificateController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCertificates);
router.post('/', verifyToken, issueCertificate);

export default router;
