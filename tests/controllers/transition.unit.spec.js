/*var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;
var basic_fixtures = require('../fixtures/basic_fixtures');
var transition_controller = require('../../controllers/transition');
var Transition = require('../../models/transition');
var should = chai.should();
var error = require('../../helpers/error');


describe('Transition Controller', () => {
  describe('#advance(transition_id, object_id, application_id)', () => {
    it('Invalid transition id should throw an IdFormatError', async() => {
      transition_controller.advance('123',require('mongoose').Types.ObjectId())
        .should.be.rejectedWith(error.IdFormatError, 'transition_id provided is invalid');
    });
    it('Not present transition should throw a NotFoundError', async() => {
      transition_controller.advance(require('mongoose').Types.ObjectId(),require('mongoose').Types.ObjectId(),basic_fixtures.application.object._id)
        .should.be.rejectedWith(error.NotFoundError, 'Not found');
    });
    it('Transition Initial => Should add a record transition and return the status_to of the transition executed ', async() => {
      try{
        var object_id = require('mongoose').Types.ObjectId();
        var advance =
          await transition_controller
            .advance(basic_fixtures.transition_initial.object._id,object_id,basic_fixtures.application.object._id);
          expect(advance.status.name).to.be.equal(basic_fixtures.status_active.object.name);
          expect(advance.result).to.be.equal(Transition.transition_execute_result.success);
          expect(advance.message).to.be.equal(object_id + " was advanced to Status{id='"+ basic_fixtures.status_active.object._id +"',code='"+ basic_fixtures.status_active.object.code +"'}");
        var record_transition_list =
          await transition_controller.findRecordTransitionsByObjectId(object_id, basic_fixtures.application.object._id);
          expect(record_transition_list).to.have.lengthOf(1);
          expect(record_transition_list[0].status_from).to.be.undefined;
          expect(record_transition_list[0].status_to.toString()).to.be.equal(basic_fixtures.status_active.object._id.toString());
          expect(record_transition_list[0].transition.toString()).to.be.equal(basic_fixtures.transition_initial.object._id.toString());
          expect(record_transition_list[0].workflow.toString()).to.be.equal(basic_fixtures.workflow.object._id.toString());
          expect(record_transition_list[0].entity.toString()).to.be.equal(basic_fixtures.entity.object._id.toString());
          expect(record_transition_list[0].start_date).to.not.be.null;
      }catch(err){
        console.log(err);
        assert(false);
      }
    });
  });
});
*/
