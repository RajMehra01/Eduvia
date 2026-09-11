import express from 'express';
import {
  getProjects,
  getProjectInfo,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/info', getProjectInfo);
router.get('/:id', getProjectInfo);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
