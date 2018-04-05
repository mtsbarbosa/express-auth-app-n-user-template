var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;
var basic_fixtures = require('../fixtures/basic_fixtures');
var user_controller = require('../../controllers/user');
var User = require('../../models/user');
var should = chai.should();
var error = require('../../helpers/error');
var mongoose = require('mongoose');
var factoryGirlConfig = require('../config/factory-girl-config');

var new_user;
var try_user;
var same_email_user;
var no_name_user;
var no_email_user;
var no_password_user;

describe('User Controller', () => {
  before(async() => {
    new_user = await factoryGirlConfig.factoryGirl.build('user',{
                            _id: mongoose.Types.ObjectId(),
                            name: 'new user',
                            email: 'user@test.com',
                            password: 'xD$%#sR89C'});

    same_email_user = JSON.parse(JSON.stringify(new_user));
    same_email_user._id = mongoose.Types.ObjectId();

    try_user = JSON.parse(JSON.stringify(new_user));
    try_user._id = mongoose.Types.ObjectId();
    try_user.email = 'user2@test.com';

    no_name_user = JSON.parse(JSON.stringify(try_user));
    delete no_name_user.name;
    no_email_user = JSON.parse(JSON.stringify(try_user));
    delete no_email_user.email;
    no_password_user = JSON.parse(JSON.stringify(try_user));
    delete no_password_user.password;

    new_user = await user_controller.sign_up(new_user);
  });

  describe('#sign_up(user)', () => {
    it('Shoud not allow to add without mandatory properties', async() => {
      user_controller.sign_up(no_name_user)
          .should.be.rejectedWith(mongoose.Error.ValidationError);
      user_controller.sign_up(no_email_user)
          .should.be.rejectedWith(mongoose.Error.ValidationError);
      user_controller.sign_up(no_password_user)
          .should.be.rejectedWith(mongoose.Error.ValidationError);
    });
    it('Shoud not allow to add already existent user accourding with email', async() => {
      user_controller.sign_up(same_email_user)
          .should.be.rejected;
    });
    it('New user should be inactive ', async() => {
      try{
        expect(new_user.active).to.equal(false);
      }catch(err){
        assert(false);
      }
    });
    it('New user should not be master ', async() => {
      try{
        expect(new_user.is_master).to.equal(false);
      }catch(err){
        assert(false);
      }
    });
  });
  describe('#activate(user)', () => {
  });
  describe('#login(user)', () => {
  });
  describe('#edit(user)', () => {
  });
  describe('#add_application(user, application)', () => {
  });
  describe('#remove_application(user, application)', () => {
  });
});
