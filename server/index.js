const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise-native');
const port = process.env.PORT || 2424;
const restaurantList = require('./database/restaurantdb.js');
const appServerDB = require('./database/mysql.js');
const handleQuery = require('./controller/queryHandler.js');

// import entire SDK
//var AWS = require('aws-sdk');
//AWS.config.loadFromPath('./config.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res) => {
  res.status(200);
  res.send('Serving up webpage');
});










server.listen(port, () => {
  console.log(`(>^.^)> Server now listening on ${port}!`);
});