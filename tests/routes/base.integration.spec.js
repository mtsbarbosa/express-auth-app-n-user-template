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


describe('Base', () => {
  describe('#authenticate()', () => {
    it('should return token', async() => {
      var auth = await authentication_helper.authenticate(basic_fixtures);
      assert.isNotEmpty(auth.body.token);
    });
  });

  describe('GET users', () => {
    it('should have entity auto attached to the request', async() => {
      var auth = await authentication_helper.authenticate(basic_fixtures);
      try{
        var users =
            await chai.request(server)
                      .get('/express-auth-app-n-user-template/users')
                      .set('x-access-token', auth.body.token);

      }catch(err){
        console.log('Error to get users => ', err);
      }
      assert.equal(basic_fixtures.application.object.name, users.body.message.name);
    });

    /*it('should bring status related to header application in case of being root', async() => {
      var auth = await authentication_helper.authenticate(basic_fixtures);
      try{
        var status =
            await chai.request(server)
                      .get('/express-auth-app-n-user-template/status/'+basic_fixtures.not_root_status.object._id)
                      .set('x-access-token', auth.body.token)
                      .set('application_id', basic_fixtures.not_root_application.object._id);

      }catch(err){
        console.log('Error to get status not root => ', err);
      }
      expect(status).to.have.status(200);
      assert.equal(basic_fixtures.not_root_status.object.name, status.body.message.name);
    });

    it('should not bring status related to header application in case of not being root', async() => {
      var auth = await authentication_helper.authenticate_not_root(basic_fixtures);
      try{
        var status =
            await chai.request(server)
                      .get('/express-auth-app-n-user-template/status/'+basic_fixtures.status_active.object._id)
                      .set('x-access-token', auth.body.token)
                      .set('application_id', basic_fixtures.application.object._id);
            assert(false);
      }catch(err){
        expect(err).to.have.status(404);
        expect(err.response.body.message).to.be.equal('Not found');
      }
    });*/
  });
});
