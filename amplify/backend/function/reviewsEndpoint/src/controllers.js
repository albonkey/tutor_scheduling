const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const {randomUUID} = require('crypto');

const createReview = async (req, res) => {
  const reviewId = randomUUID();
  const { description, rating, tutorId, studentFirstName, studentLastName, studentId, courseId } = req.body;
  const createdOn = new Date();

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `Review-${reviewId}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Details',
            'Description': description,
            'Rating': rating,
            'CreatedOn': createdOn,
            'ReviewerID': `User-${studentId}`,
            'ReviewedID': `User-${tutorId}`
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${studentId}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Reviewer',
            'Description': description,
            'Rating': rating,
            'CreatedOn': createdOn
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${tutorId}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Reviewed',
            'Description': description,
            'Rating': rating,
            'CreatedOn': createdOn,
            'ReviewerFirstName': studentFirstName,
            'ReviewerLastName': studentLastName
          }
        }
      },
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${tutorId}`,
            "SK (GSI-1-PK)": `Course-${courseId}`
          },
          ExpressionAttributeNames: {
            '#Rating' : 'Rating',
            '#TotalReviews' : 'TotalReviews'
          },
          ExpressionAttributeValues: {
            ':addRating': rating,
            ':addTotalReviews': 1
          },
          UpdateExpression: "SET #Rating = #Rating + :addRating, #TotalReviews = #TotalReviews + :addTotalReviews",
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
            '#OverallRating' : 'OverallRating',
            '#OverallReviews' : 'OverallReviews'
          },
          ExpressionAttributeValues: {
            ':addOverallRating': rating,
            ':addOverallReviews': 1
          },
          UpdateExpression: "SET #OverallRating = #OverallRating + :addOverallRating, #OverallReviews = #OverallReviews + :addOverallReviews",
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

const getReviewById = async (req, res) => {
  const {reviewId} = req.params;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :review',
    ExpressionAttributeValues: {
      ':review': `Review-${reviewId}`,
    },
    ExpressionAttributeNames: { '#PK': 'PK' }
  }
  try {
    const data = await docClient.query(params).promise();
    const review = data.Items[0];
    res.json({data: review});
  } catch (err) {
    res.status(500).json({err:err});
  }
}

//Update review by id
//FIX ME: The new totalRating is not currect. Need to subtract the previous rating first and then add the new one.
const updateReviewById = async (req, res) => {
  const { reviewId } = req.params;
  const { description, rating, tutorId, studentFirstName, studentLastName, studentId, courseId, TotalSessions, courseRating} = req.body;
  const createdOn = new Date();
  const totalSessions = TotalSessions + 1;
  const totalRating = courseRating + rating;

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `Review-${reviewId}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Details',
            'Description': description,
            'Rating': rating,
            'CreatedOn': createdOn,
            'ReviewerID': `User-${studentId}`,
            'ReviewedID': `User-${tutorId}`
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${id}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Reviewer',
            'Description': description,
            'Rating': rating,
            'CreatedOn': createdOn
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${tutorId}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Reviewed',
            'Description': description,
            'Rating': rating,
            'CreatedOn': createdOn,
            'ReviewerFirstName': studentFirstName,
            'ReviewerLastName': studentLastName
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${tutorId}`,
            'SK (GSI-1-PK)': `Course-${courseId}`,
            'Rating': totalRating,
            'TotalSessions': totalSessions
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
};

// Delete a review by id
const deleteReviewById = async (req, res) => {
  const {reviewId} = req.params;
  const {tutorId, studentId} = body.params;

  const params = {
    TransactItems: [
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${studentId}`,
            "SK (GSI-1-PK)": `Review-${reviewId}`
          }
        }
      },
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${tutorId}`,
            "SK (GSI-1-PK)": `Review-${reviewId}`
          }
        }
      },
      {
        Delete: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `Review-${reviewId}`,
            "SK (GSI-1-PK)": `Review-${reviewId}`
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

module.exports = {
  getReviewById,
  createReview,
  updateReviewById,
  deleteReviewById,
}
