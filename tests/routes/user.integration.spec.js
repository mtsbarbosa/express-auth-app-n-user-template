var chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
var requireDir = require('require-dir');
var models = requireDir('../../models');
var basic_fixtures = require('../fixtures/basic_fixtures');
var authentication_helper = require('../helpers/authentication');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);


describe('User Route', () => {
  describe('POST#authenticate', () => {
    it('should return token', async() => {
      var auth = await authentication_helper.authenticate_user(basic_fixtures);
      assert.isNotEmpty(auth.body.me);
    });
  });
});
