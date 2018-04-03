var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

module.exports = {
  authenticate: async function(basic_fixtures){
    try{
      var auth =
          await chai.request(server)
                    .post('/express-auth-app-n-user-template/authenticate')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({name: basic_fixtures.application.object.name, hash_key: basic_fixtures.application.object.hash_key});
      return auth;
    }catch(err){
      console.log('Error to authenticate => ', err);
    }
  },
  authenticate_not_root: async function(basic_fixtures){
    try{
      var auth =
          await chai.request(server)
                    .post('/express-auth-app-n-user-template/authenticate')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({name: basic_fixtures.not_root_application.object.name, hash_key: basic_fixtures.not_root_application.object.hash_key});
      return auth;
    }catch(err){
      console.log('Error to authenticate not root => ', err);
    }
  }
}
