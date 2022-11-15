/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const {randomUUID} = require('crypto');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

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

// Get all courses
 app.get('/courses', async(req, res) => {

  const params = {
    TableName : 'Tutorhub',
    IndexName : 'GSI2',
    FilterExpression: 'begins_with(#PK, :course)',
    ExpressionAttributeValues: { ':course': 'Course' },
    ExpressionAttributeNames: { '#PK': 'SK (GSI-1-PK)' }
  }

  try {
    const data = await docClient.scan(params).promise();
    const courses = data.Items
    res.json({success: 'get call succeed!', data: courses});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Get a course by ID
app.get('/courses/:id', async(req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    IndexName : 'GSI2',
    KeyConditionExpression: '#PK = :course',
    ExpressionAttributeValues: {
      ':course': `Course-${id}`
    },
    ExpressionAttributeNames: { '#PK': 'SK (GSI-1-PK)' }
  }

  try {
    const data = await docClient.query(params).promise();
    const course = data.Items[0]
    res.json({success: 'get call succeed!', data: course});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app