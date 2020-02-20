const express = require('express');
var router = express.Router();
var authController = require('./controllers/auth');

const middleware = require('./middleware/validation-middleware');
// const validatePassword = require('./middleware/validation-middleware');



  router.post(
    '/login',
     [middleware.validateLoginEmail,middleware.validatePassword],
    authController.login
  );

  module.exports = router;
