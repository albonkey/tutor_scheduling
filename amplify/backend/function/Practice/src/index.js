const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'Users',
  /* Item properties will depend on your application concerns */
  Key: {
    UserId: 4
  }
}

async function getItem(){
  try {
    const data = await docClient.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await getItem()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}