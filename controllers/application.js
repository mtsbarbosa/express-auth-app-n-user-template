var express = require('express');
var Application = require('../models/application');
var bcrypt = require('bcryptjs');
var config = require('../config');

module.exports = {
  findOne: function(application, callback){
    /*bcrypt.hash("#fm8jX@Mpt$^j*YQ", config.bcrypt.saltRounds).then(function(hash) {
        console.log(hash);
    });*/
    Application
      .model()
      .findOne(application)
      .then(function (application) {
          callback(null,application);
      });
  },
  save: function(application, callback){
    bcrypt.hash(application.hash_key, config.bcrypt.saltRounds).then(function(hash) {
      application.hash_key = hash;
      Application.model().create(application, function(err, app){
          callback(err,app);
      });
    });

  }
};
