import { Router } from 'express';
import {
  createTasks,
  deleteTasks,
  getTask,
  getTasks,
  updateTasks,
} from '../controllers/tasks.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/tasks', authRequired, getTasks);

router.get('/tasks/:id', authRequired, getTask);

router.post('/tasks', authRequired, createTasks);

router.delete('/tasks/:id', authRequired, deleteTasks);

router.put('/tasks/:id', authRequired, updateTasks);

export default router;
