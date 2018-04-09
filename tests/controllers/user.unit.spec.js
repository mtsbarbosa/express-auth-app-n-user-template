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
var sessions = require('../../sessions')

var new_user;
var try_user;
var inactive_user;
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

    inactive_user = JSON.parse(JSON.stringify(new_user));
    inactive_user._id = mongoose.Types.ObjectId();
    inactive_user.email = 'user3@test.com';

    no_name_user = JSON.parse(JSON.stringify(try_user));
    delete no_name_user.name;
    no_email_user = JSON.parse(JSON.stringify(try_user));
    delete no_email_user.email;
    no_password_user = JSON.parse(JSON.stringify(try_user));
    delete no_password_user.password;

    new_user = await user_controller.sign_up(new_user);
    inactive_user = await user_controller.sign_up(inactive_user);
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
  describe('#activate(user_id)', () => {
    it('should return format error if id is weird ', async() => {
      user_controller.activate("123")
        .should.be.rejectedWith(error.IdFormatError, '_id provided is invalid');
    });
    it('should return not found error if user is not found ', async() => {
      user_controller.activate(mongoose.Types.ObjectId())
          .should.be.rejectedWith(error.NotFoundError, 'Not found');
    });
    it('should allow to activate user ', async() => {
      try{
        await user_controller.activate(new_user._id);
        var user_activated = await user_controller.findOne(new_user._id, 'active');
        expect(user_activated.active).to.equal(true);
      }catch(err){
        assert(false);
      }
    });
  });
  describe('#login(user)', () => {
    it('should return format error if email is weird ', async() => {
      user_controller.login(null,new_user.password)
        .should.be.rejectedWith(error.IdFormatError, 'email provided is invalid');
      user_controller.login('',new_user.password)
        .should.be.rejectedWith(error.IdFormatError, 'email provided is invalid');
    });
    it('should return not found error if user is not found ', async() => {
      user_controller.login('user999@test.com','test')
          .should.be.rejectedWith(error.NotFoundError, 'Not found');
    });
    it('should return not found error if user is inactive ', async() => {
      user_controller.login(inactive_user.email, inactive_user.password)
          .should.be.rejectedWith(error.NotFoundError, 'Not found');
    });
    it('should return token and register session', async() => {
      try{
        var token = await user_controller.login(new_user.email, new_user.password);
        expect(token).to.be.an('string');
        expect(token).to.not.be.empty;
        expect(sessions.user).to.have.any.keys(token);
        expect(sessions.user[token].user).to.not.be.null;
      }catch(err){
        console.log(err);
        assert(false);
      }
    });
  });
  describe('#edit(user)', () => {
  });
  describe('#add_application(user, application)', () => {
  });
  describe('#remove_application(user, application)', () => {
  });
});
