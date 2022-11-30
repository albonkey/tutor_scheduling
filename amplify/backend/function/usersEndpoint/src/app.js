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

/**********************
 *   POST methods     *
 **********************/

// Create a user
app.post('/users', User.createUser);

// Create a course for a user by ID
app.post('/users/:id/courses', async(req, res) => {
  const {id} = req.params;
  const cid = randomUUID();
  const {Subject, Level, Description } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Item: {
      'PK': `User-${id}`,
      'SK (GSI-1-PK)': `Course-${cid}`,
      'GSI-1-SK': Subject,
      'Level': Level,
      'Description': Description,
      'Rating': 0,
      'TotalSessions': 0,
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
// This should be in reviews endpoint and just be Post /reviews

// Create a session for a user by ID
// This should be in sessions endpoint and just be Post /sessions
app.post('/sessions', async(req, res) => {
  const {id} = req.params;
  const sid = randomUUID();
  const {Subject, Level, Description, StartOn, Amount, tid, Status, StudentName, TutorName, availability} = req.body;

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `Session-${sid}`,
            'SK (GSI-1-PK)': `Session-${sid}`,
            'GSI-1-SK': 'Details',
            'GSI-2-PK': Subject,
            'Level': Level,
            'Description': Description,
            'StartOn': StartOn,
            'Amount': Amount,
            'TutorID': `User-${tid}`,
            'StudentID': `User-${id}`,
            'Status': Status
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${tid}`,
            'SK (GSI-1-PK)': `Session-${sid}`,
            'GSI-1-SK': 'Tutor',
            'Subject': Subject,
            'StartOn': StartOn,
            'StudentName': StudentName
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${id}`,
            'SK (GSI-1-PK)': `Session-${sid}`,
            'GSI-1-SK': 'Student',
            'Subject': Subject,
            'StartOn': StartOn,
            'TutorName': TutorName
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


// Create a payment for a user by ID
// This should be in payments endpoint and just be Post /payments
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

// Update a user by ID
app.put('/users/:id', async(req, res) => {
  const {id} = req.params;
  const { Name, Bio } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Key: {
        "PK": `User-${id}`,
        "SK": 'Details'
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
// This should be in reviews endpoint and just be Put /reviews/:id

// Update a session for a user by ID
// This should be in sessions endpoint and just be Put /sessions/:id
app.put('/users/:id/sessions/:sid', async(req, res) => {
  const { id, sid } = req.params;
  const { tid, Status } = req.body;

  const params = {
    TransactItems: [
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${id}`,
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
// This should be in reviews endpoint and just be Delete /reviews/:id
app.delete('/users/:id/reviews/:rid', async(req, res) => {
  const {id, rid} = req.params;
  const {tid} = body.params;

  const params = {
    TransactItems: [
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${id}`,
            "SK (GSI-1-PK)": `Review-${rid}`
          }
        }
      },
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${tid}`,
            "SK (GSI-1-PK)": `Review-${rid}`
          }
        }
      },
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `Review-${rid}`,
            "SK (GSI-1-PK)": `Review-${rid}`
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

// Delete a session for a user by ID
// This should be in sessions endpoint and just be Delete /sessions/:id
app.delete('/users/:id/sessions/:sid', async(req, res) => {
  const {id, sid} = req.params;
  const {tid} = body.params;

  const params = {
    TransactItems: [
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${id}`,
            "SK (GSI-1-PK)": `Session-${sid}`
          }
        }
      },
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${tid}`,
            "SK (GSI-1-PK)": `Session-${sid}`
          }
        }
      },
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `Session-${sid}`,
            "SK (GSI-1-PK)": `Session-${sid}`
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


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
