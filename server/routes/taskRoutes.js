import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
  toggleSubtask,
  addComment
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Subtask routes
router.post('/:id/subtasks', addSubtask);
router.put('/:id/subtasks/:subtaskId', toggleSubtask);

// Comment routes
router.post('/:id/comments', addComment);

export default router;
