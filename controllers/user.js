const db = require('../db')


exports.getAllUser = (req,res)=>{

  var sqlQuery = 'SELECT * From doctor_info'
  db.query(sqlQuery,(err,result)=> {
    if(!err) {
        res.status(200).send(result);
        console.log("all users successfull"); 
    }
    else 
    console.log(err);      
})
}