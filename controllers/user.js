var express = require('express');
var User = require('../models/user');

module.exports = {
  sign_up: async(user) =>{
    user.active = false;
    user.is_master = false;
    return await User.model().create(user);
  }
};
