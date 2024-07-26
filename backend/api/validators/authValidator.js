import {body} from 'express-validator'


export const registerValidator = () => {
    return [
        body('firstname')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Firstname must be at least 2 characters long'),
      body('lastname')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Lastname must be at least 2 characters long'),
      body('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    ]
} 