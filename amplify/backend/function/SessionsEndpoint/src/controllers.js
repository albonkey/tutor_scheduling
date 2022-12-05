const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const {randomUUID} = require('crypto');


// Get all sessions
const getAllSessions = async (req, res) => {
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
};

// Get a session by ID
const getSessionById = async (req, res) => {
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
};

const deleteSessionById = async (req, res) => {
    const {sessionId} = req.params;
    const {tutorId, studentId} = body.params;

    const params = {
      TransactItems: [
        {
          Delete: {
            TableName: 'Tutorhub',
            Key: {
              "PK": `User-${studentId}`,
              "SK (GSI-1-PK)": `Session-${sessionId}`
            }
          }
        },
        {
          Delete: {
            TableName: 'Tutorhub',
            Key: {
              "PK": `User-${tutorId}`,
              "SK (GSI-1-PK)": `Session-${sessionId}`
            }
          }
        },
        {
          Delete: {
            TableName: 'Tutorhub',
            Key: {
              "PK": `Session-${sessionId}`,
              "SK (GSI-1-PK)": `Session-${sessionId}`
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
  };

// Create a session
const createSession = async (req, res) => {
    const sessionId = randomUUID();
    const {subject, level, description, startOn, amount, tutorId, studentId, status, studentFirstName, studentLastName,
            tutorFirstName, tutorLastName, availability} = req.body;

    const params = {
      TransactItems: [
        {
          Put: {
            TableName: 'Tutorhub',
            Item: {
              'PK': `Session-${sessionId}`,
              'SK (GSI-1-PK)': `Session-${sessionId}`,
              'GSI-1-SK': 'Details',
              'GSI-2-PK': subject,
              'Level': level,
              'Description': description,
              'StartOn': startOn,
              'Amount': amount,
              'TutorID': `User-${tutorId}`,
              'StudentID': `User-${studentId}`,
              'Status': status
            }
          }
        },
        {
          Put: {
            TableName: 'Tutorhub',
            Item: {
              'PK': `User-${tutorId}`,
              'SK (GSI-1-PK)': `Session-${sessionId}`,
              'GSI-1-SK': 'Tutor',
              'Subject': subject,
              'StartOn': startOn,
              'StudentFirstName': studentFirstName,
              'StudentLastName': studentLastName
            }
          }
        },
        {
          Put: {
            TableName: 'Tutorhub',
            Item: {
              'PK': `User-${studentId}`,
              'SK (GSI-1-PK)': `Session-${sessionId}`,
              'GSI-1-SK': 'Student',
              'Subject': subject,
              'StartOn': startOn,
              'TutorFirstName': tutorFirstName,
              'TutorLastName': tutorLastName
            }
          }
        },
        {
          Update: {
            TableName: 'Tutorhub',
            Key: {
              "PK": `User-${tutorId}`,
              "SK (GSI-1-PK)": 'Details'
            },
            ExpressionAttributeNames: {
              '#SessionsTutor' : 'SessionsTutor',
            },
            ExpressionAttributeValues: {
              ':addSession': 1
            },
            UpdateExpression: "ADD #SessionsTutor :addSession",
          }
        },
        {
          Update: {
            TableName: 'Tutorhub',
            Key: {
              "PK": `User-${studentId}`,
              "SK (GSI-1-PK)": 'Details'
            },
            ExpressionAttributeNames: {
              '#SessionsStudent' : 'SessionsStudent',
            },
            ExpressionAttributeValues: {
              ':addSession': 1
            },
            UpdateExpression: "ADD #SessionsStudent :addSession",
          }
        },
      ]
    };

    try {
      const data = await docClient.transactWriteItems(params).promise();
      res.json({success: 'post call succeed!', data: data});
    } catch (err) {
      res.status(500).json({err:err});
    }
  };

//Update a session by id
const updateSessionById = async (req, res) => {
  const { sessionId } = req.params;
  const { tutorId, studentId, status } = req.body;

  const params = {
    TransactItems: [
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${studentId}`,
            "SK (GSI-1-PK)": `Session-${sessionId}`
          },
          UpdateExpression: 'Set #Status = :Status',
          ExpressionAttributeValues: {
            ':Status': status
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
            "PK": `User-${tutorId}`,
            "SK (GSI-1-PK)": `Session-${sessionId}`
          },
          UpdateExpression: 'Set #Status = :Status',
          ExpressionAttributeValues: {
            ':Status': status
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
            "PK": `Session-${sessionId}`,
            "SK (GSI-1-PK)": `Session-${sessionId}`
          },
          UpdateExpression: 'Set #Status = :Status',
          ExpressionAttributeValues: {
            ':Status': status
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
};


module.exports = {
    getAllSessions,
    getSessionById,
    deleteSessionById,
    createSession,
    updateSessionById,
}
