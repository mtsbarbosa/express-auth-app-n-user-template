// Path : ./migrations/config.js
var config = require('../config');

module.exports = {
  development : config.database,
  //test        : testDbUrl,
  //production  : prodDbUrl
}
