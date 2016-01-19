import IncString from '../../../test-resources/inc/IncString';

var assert = require('assert');

describe('IncString', () => {

    it('should return different numbers in each instance', () => {
        assert(new IncString().getString() !== new IncString().getString());
    })
});