const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const imageParams = require('../utils/params-config');

const storage = multer.memoryStorage({
   destination: (req, file, callback) => callback(null, '')
});

const upload = multer({storage}).single('image');

const s3 = new AWS.S3({
   apiVersion: '2006-03-01'
});

router.post('/image-upload', upload, (req, res) => {
   const params = imageParams(req.file);
   s3.upload(params, (err, data) => {
      if(err) {
        console.log(err); 
        res.status(500).send(err);
      }
      res.json(data);
    });
})

module.exports = router;