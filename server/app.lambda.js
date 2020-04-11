// lambda.js
'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const apiServer = require('./app')
const server = awsServerlessExpress.createServer(apiServer)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }