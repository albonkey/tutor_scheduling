// require in dependencies
const cors = require('cors');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
//mongodb+srv://harrybay:<password>@cluster0.hpd8y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//require in config.json that stores details like database name, passwords etc to build the MongoDB server url
const config = require('./config.json');
// require in different routers
const discovery = require('./discovery');
const documents = require('./documents');
const payments = require('./payments');
const people = require('./people');
const reviews = require('./reviews');
const screening = require('./screening');
const sessions = require('./sessions');

// call the express function which provides features and functionality for our server
const app = express();
const port = 8888;

// apply middleware to application level
app.use(cors());
app.use(express.json());

// add the discovery router using the prefix /discovery
app.use('/discovery', discovery);
// add the documents router using the prefix /documents
app.use('/documents', documents);
// add the payments router using the prefix /payments
app.use('/payments', payments);
// add the people router using the prefix /people
app.use('/people', people);
// add the reviews router using the prefix /reviews
app.use('/reviews', reviews);
// add the screening router using the prefix /screening
app.use('/screening', screening);
// add the sessions router using the prefix /sessions
app.use('/sessions', sessions);

// mongodb+srv://dbAdmin:<password>@cluster0.asnx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const url = `mongodb+srv://${config.username}:${config.password}@${config.cluster}/${config.database}`;
// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the MongoDB Server
client.connect((err) => {
    if (err) {
        throw new Error('Failed to connect to MongoDb');
    }

    console.log('Connected successfully to Mongo');

    app.locals.db = client.db();

    // start the server
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});
