

//import { DynamoDBDClient } from "@aws-sdk/lib-dynamodb";
const { DynamoDBClient,BatchExecuteStatementCommand  } = require("@aws-sdk/client-dynamodb");
import { DynamoDBClient, BatchExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
//import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
// Set the AWS Region.
const REGION = "us-west-2"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBDClient({ region: REGION });

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };
// const ddbDocClient = DynamoDBDocument.from(ddbClient, translateConfig);
var ddbDocClient = new AWS.DynamoDB.DocumentClient(ddbClient,translateConfig);
const params = {
  TableName : 'Users',
  Item: {
     UserId: '3'
  }
}

async function createUsers(){
  try {
    await ddbDocClient.put(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  try {
    await createUsers()
    return { body: 'Successfully created item!' }
  } catch (err) {
    return { error: err }
  }
};
