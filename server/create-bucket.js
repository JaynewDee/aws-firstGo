// === import package allowing for communication with service === //
const AWS = require ('aws-sdk');

// === uuid package enables creation of unique bucket name === //
const { v4: uuidv4 } = require('uuid');

// === configure sdk for regional service usage === //
AWS.config.update({region: 'us-east-1'});

// === create an s3 service object === //
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// === Initialize params for createBucket function === //
const bucketParams = {
   Bucket : "user-images-" + uuidv4()
};

// === use createBucket s3 object method to create bucket === //
s3.createBucket(bucketParams, (err, data) => {
   if (err) {
      console.log("Error", err);
      console.error(new Error(`Error occurred @ LINE 19 - s3.createBucket`))
   } else {
      console.log("SUCCESSFULLY CREATED S3 BUCKET")
   }
})