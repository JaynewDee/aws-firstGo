const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
   region: "us-east-2",
   endpoint: "http://localhost:8000"
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


console.log("Data incoming...");
const allUsers = JSON.parse(fs.readFileSync('./seeds.json', 'utf8'));

allUsers.forEAch(user => {
   const params = {
      TableName: "Ponderances",
      Item: {
         "username": user.username,
         "timeOfGenesis": user.timeOfGenesis,
         "ponderance": user.ponderance
      }
   }
})

