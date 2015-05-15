import {Provider} from '../../src/di/Provider';

var assert = require('assert');

describe('Provider', function() {
    it('should throw exception when calling get()', function() {
        assert.throws(function() {
            new Provider().get();
        });
    });
});