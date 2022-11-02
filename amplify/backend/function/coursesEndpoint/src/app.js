/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
import { randomUUID } from 'crypto';
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk');
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
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


// Get all course
 app.get('/courses', async(req, res) => {

  const params = {
    TableName : 'Tutorhub',
    IndexName : 'GSI2',
    KeyConditionExpression: 'begins_with(#PK, :course)',
    ExpressionAttributeValues: {
      ':course': 'Course'
    },
    ExpressionAttributeNames: { '#PK': 'SK (GSI-1-PK)' }
  }
  try {
    const data = await docClient.scan(params).promise();
    res.json({success: 'get call succeed!', data: data});
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
    res.json({success: 'get call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

//THESE ALL NEED THE USER ID FIRST

// Create a course
app.get('/users/:id/courses/', async(req, res) => {
  const {id} = req.params.id;
  const cid = randomUUID();
  const {subject, level, Description} = req.body;

  const params = {
    TableName : 'Tutorhub',
    Item: {
      'PK': `User-${id}`,
      'SK (GSI-1-PK)': `Course-${cid}`,
      'GSI-1-SK': subject,
      'Level': level,
      'Description': Description
    }
  }

  try {
    const data = await docClient.put(params).promise();
    res.json({success: 'get call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});
// Update a course
app.get('/users/:id/courses/:cid', async(req, res) => {
  const {id} = req.params.id;
  const {cid} = req.params.cid;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :user and #SK, :course)',
    ExpressionAttributeValues: {
      ':user': `User-${id}`,
      ':course': `Course-${cid}`
    },
    ExpressionAttributeNames: { '#SK': 'SK (GSI-1-PK)', '#PK': 'PK' },
    UpdateExpression: 'Set GSI-1-SK =  :subject, Level = :level, Description = :description',
    ExpressionAttributeValues: {
      ':subject': req.params.subject,
      ':level': req.params.level,
      ':description': req.params.Description
    }
  }

  try {
    const data = await docClient.send(new UpdateCommand(params)).promise();
    res.json({success: 'post call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});



// Delete a course
app.get('/users/:id/courses/:cid', async(req, res) => {
  const {id} = req.params.id;
  const {cid} = req.params.cid;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :user and #SK, :course)',
    ExpressionAttributeValues: {
      ':user': `User-${id}`,
      ':course': `Course-${cid}`
    },
    ExpressionAttributeNames: { '#SK': 'SK (GSI-1-PK)', '#PK': 'PK' }
  }

  try {
    const data = await docClient.delete(params).promise();
    res.json({success: 'delete call succeed!', data: data});
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
