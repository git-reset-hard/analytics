const mongodb = require('../database/querydb.js');
const SQSHelp = require('./SQSHelper.js');

const listInsert = function(query, done) {
  let listObj = {
    queryID: query.queryID,
    listID: query.id,
    list: [],
    isPersonalized: query.isPersonalized
  };

  for (let i = 1; i <= 10; i++) {
    listObj.list.push(query['restaurantID_' + i]);
  }
  mongodb.List.create(listObj)
    .then((result) => {
      return mongodb.Query.findOne({queryID: query.queryID});
    })
    .then((query) => {
      if (query) {
        query.list = listObj.list;
        //send query to SQS
        SQSHelp.sendMessage(query);
        return mongodb.Query.findOneAndUpdate({queryID: query.queryID}, query);
      }
    })
    .then((result) => {
      //console.log('query successfully updated with list', result);
      done();
    })
    .catch((err) => {
      console.log('error with insertion'. err);
      done();
    });
};

const queryInsert = function(query, done) {
  query['queryID'] = query.id;
  
  mongodb.List.findOne({listID: query.servedList})
    .then((list) => {
      if (list) {
        query.list = list.list;
        //send query to SQS
        SQSHelp.sendMessage(query);

      }
      return mongodb.Query.create(query);
    })
    .then((result) => {
      //console.log('query inserted into DB', result);
      done();
    })
    .catch((err) => {
      console.log('error with insertion'. err);
      done();
    });
};


module.exports = {
  listInsert,
  queryInsert
};