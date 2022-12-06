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


/**********************
 *   POST methods     *
 **********************/

// Create a user
app.post('/users', User.createUser);

app.put('/users/:id', User.updateUser);


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

module.exports = app
