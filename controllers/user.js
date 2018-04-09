var express = require('express');
var User = require('../models/user');
var mongoose = require('mongoose');
var error = require('../helpers/error');
var sessions = require('../sessions');
var config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
  findOne: async(user_id, projection) =>{
    if(!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(user_id))
      return null;
    return await User
                  .model()
                  .findOne({_id: user_id})
                  .select(projection);
  },
  findByEmail: async(email, projection) => {
    if(email == null || typeof(email) !== 'string' || email.length == 0)
      throw new error.IdFormatError('email provided is invalid');
    return await User
                  .model()
                  .findOne({email: email})
                  .select(projection);
  },
  sign_up: async(user) =>{
    user.active = false;
    user.is_master = false;
    return await User.model().create(user);
  },
  activate: async(user_id) =>{
    if(!mongoose.Types.ObjectId.isValid(user_id))
      throw new error.IdFormatError('_id provided is invalid');
    var user_to_activate = await module.exports.findOne(user_id, '_id name email password is_master active');
    if(user_to_activate == null)
      throw new error.NotFoundError('Not found');
    user_to_activate.active = true;
    return await user_to_activate.save();
  },
  login: async(email, password) => {
    try{
      var user = await module.exports.findByEmail(email,'email password active');
      if(user == null || !user.active)
        throw new error.NotFoundError('Not found');
      if(process.env.NODE_ENV === 'test'){
          if(password === user.password){
            const payload = {
              root: user.is_master
            };
            var token = jwt.sign(payload, config.secret, {
              expiresIn: 1440 // expires in 24 hours
            });
            sessions.user[token] = {
              user: user,
              date: new Date()
            };
            return token;
          }else{
            return null;
          }
      }else{
        // check if password matches
        bcrypt.compare(password, user.password,function(err,hash_res) {
            if(hash_res == true){
              // if user is found and password is right
              // create a token with only our given payload
              // we don't want to pass in the entire user since that has the password
              const payload = {
                root: user.is_master
              };
              var token = jwt.sign(payload, config.secret, {
                expiresIn: 1440 // expires in 24 hours
              });
              sessions.user[token] = {
                user: user,
                date: new Date()
              };
              // return the information including token as JSON
              return token;
            }else{
              return null;
            }
        });
      }
    }catch(err){
      throw err;
    }
  }
};
