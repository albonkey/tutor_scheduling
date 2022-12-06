const express = require('express')
const bodyParser = require('body-parser')
//const {randomUUID} = require('crypto');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'})
const docClient = new AWS.DynamoDB.DocumentClient();

const Session = require('./controllers');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.get('/sessions', Session.getAllSessions);

app.get('/sessions/:id', Session.getSessionById);

app.delete('/sessions/:id', Session.deleteSessionById);

app.post('/sessions', Session.createSession);

app.put('/sessions/:id', Session.updateSessionById);

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
