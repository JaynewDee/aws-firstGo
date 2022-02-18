const express = require('express');
// - Initialize router object through Express Router class - //
const router = express.Router();

const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
  endpoint: "http://localhost:8000",
};

AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Ponderances";

router.get('/users', (req, res) => {
   const params = {
     TableName: table
   };

   // - DynamoDB DocumentClient object scan method returns all items from table defined in params - //
   dynamodb.scan(params, (err, data) => {
      if (err) {
        res.status(500).json(err); 
      }else {
         // - Table data returns from scan as Items property of response object - //
        res.json(data.Items)
      }
    });
})

router.get('/users/:username', (req, res) => {
   console.log(`Querying for thought(s) from ${req.params.username}.`);

   const params = {
      // - table variable globally defined - //
      TableName: table,
      // - property specifies search criteria - //
      // - we can use expressions by using comparison operators such as <, =, <=, and BETWEEN to find a range of values - //
      KeyConditionExpression: "#un = :user",
      // - #un and :user symbols are aliases that represent the attribute name and value - //
      ExpressionAttributeNames: {
        "#un": "username",
        "#ca": "createdAt",
        "#po": "ponderance"
      },
      // - actual value to search for, as specified by client - //
      ExpressionAttributeValues: {
        ":user": req.params.username
      },
      // - Specify which attributes of items to retrieve - //
      // * In this case, we specify retrieval of -ponderance- and -createdAt- * //
      ProjectionExpression: "#po, #ca",
      // - property accepts a boolean determining sorting of response data - //
         // * false for descending, true for ascending * //
      ScanIndexForward: false
    };

    dynamodb.query(params, (err, data) => {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        res.status(500).json(err);
      } else {
        console.log("Query succeeded.");
        res.json(data.Items)
      }
    });

 });

module.exports = router;