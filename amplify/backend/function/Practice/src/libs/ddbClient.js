const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const REGION = "us-west-2";
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ region: REGION });
module.exports = { ddbClient };
