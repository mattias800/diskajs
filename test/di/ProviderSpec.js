import Provider from '../../src/di/Provider';

var assert = require('assert');

describe('Provider', () => {
    it('should throw exception when calling get()', () => {
        assert.throws(() => {
            new Provider().get();
        });
    });
});