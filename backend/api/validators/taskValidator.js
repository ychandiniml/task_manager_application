import {body} from 'express-validator'
import { TaskStatusEnum } from '../common/constants.js'

export const createTaskValidator = () => {
    return [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .withMessage('title must be at least 3 characters long'),
    body('description')
        .optional()
        .isString()
        .withMessage('description should be string'),
    body('userId')
        .isString()
        .withMessage('userId is required')
    ]
} 

export const updateTaskValidator = () => {
    return [
    body('title')
        .optional()
        .isString()
        .isLength({ min: 3 })
        .withMessage('title must be at least 3 characters long'),
    body('description')
        .optional()
        .isString()
        .withMessage('description should be string'),
    body('status')
        .optional()
        .isString()
        .isIn(Object.values(TaskStatusEnum))  
        .withMessage('status must be one of "TODO", "IN_PROGRESS", "DONE"')  
    ]    
} 

export const getAllTaskValidator = () => {
    return [
        body('userId')
        .isString()
        .withMessage('userId is required')
    ]    
} 