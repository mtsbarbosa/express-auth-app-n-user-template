var assert = require('assert');
var factoryGirlConfig = require('../config/factory-girl-config');
var requireDir = require('require-dir');
var models = requireDir('../../models');
var basic_fixtures = require('./basic_fixtures');

before(async() => {

  await factoryGirlConfig.loadFactories(factoryGirlConfig);

  var applicationBuild = await factoryGirlConfig.factoryGirl.build('application');
  var application = await models.application.model().create(applicationBuild);
  basic_fixtures.application.object = application;

  var notRootApplicationBuild = await factoryGirlConfig.factoryGirl.build('not_root_application');
  var notRootApplication = await models.application.model().create(notRootApplicationBuild);
  basic_fixtures.not_root_application.object = notRootApplication;

});

after(async() => {
  var mongoose = require('mongoose');
  await factoryGirlConfig.db.connection.db.dropDatabase();
});
