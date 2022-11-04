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


/**********************
 *    GET methods     *
 **********************/

// Get a user by ID
app.get('/users/:id', async(req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :user and #SK = :details',
    ExpressionAttributeValues: {
      ':user': `User-${id}`,
      ':details': 'Details'
    },
    ExpressionAttributeNames: { '#SK': 'SK (GSI-1-PK)', '#PK': 'PK' }
  }
  try {
    const data = await docClient.query(params).promise();
    res.json({success: 'get call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Get all reviews for a user by ID
app.get('/users/:id/reviews', async(req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :user and begins_with(#SK, :review)',
    ExpressionAttributeValues: {
      ':user': `User-${id}`,
      ':review': 'Review'
    },
    ExpressionAttributeNames: { '#SK': 'SK (GSI-1-PK)', '#PK': 'PK' }
  }
  try {
    const data = await docClient.query(params).promise();
    res.json({success: 'get call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }

});

// Get all courses for a user by ID
app.get('/users/:id/courses', async(req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :user and begins_with(#SK, :course)',
    ExpressionAttributeValues: {
      ':user': `User-${id}`,
      ':course': 'Course'
    },
    ExpressionAttributeNames: { '#SK': 'SK (GSI-1-PK)', '#PK': 'PK' }
  }

  try {
    const data = await docClient.query(params).promise();
    res.json({success: 'get call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Get all sessions for a user by ID
app.get('/users/:id/sessions', async(req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :user and begins_with(#SK, :session)',
    ExpressionAttributeValues: {
      ':user': `User-${id}`,
      ':session': 'Session'
    },
    ExpressionAttributeNames: { '#SK': 'SK (GSI-1-PK)', '#PK': 'PK' }
  }

  try {
    const data = await docClient.query(params).promise();
    res.json({success: 'get call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Get all payments for a user by ID
app.get('/users/:id/payments', async(req, res) => {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/**********************
 *   POST methods     *
 **********************/

// Create a user
app.post('/users', async(req, res) => {
  const {id} = req.params;

  const params = {
    TableName: 'Tutorhub',
    Item: {
      'PK': `User-${id}`
    }
  }
  try {
    const data = await docClient.put(params).promise();
    res.json({success: 'post call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Create a course for a user by ID
app.post('/users/:id/courses', async(req, res) => {
  const {id} = req.params;
  const cid = randomUUID();
  const {Subject, Level, Description, Rating, TotalSessions } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Item: {
      'PK': `User-${id}`,
      'SK (GSI-1-PK)': `Course-${cid}`,
      'GSI-1-SK': Subject,
      'Level': Level,
      'Description': Description,
      'Rating': Rating,
      'TotalSessions': TotalSessions,
    }
  }

  try {
    const data = await docClient.put(params).promise();
    res.json({success: 'post call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Create a review for a user by ID
app.post('/users/:id/reviews', async(req, res) => {
  const {id} = req.params;
  const rid = randomUUID();
  const {Description, Rating, Name, tid} = req.body;
  const CreatedOn = new Date();

  const params = {
    TransactItems: [
      {
        put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `Review-${rid}`,
            'SK (GSI-1-PK)': `Review-${rid}`,
            'GSI-1-SK': 'Details',
            'Description': Description,
            'Rating': Rating,
            'CreatedOn': CreatedOn,
            'ReviewerID': `User-${id}`,
            'ReviewedID': `User-${tid}`
          }
        }
      },
      {
        put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${id}`,
            'SK (GSI-1-PK)': `Review-${rid}`,
            'GSI-1-SK': 'Reviewer',
            'Description': Description,
            'Rating': Rating,
            'CreatedOn': CreatedOn
          }
        }, 
      },
      {
        put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${tid}`,
            'SK (GSI-1-PK)': `Review-${rid}`,
            'GSI-1-SK': 'Reviewed',
            'Description': Description,
            'Rating': Rating,
            'CreatedOn': CreatedOn,
            'ReviewerName': Name
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

// Update a user by ID
app.put('/users/:id', async(req, res) => {
  const {id} = req.params;
  const { Name, Bio } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Key: {
        "PK": `User-${id}`
    },
    UpdateExpression: `Set #SK = :Details, #Name = :Name, #Bio = :Bio`,
    ExpressionAttributeValues: {
      ':Details': 'Details',
      ':Name': Name,
      ':Bio': Bio
    },
    ExpressionAttributeNames: {
      '#SK' : 'SK (GSI-1-PK)',
      '#Name' : 'GSI-1-SK',
      '#Bio' : 'Bio'
    }
  }

  try {
    const data = await docClient.update(params).promise();
    res.json({success: 'put call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Update a course for a user by ID
app.put('/users/:id/courses/:cid', async(req, res) => {
  const { id, cid } = req.params;
  const { Subject, Level, Description, Rating, TotalSessions } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Key: {
        "PK": `User-${id}`,
        "SK (GSI-1-PK)": `Course-${cid}`
    },
    UpdateExpression: `Set #Subject = :Subject, #Level = :Level, #Description = :Description, 
                       #Rating = :Rating, #TotalSessions = :TotalSessions`,
    ExpressionAttributeValues: {
      ':Subject': Subject,
      ':Level': Level,
      ':Description': Description,
      ':Rating': Rating,
      ':TotalSessions': TotalSessions
    },
    ExpressionAttributeNames: {
      '#Subject' : 'GSI-1-SK',
      '#Level' : 'Level',
      '#Description' : 'Description',
      '#Rating' : 'Rating',
      '#TotalSessions' : 'TotalSessions'
    }
  }

  try {
    const data = await docClient.update(params).promise();
    res.json({success: 'put call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Update a review for a user by ID
app.put('/users/:id/reviews/:rid', async(req, res) => {
  const { id, rid } = req.params;
  const { Description, Rating } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Key: {
        "PK": `User-${id}`,
        "SK (GSI-1-PK)": `Review-${rid}`
    },
    UpdateExpression: `Set #Description = :Description, #Rating = :Rating`,
    ExpressionAttributeValues: {
      ':Description': Description,
      ':Rating': Rating
    },
    ExpressionAttributeNames: {
      '#Description' : 'Description',
      '#Rating' : 'Rating'
    }
  }

  try {
    const data = await docClient.update(params).promise();
    res.json({success: 'put call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

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

// Delete a course for a user by ID
app.delete('/users/:id/courses/:cid', async(req, res) => {
  const { id, cid } = req.params;

  const params = {
    TableName : 'Tutorhub',
    Key: {
      "PK": `User-${id}`,
      "SK (GSI-1-PK)": `Course-${cid}`
    }
  }

  try {
    const data = await docClient.delete(params).promise();
    res.json({success: 'delete call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Delete a review for a user by ID
app.delete('/users/:id/reviews/:cid', async(req, res) => {
  const { id, rid } = req.params;

  const params = {
    TableName : 'Tutorhub',
    Key: {
      "PK": `User-${id}`,
      "SK (GSI-1-PK)": `Review-${rid}`
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
