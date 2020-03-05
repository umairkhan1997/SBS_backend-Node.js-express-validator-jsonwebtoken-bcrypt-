
const bcrypt = require('bcrypt');
const { validationResult } =  require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db')


const signUp = async (req, res) => {
  const {name, email, password, profile_pic_url, contact_no } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).send({success: false, message: errors.errors[0].msg});
    }

    //Check if email already Exist
    db.query(
      "SELECT email FROM `sbs_server`.`doctor_info` WHERE `email`= ?",
      email,
      async (err, result, fields) => {
        if (err) {
          console.log(err,fields,result);
          // throw new Error( 'email already exist')
          return res
            .status(401)
            .send({ success: false, message: "Email Already Registered" });
        } 
        else {
          const hashedPassword = await bcrypt.hash(password, 12);
          const params = [name, email, hashedPassword, profile_pic_url, contact_no];
          db.query(
            'INSERT INTO `sbs_server`.`doctor_info` ( `name`, `email`, `password`, `profile_pic_url`, `contact_no`, `email_verified`) VALUES ( ?, ? , ?, ?, ?, 0)',
            params,
            (err, result, fields) => {
              if (!err) {
                const token = jwt.sign(password, process.env.APP_KEY);
                res.status(200).send({
                  success: true,
                  message: "Registration Successfull",
                  name,
                  email,
                  contact_no,
                  token,
                  refreshtoken: null
                });
                console.log("Sign up successfully");
              } else {
                res.status(500).send({message:'Email Already Register',success:false});
              }
            }
          );
        }
      }
    );
  } catch (e) {
    console.log("error in signup controller", e);
    res.status(401).send(e);
    return;
  }
};


// const login = async (req, res, next) => {

//   };



  const login = async (req, res) => {
    const { email, password } = req.body;
  
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).send(errors.array());
    }
    console.log(req.body ,'body')
    db.query(
      "SELECT * FROM `sbs_server`.`doctor_info` WHERE `email`= ?",
      email,
      async (error, fields, result) => {
        
        if (error) {
          return res.status(400).send({ success: false, message: error });
        } else {
          console.log(error, fields, result,'error, fields, result')
          if (fields.length > 0) {
            console.log(password,'password, fields[0].password', fields[0].password)
            const password_match = await bcrypt.compare(password, fields[0].password);
            console.log(password_match)
            if (password_match) {
              const token = jwt.sign(password, process.env.APP_KEY);
              return res.status(200).send({
                user: fields[0],
                message: "login sucessfull",
                success: true,
                token
              });
            } else {
              return res.status(400).send({
                message: "Incorrect Passowrd",
                success: false
              });
            }
          } else {
            return res.status(400).send({
              user: fields[0],
              message: "Email Does not exist",
              success: false
            });
          }
        }
      }
    );
  };













  
 const loginSuccess = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(404).send(validationErrors.array()[0].msg);
    } else {
      await passport.authenticate('local')(req, res, next);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {login,loginSuccess,signUp}