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
 * Example get method *
 **********************/

app.get('/reviews', async(req, res) => {
  // Add your code here
  const params = {
    TableName : 'Tutorhub',
    IndexName : 'GSI2',
    FilterExpression: 'begins_with(#PK, :review)',
    ExpressionAttributeValues: {
      ':review': `Review`
    },
    ExpressionAttributeName: {'#PK': 'SK (GSI-1-PK)'}
  }
  try{
    const data = await docClient.scan(params).promise();
    const reviews = data.Items
    res.json({success: 'get call succeed!', data: reviews});
  }catch(err){
    res.status(500).json({err});
  }

  
});
//Get a review by ID
app.get('/reviews/:id', async(req, res) => {
  // Add your code here
  const {id} = req.params;
  const params = {
    TableName : 'Tutorhub',
    IndexName : 'GSI2',
    KeyConditionExpression: '#PK = :review',
    ExpressionAttributeValues: {
      ':review': `Review-${id}`
    },
    ExpressionAttributeName: {'#PK': 'SK (GSI-1-PK)'}
  }
  try{
    const data = await docClient.scan(params).promise();
    const review = data.Items[0];
    res.json({success: 'get call succeed!', data: review});
  }catch(err){
    res.status(500).json({err:err});
  }

  //res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/




app.post('/reviews', async(req, res) => {
  const reviewId = randomUUID();
  const {Description, Rating, Name, TutorId, StudentId} = req.body;
  const CreatedOn = new Date();

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `Review-${reviewId}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Details',
            'Description': Description,
            'Rating': Rating,
            'CreatedOn': CreatedOn,
            'ReviewerID': `User-${StudentId}`,
            'ReviewedID': `User-${TutorId}`
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${StudentId}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Reviewer',
            'Description': Description,
            'Rating': Rating,
            'CreatedOn': CreatedOn
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${TutorId}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
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


/****************************
* Example put method *
****************************/

app.put('reviews/:id', async(req, res) => {
  const {id} = req.params;
  const { Description, Rating, TutorId, StudentId } = req.body;

  const params = {
    TransactItems: [
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${StudentId}`,
            "SK (GSI-1-PK)": `Review-${id}`
          },
          UpdateExpression: 'Set #Description = :Description, #Rating = :Rating',
          ExpressionAttributeValues: {
            ':Description': Description,
            ':Rating': Rating
          },
          ExpressionAttributeNames: {
            '#Description' : 'Description',
            '#Rating' : 'Rating'
          }
        }
      },
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${TutorId}`,
            "SK (GSI-1-PK)": `Review-${id}`
          },
          UpdateExpression: 'Set #Description = :Description, #Rating = :Rating',
          ExpressionAttributeValues: {
            ':Description': Description,
            ':Rating': Rating
          },
          ExpressionAttributeNames: {
            '#Description' : 'Description',
            '#Rating' : 'Rating'
          }
        }
      },
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `Review-${id}`,
            "SK (GSI-1-PK)": `Review-${id}`
          },
          UpdateExpression: 'Set #Description = :Description, #Rating = :Rating',
          ExpressionAttributeValues: {
            ':Description': Description,
            ':Rating': Rating
          },
          ExpressionAttributeNames: {
            '#Description' : 'Description',
            '#Rating' : 'Rating'
          }
        }
      }
    ]
  };

  try {
    const data = await docClient.transactWriteItems(params).promise();
    res.json({success: 'put call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});


/****************************
* Example delete method *
****************************/

app.delete('/reviews', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/reviews/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
