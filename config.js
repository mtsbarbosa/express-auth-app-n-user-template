var express = require('express');

module.exports = {
    'secret': 'XmfumccH8vhUgHEDJ5',
    'database': require('./db-connections').host,
    'bcrypt':{
      saltRounds: 10,
    },
    'mongoose':{
      debug: false,
      autoIndex: require('./env-variables')[process.env.NODE_ENV].mongoose.autoIndex
    },
    'morgan':{
      logger: require('./env-variables')[process.env.NODE_ENV].morgan.logger
    },
};
