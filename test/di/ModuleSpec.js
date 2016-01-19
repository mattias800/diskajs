import Module from '../../src/di/Module';

var assert = require('assert');

import Wheel from '../../test-resources/car/Wheel';
import WheelProvider from '../../test-resources/car/WheelProvider';

describe('Module', () => {

    it('should throw when toProvider() is supplied no argument', () => {
        var module = new Module();
        assert.throws(() => {
                module.bind(Wheel).toProvider();
            },
            /Wheel/);
    });

    describe('Error messages', () => {
        it('should say which type is being bound when invalid to-parameter was specified', () => {
            assert.throws(() => {
                    var module = new Module();
                    module.bind(Wheel).to(undefined);
                },
                /Wheel/
            );
        });

        it('should throw when trying to bind same type twice.', () => {
            var module = new Module();
            module.bind(Wheel).toProvider(WheelProvider);
            assert.throws(() => {
                    module.bind(Wheel).toProvider(WheelProvider);
                },
                /Wheel/);
        });

        it('should show last successful binding when a binding fails', () => {
            var module = new Module();
            module.bind(Wheel).toProvider(WheelProvider);
            assert.throws(() => {
                    module.bind(undefined).to(undefined);
                },
                /Wheel/
            );


        });
    });

});