var assert = require('assert');
var factoryGirlConfig = require('../config/factory-girl-config');
var requireDir = require('require-dir');
var models = requireDir('../../models');
var basic_fixtures = require('./basic_fixtures');

before(async() => {

  await factoryGirlConfig.loadFactories(factoryGirlConfig);

  var masterUserBuild = await factoryGirlConfig.factoryGirl.build('user');
  var masterUser = await models.user.model().create(masterUserBuild);
  basic_fixtures.master_user.object = masterUser;

  var commonUserBuild = await factoryGirlConfig.factoryGirl.build('user', {_id: require('mongoose').Types.ObjectId()});
  var commonUser = await models.user.model().create(commonUserBuild);
  basic_fixtures.common_user.object = commonUser;

  var applicationBuild = await factoryGirlConfig.factoryGirl.build('application',{user: masterUser._id});
  var application = await models.application.model().create(applicationBuild);
  basic_fixtures.application.object = application;

  var notRootApplicationBuild = await factoryGirlConfig.factoryGirl.build('not_root_application',{user: masterUser._id});
  var notRootApplication = await models.application.model().create(notRootApplicationBuild);
  basic_fixtures.not_root_application.object = notRootApplication;
});

after(async() => {
  var mongoose = require('mongoose');
  await factoryGirlConfig.db.connection.db.dropDatabase();
});
