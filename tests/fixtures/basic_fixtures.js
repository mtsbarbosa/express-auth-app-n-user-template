var express = require('express');

module.exports = {
  application : {
    build: 'application',
    object: null
  },
  not_root_application : {
    build: 'application',
    object: null
  },
  master_user : {
    build: 'user',
    object: null
  },
  common_user: {
    build: 'user',
    object: null
  }
};
