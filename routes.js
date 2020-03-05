const express = require('express');
// import express from 'express'
var router = express.Router();
var authController = require('./controllers/auth');
var patientInfoController = require('./controllers/patient_info');
var patientReportController = require('./controllers/patient_report');
var rightKneeController = require('./controllers/right_knee')
var userController = require('./controllers/user');
const middleware = require('./middleware/validation-middleware');
// const validatePassword = require('./middleware/validation-middleware');



  router.post(
    '/login',
     [middleware.validateLoginEmail,middleware.validatePassword],
    authController.login
  );
  router.post(
    '/signUp',
     [middleware.validateLoginEmail,middleware.validatePassword,middleware.validateprofile_pic_url,middleware.validatename,middleware.validatecontact_no],
    authController.signUp
  );

  router.post(
    '/patientInfo',
     [middleware.validateLoginEmail],
    patientInfoController.patientInfo
  )
  router.get(
    '/patientInfo',
    patientInfoController.allPateints
  )

  router.post(
    '/patientReport',
    patientReportController.patientReport,
  )
  router.post(
    '/rightKnee',
    rightKneeController.rightKnee
  )

  router.get(
    '/user',
    userController.getAllUser
  );



  module.exports = router;
