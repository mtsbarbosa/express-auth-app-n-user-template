const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
const adapter = new FactoryGirl.MongooseAdapter();

// use the mongoose adapter as the default adapter
factory.setAdapter(adapter);

var path = require('path');
var fs = require('fs');
var requireDir = require('require-dir');

module.exports = {
    loadFactories: async(self) => {
      var _this = self;
      _this.config = require('../../config');
      _this.db = require('../../db');
      _this.db.connection = await _this.db.initialize();
      _this.factories = requireDir('../factories');
    },
    factories: null,
    factoryGirl: factory,
    config: null,
    db: null
};
