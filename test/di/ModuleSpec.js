import {Module} from '../../src/di/Module';

var assert = require('assert');

import {Wheel} from '../../test-resources/car/Wheel';
import {WheelProvider} from '../../test-resources/car/WheelProvider';

describe('Module', function() {

    it('should throw when toProvider() is supplied no argument', function() {
        var module = new Module();
        assert.throws(function() {
            module.bind(Module).toProvider();
        })
    });

    describe('Error messages', function() {
        it('should say which type is being bound when invalid to-parameter was specified', function() {
            assert.throws(function() {
                var module = new Module();
                module.bind(Wheel).to(undefined);
            });
        });

        it('should throw when trying to bind same type twice.', function() {
            var module = new Module();
            module.bind(Wheel).toProvider(WheelProvider);
            assert.throws(function() {
                module.bind(Wheel).toProvider(WheelProvider);
            });
        });
    });

});