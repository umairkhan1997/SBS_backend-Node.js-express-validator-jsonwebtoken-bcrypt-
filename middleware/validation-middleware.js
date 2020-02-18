import { body } from 'express-validator';



export const validateLoginEmail = body(
    'email',
    'Please enter a valid e-mail address.'
  )
    .isEmail()
    .normalizeEmail();


export const validatePassword = body(
    'password',
    'Please enter a alphanumeric password and at least 6 characters long.'
    )
    .isLength({ min: 6 })
    .isAlphanumeric()
    .trim();


