const expressvalidator = require('express-validator');


 const validateLoginEmail = expressvalidator.body(
    'email',
    'Please enter a valid e-mail address.'
  )
    .isEmail()
    .normalizeEmail()
   .notEmpty()

   const validateprofile_pic_url = expressvalidator.body(
      'profile_pic_url',
      'Please select a Profile Image.'
    )
     .notEmpty()

     const validatename = expressvalidator.body(
      'name',
      'Please enter a Name .'
    )
     .notEmpty()

     const validatecontact_no = expressvalidator.body(
      'contact_no',
      'Please enter a Contact Number .'
    )
     .notEmpty()
  

 const validatePassword = expressvalidator.body(
    'password',
    'Please enter a alphanumeric password and at least 6 characters long.'
    )
    .isLength({ min: 6 })
    .isAlphanumeric()
    .trim();



    
    
         module.exports = {validateLoginEmail,validatePassword,validateprofile_pic_url,validatename,validatecontact_no}