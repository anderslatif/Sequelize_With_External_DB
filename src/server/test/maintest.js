var chai = require('chai');
var chai_assert = chai.assert;    // Using Assert style
var chai_expect = chai.expect;    // Using Expect style
var chai_should = chai.should();  // Using Should style


var assert = require('assert');
var expect = require('expect.js');
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4)); // this will succeed
            expect([1,2,3].indexOf(0)).to.equal(1); // this will fail
        });
    });
});

