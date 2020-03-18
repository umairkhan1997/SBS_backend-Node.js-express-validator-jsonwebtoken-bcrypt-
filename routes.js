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
const multer = require('multer');
const Printer = require('pdfmake')
const path = require('path')
const axios = require('axios')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() +file.originalname )
  }
})
 
var upload = multer({ storage: storage })



router.post('/uploadfile',upload.array('myFiles', 12), async (req, res, next) => {
  var printer = new Printer({
    Roboto: {
        normal: path.resolve('src', 'fonts', 'Roboto.ttf'),
        bold: path.resolve('src', 'fonts', 'Roboto-Bold.ttf'),
    }
})

  const file = req.files[0]
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  var fileinfo =file ;
    //  res.send(fileinfo);
console.log(fileinfo);


try {
  var result = await axios.get('./uploads/1584364380956pic-12-06(2).png', {
      responseType: 'arraybuffer'
  })
} catch(err) {
  return next(err.message)
}
console.log(result.data,'result');
    // var image = new Buffer.from(result.data, 'base64')
    // console.log(image)
    // var doc = printer.createPdfKitDocument({
    //     info: {
    //         title: 'PDF with External Image',
    //         author: 'Matt Hagemann',
    //         subject: 'PDF with External Image',
    //     },
    //     content: [{
    //         image: image,
    //         width: 595, // Full A4 size width.
    //         absolutePosition: { x: 0, y: 0 }
    //     }],
    //     defaultStyle: {
    //         fontSize: 11,
    //         font: 'Roboto', // The font name was defined above.
    //         lineHeight: 1.2,
    //     }
    // })
    // doc.end()
  
    // res.setHeader('Content-type', 'application/pdf')
    // res.setHeader('Content-disposition', 'inline; filename="Example.pdf"')
  
    // doc.pipe(res)
  
})

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
