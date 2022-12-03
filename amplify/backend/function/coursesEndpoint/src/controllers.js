const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const {randomUUID} = require('crypto');


const getAllCourses = async(req, res) => {
    const {search} = req.query;
  
    const params = {
      TableName : 'Tutorhub',
      IndexName : 'GSI2',
      FilterExpression: 'begins_with(#PK, :course) and begins_with(#SK, :search)',
      ExpressionAttributeValues: { ':course': `Course`,
                                    ':search': search },
      ExpressionAttributeNames: { '#PK': 'SK (GSI-1-PK)', '#SK': 'GSI-1-SK' }
    }
  
    try {
      const data = await docClient.scan(params).promise();
      const courses = data.Items
      res.json({success: 'get call succeed!', data: courses});
    } catch (err) {
      res.status(500).json({err:err});
    }
  };

const getCourseById = async (req, res) => {
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
  };

// Create a course for a user
const createCourse = async (req, res) => {
  const courseId = randomUUID();
  const {subject, level, description, firstName, lastName, tutorId, cost} = req.body;

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${tutorId}`,
            'SK (GSI-1-PK)': `Course-${courseId}`,
            'GSI-1-SK': subject,
            'Level': level,
            'Description': description,
            'FirstName': firstName,
            'LastName': lastName,
            'Rating': 0,
            'TotalSessions': 0,
            'TotalReviews': 0,
            'Cost': cost
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
            '#TotalCourses' : 'TotalCourses',
          },
          ExpressionAttributeValues: {
            ':addTotalCourses': 1
          },
          UpdateExpression: "ADD #TotalCourses :addTotalCourses",
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
};

// Update a course by id
const updateCourseById = async (req, res) => {
  const {courseId} = req.params;
  const { subject, level, description, rating, totalSessions, userId } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Key: {
        "PK": `User-${userId}`,
        "SK (GSI-1-PK)": `Course-${courseId}`
    },
    UpdateExpression: `Set #Subject = :Subject, #Level = :Level, #Description = :Description`,
    ExpressionAttributeValues: {
      ':Subject': subject,
      ':Level': level,
      ':Description': description,
      ':Rating': rating,
      ':TotalSessions': totalSessions
    },
    ExpressionAttributeNames: {
      '#Subject' : 'GSI-1-SK',
      '#Level' : 'Level',
      '#Description' : 'Description'
    }
  }

  try {
    const data = await docClient.update(params).promise();
    res.json({success: 'put call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
};

// Delete a course by id
const deleteCoursebyId = async (req, res) => {
  const { courseId } = req.params;
  const { tutorId } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Key: {
      "PK": `User-${tutorId}`,
      "SK (GSI-1-PK)": `Course-${courseId}`
    }
  }

  try {
    const data = await docClient.delete(params).promise();
    res.json({success: 'delete call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
};

  module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCoursebyId,
  }