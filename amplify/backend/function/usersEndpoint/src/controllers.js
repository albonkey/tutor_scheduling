const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const {randomUUID} = require('crypto');

const getUserById = async (req, res) => {
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
};

const getUserReviews = async (req, res) => {
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
    const reviews = data.Items.filter(review => {
      if(review['GSI-1-SK'] === 'Reviewed'){
        return review;
      }
    })
    res.json({success: 'get call succeed!', data: review});
  } catch (err) {
    res.status(500).json({err:err});
  }
};

const getUserCourses = async (req, res) => {
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
};

const getUserSessions = async (req, res) => {
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
};

const getUserPayments = async (req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :user and begins_with(#SK, :payment)',
    ExpressionAttributeValues: {
      ':user': `User-${id}`,
      ':payment': 'Payment'
    },
    ExpressionAttributeNames: { '#SK': 'SK (GSI-1-PK)', '#PK': 'PK' }
  }

  try {
    const data = await docClient.query(params).promise();
    res.json({success: 'get call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
};

const getUserAvailability = async (req, res) => {
  const {id} = req.params;

  const params = {
    TableName : 'Tutorhub',
    KeyConditionExpression: '#PK = :user and begins_with(#SK, :availability)',
    ExpressionAttributeValues: {
      ':user': `User-${id}`,
      ':availability': 'Availability'
    },
    ExpressionAttributeNames: { '#SK': 'SK (GSI-1-PK)', '#PK': 'PK' }
  }

  try {
    const data = await docClient.query(params).promise();
    let availability;
    if(data.Items[0]){
      availability = data.Items[0].Data.availability;
    } else {
      availability = {}
    }

    res.json({ data: availability });
  } catch (err) {
    res.status(500).json({err:err});
  }
};

const updateUserAvailability = async (req, res) => {
  const {id} = req.params;
  const availability = req.body;
  const params = {
    TableName : 'Tutorhub',
    Key: {
        "PK": `User-${id}`,
        "SK (GSI-1-PK)": 'Availability'
    },
    UpdateExpression: `Set #Data = :Data`,
    ExpressionAttributeValues: {
      ':Data': availability,
    },
    ExpressionAttributeNames: { '#Data': 'Data' }
  }

  try {
    const data = await docClient.update(params).promise();

    res.json({success: 'Availability updated'});
  } catch (err) {
    res.status(500).json({err:err});
  }

};

//Don't need this since we are creating users throught Cognito
const createUser = async (req, res) => {
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
};

// Update a user by ID
const updateUser = async (req, res) => {
  const {id} = req.params;
  const { firstName, lastName, bio } = req.body;

  const params = {
    TableName : 'Tutorhub',
    Key: {
        "PK": `User-${id}`,
        "SK (GSI-1-PK)": 'Details'
    },
    UpdateExpression: `Set #FirstName = :firstName, #LastName = :lastName, #Bio = :bio`,
    ExpressionAttributeValues: {
      ':firstName': firstName,
      ':lastName': lastName,
      ':bio': bio
    },
    ExpressionAttributeNames: {
      '#FirstName' : 'FirstName',
      '#LastName' : 'LastName',
      '#Bio' : 'Bio'
    }
  }

  try {
    const data = await docClient.update(params).promise();
    res.json({success: 'put call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
};

const createUserAvailability = async (req, res) => {
  const {id} = req.params;
  const {availability} = req.body;
  const params = {
          TableName: 'Tutorhub',
          Item: {
            'PK': `User-${id}`,
            'SK (GSI-1-PK)': `Availability`,
            'Data': availability
          }
         }
   try {
    const data = await docClient.transactWriteItems(params).promise();
    res.json({success: 'post call succeed!', data: data});
  } catch (err) {
    res.status(500).json({err:err});
  }
};

module.exports = {
  getUserById,
  getUserReviews,
  getUserCourses,
  getUserSessions,
  getUserPayments,
  getUserAvailability,
  updateUserAvailability,
  createUserAvailability,
  createUser,
  updateUser,
}
