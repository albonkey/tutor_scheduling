# Database

## Introduction

Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. DynamoDB lets you offload the administrative burdens of operating and scaling a distributed database so that you don't have to worry about hardware provisioning, setup and configuration, replication, software patching, or cluster scaling. DynamoDB also offers encryption at rest, which eliminates the operational burden and complexity involved in protecting sensitive data.

## Core Components

* **Tables** - Similar to other database systems, DynamoDB stores data in tables. A *table* is a collection of data.

* **Items** - Each table contains zero or more items. An *item* is a group of attributes that is uniquely identifiable among all of the other items.

* **Attributes** - Each item is composed of one or more attributes. An *attribute* is a fundamental data element, something that does not need to be broken down any further.

* **Partition key** - A simple primary key, composed of one attribute known as the *partition* key.

* **Partition key and sort key** - Referred to as a *composite primary* key, this type of key is composed of two attributes. The first attribute is the *partition key*, and the second attribute is the *sort key*.

[Amazon DynamoDB Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

## Creating a Table

1. Create table
2. Enter desired name for the table, partition key (datatype) and sort key (datatype)
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Create_Table_1.jpg)
3. Leave the table setting to defaults (You can modify these later)
4. Enter `tutorhub` as key for tags
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Create_Table_2.jpg)
5. Create table

## Creating an item

1. Select the table
2. Explore table items
3. Create item
4. Click on JSON view and turn off "View DynamoDB JSON"
5. Insert the JSON format data
6. Create item
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Create_Item.jpg)


## Design

The database consists of 6 collections as shown below

![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Database_Updated.jpg)


## Calling DynamoDB from Lambda


The easiest way to interact with DynamoDB from Lambda in a Node.js environment is to use the [DynamoDB Document Client](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html). 

### Creating an item in DynamoDB from Lambda

```javascript
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'your-table-name',
  /* Item properties will depend on your application concerns */
  Item: {
     id: '12345',
     price: 100.00
  }
}

async function createItem(){
  try {
    await docClient.put(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  try {
    await createItem()
    return { body: 'Successfully created item!' }
  } catch (err) {
    return { error: err }
  }
};
```

### Getting an item by primary key in DynamoDB from Lambda

```javascript
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'your-table-name',
  /* Item properties will depend on your application concerns */
  Key: {
    id: '12345'
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
```

### Scanning a table

```javascript
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'your-table-name'
}

async function listItems(){
  try {
    const data = await docClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await listItems()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
```

### Querying a table

```javascript
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: 'your-table-name',
  IndexName: 'some-index',
  KeyConditionExpression: '#name = :value',
  ExpressionAttributeValues: { ':value': 'shoes' },
  ExpressionAttributeNames: { '#name': 'name' }
}

async function queryItems(){
  try {
    const data = await docClient.query(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await queryItems()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
```