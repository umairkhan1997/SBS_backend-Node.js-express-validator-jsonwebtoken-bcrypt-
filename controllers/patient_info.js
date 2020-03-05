const bcrypt = require('bcrypt');
const { validationResult } =  require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db')
const checking = require('../middleware/checkkAllfield')



const patientInfo = async (req, res) => {
  const checkings = checking.checking(req.body)
  const {doctor_id,name,contact_no, email, age, Martial_status, height,weight,birth,Gender,home_phone,home_address,emergency_contact,date } = req.body;
  const doctor_ids = Number(doctor_id)
  const params = [name,contact_no, email, age, Martial_status, height,weight,birth,Gender,home_phone,home_address,emergency_contact,date];
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).send({success: false, message: errors.errors[0].msg});
    }
    //Check if email already Exist
    console.log('chalra')
    db.query(
      "SELECT email FROM `patient_info` WHERE `email`= ?",
      email,
      async (err, result) => {
        console.log(err, result,);
        if (err) {
          // throw new Error( 'email already exist')
          return res
            .status(401)
            .send({ success: false, message: "Email Already Registered" });
        } 
        else {
          var alt = await checkings

          if(alt===''){
  db.query(  'INSERT INTO `sbs_server`.`patient_info` ( `name`,`contact_no`, `email`, `age`, `Martial_status`, `height`,`weight`,`birth`,`Gender`,`home_phone`,`home_address`,`emergency_contact`,`date`) VALUES ( ?, ? , ?, ?, ?, ?,?, ?, ? , ?, ?, ?, ?)',params,
  (err, result, fields) => {
    if (!err) {
      res.status(200).send({
        success: true,
        message: "Patient Registration Successfull",
        id:result.insertId,
        name,
        email,
        contact_no,
      });
    }
    else{
      res.status(500).send({message:'Email Already Register',success:false});
    }})}
    else{
      return res.status(400).send({success:false,message:`${alt} is empty`});
    }
  }

  });
} catch (e) {
  console.log("error in patient_info controller", e);
res.status(401).send(e);
  return;
}
};


const allPateints =async (req, res) =>{

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).send(errors.array());
    }

    db.query(
      "SELECT * FROM `patient_info`",
      async (err, result, fields) => {
        if (fields.length > 0) {
          console.log('fields',result,"fields");
          // throw new Error( 'email already exist')
          return res
            .status(401)
            .send({ success: true, message: "All Data",data:result });
        } 
      });

  }
  catch (e) {
    console.log("error in signup controller", e);
  res.status(401).send(e);
    return;
  }
}


module.exports = {patientInfo,allPateints}