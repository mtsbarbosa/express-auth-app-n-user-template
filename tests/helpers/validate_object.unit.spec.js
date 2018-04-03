var chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
var basic_fixtures = require('../fixtures/basic_fixtures');
var vObj = require('../../helpers/validate_object');
var should = chai.should();


describe('Validate Object', () => {
  describe('#isArray()', () => {
    it('array should be array', async() => {
      assert(vObj.isArray([]));
      assert(vObj.isArray(new Array()));
    });
    it('array should not be array', async() => {
      assert(!vObj.isArray({}));
      assert(!vObj.isArray(1));
      assert(!vObj.isArray("test"));
    });
  });

  describe('#extract()', () => {
    it('should remove not allowed', async() => {
      expect(vObj.extract({a:1,b:2},null,['a'])).to.not.have.property('b');
      expect(vObj.extract({a:1,b:2},[],['a'])).to.not.have.property('b');
      expect(vObj.extract({a:1,b:2},[],['c'])).to.not.have.property('b');
      expect(vObj.extract({a:1,b:2},[],['b'])).to.have.property('b');
    });

    it('should validate mandatory', async() => {
      assert(vObj.extract({a:1,b:2},['b'],['a','b']));
      expect(() => vObj.extract({a:1,b:2},['b'],['a'])).to.throw(vObj.ParamNotFoundError, 'b is mandatory');
      expect(() => vObj.extract({a:1,b:2},['c'],['a','c'])).to.throw(vObj.ParamNotFoundError, 'c is mandatory');
    });
  });
});
