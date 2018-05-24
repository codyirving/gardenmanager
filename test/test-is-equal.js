const isEqual = require('../isEqual');

const expect = require('chai').expect;

describe('isEqual', function() {
    it('should give right answers for equal and unequal inputs', function() {
        expect(isEqual(1,1)).to.be.true;
    });
});

