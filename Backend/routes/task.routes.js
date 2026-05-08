import express from 'express';
import * as taskController from '../controller/task.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/', verifyToken, taskController.createTaskController);

export default router;































// GET /api/tasks - Get all tasks
// GET /api/tasks/:id - Get a specific task
// POST /api/tasks - Create a new task
// PUT /api/tasks/:id - Update a task
// DELETE /api/tasks/:id - Delete a task



