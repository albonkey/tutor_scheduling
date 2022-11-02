# Database

1. [Introduction](#introduction)
2. [Core Components](#core-components)
3. [Creating a Table](#creating-a-table)
4. [Creating an Item](#creating-an-item)
5. [Design](#design)
6. [Calling DynamoDB from Lambda](#calling-dynamodb-from-lambda)
7. [Generating UUID](#generating-uuid)



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

## Generating UUID

DynamoDB does not support auto-increment primary keys due to scaling limitations and cannot be guaranteed across multiple servers. A Better option is to assemble the primary key from multiple indices. The primary key can be up to 2048 bytes. We will be using Universal Unique Identifiers or UUID to generate IDs.

Crypto library in Node JS has a random UUID function that we can use:

```javascript 
Crypto.randomUUID([options])
```
By default, to improve performance, Node.js generates and caches enough random data to generate up to 128 random UUIDs. To generate a UUID without using the cache, set ```disableEntropyCache``` to ```true```. Default: ```false```.

This generates a random [RFC 4122](https://www.rfc-editor.org/rfc/rfc4122.txt) version 4 UUID. The UUID is generated using a cryptographic pseudorandom number generator.

### How to implement

First import the function from the library
```javascript 
import { randomUUID } from 'crypto';
```
Note: You might need to add ```"type": "module"``` to the ```package.json```. 

Simply call the function to create a UUID

```javascript
const newID = randomUUID();
```

As mentioned above you can set the ```disableEntropyCache``` to ```true``` like so:

```javascript
const newID = randomUUID({disableEntropyCache : true});
```