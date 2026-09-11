import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API Route mounts
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/certificates', certificateRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Eduvia LMS Modular API Server',
    organization: 'Eduvia Education Technologies Inc.',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Eduvia LMS Modular API Server running on http://localhost:${PORT}`);
});
