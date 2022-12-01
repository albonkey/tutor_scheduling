const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const createReview = async (req, res) => {
  const {id} = req.params;
  const reviewId = randomUUID();
  const { description, rating, tutorName, tutorID, studentName, studentId } = req.body;
  const createdOn = new Date();

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: 'Tutorhub',
          Item: {
            'PK': `Review-${rid}`,
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
            'PK': `User-${tid}`,
            'SK (GSI-1-PK)': `Review-${reviewId}`,
            'GSI-1-SK': 'Reviewed',
            'Description': description,
            'Rating': rating,
            'CreatedOn': createdOn,
            'ReviewerName': studentName
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
}

const getReviewById = async (req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :review',
    ExpressionAttributeValues: {
      ':review': `Review-${id}`,
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

const updateReview = async (req, res) => {
  res.json({success: 'Review Updated! (Not Implemented)'});
}

const deleteReview = async (req, res) => {
  res.json({success: 'Review Deleted. (Not Implemented)'});
}
