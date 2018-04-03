var chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
var sHelper = require('../../helpers/string_helper');
var should = chai.should();


describe('String Helper', () => {
  describe('#containsAtLeastOne()', () => {
    it('empty string should return false', async() => {
      assert(!sHelper.containsAtLeastOne('',['1','2']));
    });
    it('not containing array should return false', async() => {
      assert(!sHelper.containsAtLeastOne('test',['1','2']));
    });
    it('containing array should return true', async() => {
      assert(sHelper.containsAtLeastOne('test',['te','2']));
    });
  });
});
