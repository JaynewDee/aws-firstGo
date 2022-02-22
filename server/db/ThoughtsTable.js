const AWS = require('aws-sdk');
require('dotenv').config();

// = Configure connection to local dynamoDB instance = //
AWS.config.update({
   accessKeyId: process.env.DB_ACCESS,
   secretAccessKey: process.env.DB_SECRET,
   region: "us-east-2",
});

// = Use aws class to build object to interface with DB = //
const dynamodb = new AWS.DynamoDB({
   apiVersion: '2012-08-10'
});

// = Define parameters for createTable method = //
const params = {
   TableName: "Thoughts",
   KeySchema: [{
         AttributeName: "username",
         KeyType: "HASH"
      }, // Partition key
      {
         AttributeName: "createdAt",
         KeyType: "RANGE"
      } // Sort key
   ],
   AttributeDefinitions: [{
         AttributeName: "username",
         AttributeType: "S"
      },
      {
         AttributeName: "createdAt",
         AttributeType: "N"
      }
   ],
   ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
   }
};

// = create table with attributes defined by params object = //
dynamodb.createTable(params, (err, data) => {
   if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
   } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
   }
});