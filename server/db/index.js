// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const usersDB = require('./users');

if (process.env.NODE_ENV === 'development') {
  require('./local');
}

const dynamoConfig = {
  apiVersion: '2012-08-10'
}

if (process.env.NODE_ENV == 'development') {
  dynamoConfig.endpoint = process.env.DYNALITE_ADDRESS
}

const db = new AWS.DynamoDB(dynamoConfig);
const doc = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  service: db,
});

module.exports = {
  db,
  doc,
  users: usersDB(doc)
};