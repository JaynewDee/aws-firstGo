const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
   accessKeyId: process.env.DB_ACCESS,
   secretAccessKey: process.env.DB_SECRET,
   region: "us-east-2",
   endpoint: "http://localhost:8000"
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


console.log("Data incoming...");
const allUsers = JSON.parse(fs.readFileSync('./seeds.json', 'utf8'));
console.log(allUsers)
allUsers.forEach(user => {
   const params = {
      TableName: "Thoughts",
      Item: {
         "username": user.username,
         "createdAt": user.createdAt,
         "thought": user.thought,
      }
   }

   dynamoDB.put(params, (err, data) => {
      if (err) {
         console.error(err)
         console.log(new Error("Something went wrong @ dynamoDB.put ..."))
      } else {
         console.log("Put action at Load.js Line26 SUCCESSFUL")
      }
   })
})
