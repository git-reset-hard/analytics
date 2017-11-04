// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set the region from the JSON file
AWS.config.loadFromPath('./server/config/config.json');

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var queueURL = 'https://sqs.us-west-1.amazonaws.com/478994730514/analyticsToCustomer';


const sendMessage = function(messageObj) {

  let querySQS = {
    DelaySeconds: 10,
    MessageBody: JSON.stringify(messageObj),
    QueueUrl: queueURL
  };

  sqs.sendMessage(querySQS, function(err, data) {
    if (err) {
      console.log('Error"', err);
    } else {
      console.log('SQS Send Success', data.MessageId);
    }
  });
};


module.exports = {
  sendMessage
};