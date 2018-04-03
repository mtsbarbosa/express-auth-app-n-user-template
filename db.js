var mongoose = require( 'mongoose' );
var express = require('express');
var path = require('path');
var fs = require('fs');
var config = require('./config');
var string_helper = require('./helpers/string_helper');

var Schema   = mongoose.Schema;

var models = fs.readdirSync('./models');

for (var i = 0; i < models.length; i++) {
    var file = models[i].substr(0, models[i].lastIndexOf('.'));
    mongoose.model( string_helper.transformUnderlineToCamelCase(file), require('./models/' + file).schema());
}

mongoose.Promise = global.Promise;

if(config.mongoose.debug){
  mongoose.set('debug', function (collectionName, method, query, doc) {
    let set = {
          coll: collectionName,
          method: method,
          query: query,
          doc: doc
      };
    console.log('QUERY=>',set);
  });
}

module.exports = {
  connection: null,
  initialize: async() => {
     mongoose.Promise = global.Promise;
     console.log('database',config.database);
     await mongoose.connect( config.database, {useMongoClient: true});
     return mongoose.connection;
  }
};
