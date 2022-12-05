const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const {randomUUID} = require('crypto');

const createReview = async (req, res) => {
  const reviewId = randomUUID();
  const { description, rating, tutor, student, courseId, sessionId } = req.body;
  const createdOn = new Date();

  const ratingInt = parseInt(rating, 10);

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
            'Rating': ratingInt,
            'CreatedOn': createdOn,
            'ReviewerID': `User-${student.id}`,
            'ReviewedID': `User-${tutor.id}`
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${student.id}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Reviewer',
            'Description': description,
            'Rating': ratingInt,
            'CreatedOn': createdOn
          }
        }
      },
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${tutor.id}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Reviewed',
            'Description': description,
            'Rating': ratingInt,
            'CreatedOn': createdOn,
            'Reviewer': student
          }
        }
      },
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${tutor.id}`,
            "SK (GSI-1-PK)": `Course-${courseId}`
          },
          ExpressionAttributeNames: {
            '#Rating' : 'Rating',
            '#TotalReviews' : 'TotalReviews'
          },
          ExpressionAttributeValues: {
            ':addRating': ratingInt,
            ':addTotalReviews': 1
          },
          UpdateExpression: "ADD #Rating :addRating, #TotalReviews :addTotalReviews",
        }
      },
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `User-${tutor.id}`,
            "SK (GSI-1-PK)": 'Details'
          },
          ExpressionAttributeNames: {
            '#OverallRating' : 'OverallRating',
            '#OverallReviews' : 'OverallReviews'
          },
          ExpressionAttributeValues: {
            ':addOverallRating': ratingInt,
            ':addOverallReviews': 1
          },
          UpdateExpression: "ADD #OverallRating :addOverallRating, #OverallReviews :addOverallReviews",
        }
      },
      {
        Update: {
          TableName: 'Tutorhub',
          Key: {
            "PK": `Session-${sessionId}`,
            "SK (GSI-1-PK)": `Session-${sessionId}`
          },
          ExpressionAttributeNames: {
            '#ReviewId' : 'ReviewId',
          },
          ExpressionAttributeValues: {
            ':addReviewId': `Review-${reviewId}`,
          },
          UpdateExpression: "SET #ReviewId = :addReviewId",
        }
      }
    ]
  };

  try {
    const data = await docClient.transactWrite(params).promise();
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
