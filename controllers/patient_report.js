const bcrypt = require('bcrypt');
const { validationResult } =  require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db')
const checking = require('../middleware/checkkAllfield')



const patientReport = async (req, res) => {
  const checkings = checking.checking(req.body)
  const {patient_id,report_name } = req.body;
  const patient_ids = Number(patient_id)
  const params = [patient_ids,report_name];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(409).send(errors.array());
  }

 var alt = await checkings

if(alt===''){
  db.query(  'INSERT INTO `sbs_server`.`patient_report` ( `patient_id`,`report_name`) VALUES ( "?", "?")',params,
  (err, result, fields) => {
    if (!err) {
      res.status(200).send({
        success: true,
        message: "Report Registration Successfull",
        id:result.insertId,
        patient_id,
        report_name,
      });
    }
    else{
      res.status(500).send({err});
    } })
}
else{
  return res.status(400).send({success:false,message:`${alt} is empty`});
}
}






// for(const prop in req.body){
//   console.log(prop,'Object.keys(req.body)')
//   let check = '';
//  if(req.body[prop] === ''){
//    check = prop;
//    console.log(prop,'req.body[prop]')
//     // return req.body[prop];
//   //  return Promise.reject(req.body[prop],'E-mail already in use');
//   // res.status(400).send(req.body[prop],' is empty');
//  }
//  else{
//    if(check === ''){
// db.query(  'INSERT INTO `sbs_server`.`patient_report` ( `patient_id`,`report_name`) VALUES ( "?", "?")',params,
// (err, result, fields) => {
//   if (!err) {
//     res.status(200).send({
//       success: true,
//       message: "Report Registration Successfull",
//       id:result.insertId,
//       patient_id,
//       report_name,
//     });
//   }
//   else{
//     res.status(500).send({err});
//   }
// }
// )

// }

//  }
// } 

module.exports = {patientReport}