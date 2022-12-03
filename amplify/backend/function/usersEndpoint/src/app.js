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
const User = require('./controllers');
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


/**********************
 *    GET methods     *
 **********************/

// Get a user by ID
app.get('/users/:id', User.getUserById);

// Get all reviews for a user by ID
app.get('/users/:id/reviews', User.getUserReviews);

// Get all courses for a user by ID
app.get('/users/:id/courses', User.getUserCourses);

// Get all sessions for a user by ID
app.get('/users/:id/sessions', User.getUserSessions);

// Get all payments for a user by ID
app.get('/users/:id/payments', User.getUserPayments);

app.get('/users/:id/availability', User.getUserAvailability);

app.put('/users/:id/availability', User.updateUserAvailability);

app.post('/users/:id/availability', User.createUserAvailability);

// Get overall rating for a user by id
app.get('users/:id/rating', User.getAllRatings);

/**********************
 *   POST methods     *
 **********************/

// Create a user
app.post('/users', User.createUser);


// Create a payment for a user by ID
// This should be in payments endpoint and just be Post /payments (Can move this once we have a payments endpoint)
app.post('/users/:id/payments', async(req, res) => {
  const {id} = req.params;
  const pid = randomUUID();
  const {tid, Amount, SenderName, ReceiverName} = req.body;
  const CreatedOn = new Date();

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `Payment-${pid}`,
            'SK (GSI-1-PK)': `Payment-${pid}`,
            'GSI-1-SK': 'Details',
            'CreatedOn': CreatedOn,
            'Amount': Amount,
            'SenderID': `User-${id}`,
            'ReceiverID': `User-${id}`
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${tid}`,
            'SK (GSI-1-PK)': `Payment-${pid}`,
            'GSI-1-SK': 'Receiver',
            'Amount': Amount,
            'SenderName': SenderName
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${id}`,
            'SK (GSI-1-PK)': `Payment-${pid}`,
            'GSI-1-SK': 'Sender',
            'Amount': Amount,
            'ReceiverName': ReceiverName
          }
        }
      }
    ]
  };

  try {
    const data = await docClient.transactWriteItems(params).promise();
    res.json({success: 'post call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

/**********************
 *    PUT methods     *
 **********************/

app.put('users/:id', User.updateUser);


/**********************
 *   DELETE methods   *
 **********************/

// Delete a user by ID
app.delete('/users/:id', async(req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    Key: {
      "PK": `User-${id}`,
    }
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
