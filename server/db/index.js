// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
if (process.env.NODE_ENV === 'development') {
  require('./local');
}

const dynamoConfig = {
  apiVersion: '2012-08-10'
}

if (process.env.NODE_ENV == 'development') {
  dynamoConfig.endpoint = process.env.DYNALITE_ADDRESS
}

const dynamo = new AWS.DynamoDB(dynamoConfig);

module.exports = dynamo;