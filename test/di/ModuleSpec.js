import {Module} from '../../src/di/Module';

var assert = require('assert');

describe('Module', function() {

    it('should throw when toProvider() is supplied no argument', function() {
        var module = new Module();
        assert.throws(function() {
            module.bind(Module).toProvider();
        })
    });

});