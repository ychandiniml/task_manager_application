import express from 'express';
import { validate, verifyToken } from '../../middleware/index.js';

import { createTask , getTaskById, getAllTasks, updateTask, deleteTask, } from '../controllers/taskController.js';
import { createTaskValidator, getAllTaskValidator, updateTaskValidator } from "../validators/taskValidator.js";

const router = express.Router();



router.get('/all', verifyToken, getAllTaskValidator(), validate, getAllTasks);
router.post('/', verifyToken, createTaskValidator(), validate, createTask);
router.get('/:taskId', verifyToken, getTaskById);
router.put('/:taskId', verifyToken, updateTaskValidator(), validate, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);

export default router;




