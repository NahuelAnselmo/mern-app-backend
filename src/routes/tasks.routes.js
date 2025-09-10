import { Router } from 'express';
import {
  createTasks,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/tasks.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middlewares.js';
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdParamSchema,
  getTasksQuerySchema,
} from '../schemas/task.schema.js';

const router = Router();

router.get(
  '/tasks',
  authRequired,
  validateSchema({ query: getTasksQuerySchema }),
  getTasks
);

router.get(
  '/tasks/:id',
  authRequired,
  validateSchema({ params: taskIdParamSchema }),
  getTask
);

router.post(
  '/tasks',
  authRequired,
  validateSchema({ body: createTaskSchema }),
  createTasks
);

router.delete(
  '/tasks/:id',
  authRequired,
  validateSchema({ params: taskIdParamSchema }),
  deleteTask
);

router.put(
  '/tasks/:id',
  authRequired,
  validateSchema({ params: taskIdParamSchema, body: updateTaskSchema }),
  updateTask
);

export default router;
