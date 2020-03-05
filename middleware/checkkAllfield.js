const bcrypt = require('bcrypt');
const { validationResult } =  require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db')



const checking = (req)=>{
  var check = '';
for(const prop in req){
// console.log(prop,'Object.keys(req.body)')
if(req[prop] === ''){
 check = prop;
//  console.log(check,'req.body[prop]')
  return check;
}} 
return check;
}

module.exports = {checking};