const DBHelpers = require('./helpers/DBHelpers.js');
const Consumer = require('sqs-consumer');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set the region from the JSON file
AWS.config.loadFromPath('./server/config/config.json');



const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/478994730514/app-serverToAnalytics',
  handleMessage: (message, done) => {
    message = JSON.parse(message.Body);
    if (message.type === 'list') {
      DBHelpers.listInsert(message, done);
    }
    if (message.type === 'query') {
      DBHelpers.queryInsert(message, done);
    }
  },
  sqs: new AWS.SQS()
});
 
app.on('error', (err) => {
  console.log(err.message);
});
 
app.start();
console.log('listening for messages...');



//pull down check-in/reviews from Customer Profiling
//pull down clicks from Customer Profiling

//match clicks with lists 