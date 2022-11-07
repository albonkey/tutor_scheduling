/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

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
 * Get all sessions *
 **********************/

 app.get('/sessions', async(req, res) => {

  const params = {
    TableName : 'Tutorhub',
    IndexName : 'GSI2',
    KeyConditionExpression: 'begins_with(#PK, :session)',
    ExpressionAttributeValues: {
      ':session': 'Session'
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
  
/****************************
* Get a session details by id *
****************************/
app.get('sessions/:id', async(req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    IndexName : 'GSI2',
    KeyConditionExpression: '#PK = :session',
    ExpressionAttributeValues: {
      ':session': `Session-${id}`
    },
    ExpressionAttributeNames: { '#PK': 'SK (GSI-1-PK)' }
  }
  console.log(params);

  try {
    const data = await docClient.query(params).promise();
    const course = data.Items[0]
    res.json({success: 'get call succeed!', data: course});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

/**********************************
*  Create a Session for user by ID
**********************************/

app.post('/users/:id/sessions', async(req, res) => {
  const {id} = req.params;
  
  const {Subject, Level, Description, Amount, TutorID, Status } = req.body;
  const StartOn = new Date();

  const params = {
    TableName : 'Tutorhub',
    Item: {
      'PK': `Session-${id}`,
      'SK (GSI-1-PK)': `Session-${id}`,
      'GSI-1-SK': Details,
      'GSI-2-PK': Subject,
      'Level': Level,
      'Description': Description,
      'StartOn': StartOn,
      'Amount': Amount,
      'TutorID': TutorID,
      'StudentID':`User-${id}`,
      'Status':Status
    }
  }

  try {
    const data = await docClient.put(params).promise();
    res.json({success: 'post call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});
/****************************
* Get session by subject *
****************************/

app.put('/sessions', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/sessions/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Update a session *
****************************/

ap.put('/sessions/:id', async(req, res) => {
  const { id} = req.params;
  const { tid, Status } = req.body;

  const params = {
    TransactItems: [
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `Session-${id}`,
            "SK (GSI-1-PK)": `Session-${sid}`
          },
          UpdateExpression: 'Set #Status = :Status',
          ExpressionAttributeValues: {
            ':Status': Status
          },
          ExpressionAttributeNames: {
            '#Status' : 'Status'
          }
        }
      },
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${tid}`,
            "SK (GSI-1-PK)": `Session-${sid}`
          },
          UpdateExpression: 'Set #Status = :Status',
          ExpressionAttributeValues: {
            ':Status': Status
          },
          ExpressionAttributeNames: {
            '#Status' : 'Status'
          }
        }
      },
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `Session-${sid}`,
            "SK (GSI-1-PK)": `Session-${sid}`
          },
          UpdateExpression: 'Set #Status = :Status',
          ExpressionAttributeValues: {
            ':Status': Status
          },
          ExpressionAttributeNames: {
            '#Status' : 'Status'
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


/**********************************
*  Delete a Session by ID
**********************************/
app.delete('/sessions/:id', async(req, res) => {
  const {id} = req.params;
  const params = {
    TransactItems: [
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `Session-${id}`,
            "SK (GSI-1-PK)": `Session-${id}`
          }
        }
      }
    ]
  };
  try {
    const data = await docClient.transactWriteItems(params).promise();
    res.json({success: 'delete call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app



