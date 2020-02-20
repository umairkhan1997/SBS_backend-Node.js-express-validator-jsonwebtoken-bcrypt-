const expressvalidator = require('express-validator');





 const validateLoginEmail = expressvalidator.body(
    'email',
    'Please enter a valid e-mail address.'
  )
    .isEmail()
    .normalizeEmail();


 const validatePassword = expressvalidator.body(
    'password',
    'Please enter a alphanumeric password and at least 6 characters long.'
    )
    .isLength({ min: 6 })
    .isAlphanumeric()
    .trim();


    module.exports = {validateLoginEmail,validatePassword}