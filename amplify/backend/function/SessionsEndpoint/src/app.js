const express = require('express')
const bodyParser = require('body-parser')
//const {randomUUID} = require('crypto');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'})
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
 * Get all sessions *
 **********************/

 app.get('/sessions', async(req, res) => {

  const params = {
    TableName : 'Tutorhub',
    IndexName : 'GSI2',
    FilterExpression: 'begins_with(#PK, :session)',
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

/**********************
 * Get session by id *
 **********************/
app.get('/sessions/:id', async(req, res) => {
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

  try {
    const data = await docClient.query(params).promise();

    res.json({success: 'get call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
});


/****************************
* Get session by subject *
****************************/

app.get('/sessions/:subject', async(req, res)=>{
  const{subject}=req.params;
  const params = {
    TableName : 'TutorHub',
    IndexName : 'SessionGSI',
    KeyConditionExpression: '#PK = :subject',
    ExpressionAttributeValues: {
      ':subject': subject
    },
    ExpressionAttributeNames: { '#PK': 'GSI-2-PK' }
  }

  try {
    const data = await docClient.query(params).promise();
    //const session = data.Items[0]
    res.json({success: 'get call succeed!', data: data});
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


app.listen(3000, function() {
    console.log("App started")
});


// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
