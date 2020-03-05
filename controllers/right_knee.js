const bcrypt = require('bcrypt');
const { validationResult } =  require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../db')
const checking = require('../middleware/checkkAllfield')
const googleStorage = require('@google-cloud/storage');
// const gstorage = new googleStorage;
const Multer = require('multer');

const projectId = "sbs-backend-923f4"
const keyFilename = "C:\Users\Pcw\Downloads\sbs-backend-72ff59bf22ef.json"
const bucketName = 'sbs-backend-923f4.appspot.com'

// const storage = require('@google-cloud/storage')({
//   projectId,
//   keyFilename
// });


// const bucket = storage.bucket(bucketName);



/////////////
// const storage = googleStorage({
//   projectId: "sbs-backend-923f4",
//   keyFilename: "C:\Users\Pcw\Downloads\sbs-backend-72ff59bf22ef.json"
// });

//  const bucket = storage.bucket("sbs-backend-923f4.appspot.com");

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//   }
// });


// const uploadImageToStorage = (file) => {
//   return new Promise((resolve, reject) => {
//     if (!file) {
//       reject('No image file');
//     }
//     let newFileName = `${file.originalname}_${Date.now()}`;

//     let fileUpload = bucket.file(newFileName);

//     const blobStream = fileUpload.createWriteStream({
//       metadata: {
//         contentType: file.mimetype
//       }
//     });

//     blobStream.on('error', (error) => {
//       reject('Something is wrong! Unable to upload at the moment.');
//     });

//     blobStream.on('finish', () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
//       resolve(url);
//       console.log(url);
//     });

//     blobStream.end(file.buffer);
//   });
// }



const rightKnee = async (req, res) => {
  const {rp_Id,severe_stiffness,exp_knee_pain,twisting_knee,straightening,up_down_stairs,sitting_lying,standing_upright,rising_siiting,standing,bending_floor,get_in_out_car,pasbf,pasbnf,rkc,rlateral,mfvv,mfvn,mnfvv,mnfvn,lfv,lfvn,lnfv,lnfvn,kcv,kcvn } = req.body;
  const rp_Ids = Number(rp_Id)
  const params = [rp_Ids,severe_stiffness,twisting_knee,exp_knee_pain,straightening,up_down_stairs,sitting_lying,standing_upright,rising_siiting,standing,bending_floor,get_in_out_car,pasbf,pasbnf,rkc,rlateral,mfvv,mfvn,mnfvv,mnfvn,lfv,lfvn,lnfv,lnfvn,kcv,kcvn];
  const checkings = checking.checking(req.body)
  var alt = await checkings



  // multer.single('file')
  // console.log('Upload Image');

  // let file = twisting_knee;
  // if (file) {
  //   uploadImageToStorage(file).then((success) => {
  //     res.status(200).send({
  //       status: 'success'
  //     });
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }


// if(alt===''){
//   db.query(  'INSERT INTO `sbs_server`.`right_knee` ( `rp_Id`,`severe_stiffness`,`twisting_knee`,`exp_knee_pain`,`straightening`,`up_down_stairs`,`sitting_lying`,`standing_upright`,`rising_siiting`,`standing`,`bending_floor`,`get_in_out_car`,`pasbf`,`pasbnf`,`rkc`,`rlateral`,`mfvv`,`mfvn`,`mnfvv`,`mnfvn`,`lfv`,`lfvn`,`lnfv`,`lnfvn`,`kcv`,`kcvn`) VALUES ( "?", "?","?", "?","?", "?","?", "?","?", "?","?", "?","?", "?","?", "?","?", "?","?", "?","?", "?","?", "?","?", "?")',params,
//   (err, result, fields) => {
//     if (!err) {
//       res.status(200).send({
//         success: true,
//         message: "Right Knee Report Registration Successfull",
//       });
//     }
//     else{
//       res.status(500).send({err});
//     }
//   }
//   )
// }
//   else{
//     return res.status(400).send({success:false,message:`${alt} is empty`});
//   }





  }

module.exports = {rightKnee}