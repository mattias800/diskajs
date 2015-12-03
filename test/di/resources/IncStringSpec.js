import IncString from '../../../test-resources/inc/IncString';

var assert = require('assert');

describe('IncString', function() {

    it('should return different numbers in each instance', function() {
        assert(new IncString().getString() !== new IncString().getString());
    })
});