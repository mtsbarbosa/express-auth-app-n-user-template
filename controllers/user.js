var express = require('express');
var User = require('../models/user');
var mongoose = require('mongoose');
var error = require('../helpers/error');

module.exports = {
  findOne: async(user_id, projection) =>{
    if(!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(user_id))
      return null;
    return await User
                  .model()
                  .findOne({_id: user_id})
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
  }
};
