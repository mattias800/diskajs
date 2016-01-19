import Validator from '../../src/di/util/Validator';
import Module from '../../src/di/Module';

var assert = require("assert");

describe('Validator', () => {

    describe('validateListOnlyContainsInstancesOf', () => {

        it('should exist', () => {
            assert(typeof new Validator().validateListOnlyContainsInstancesOf === 'function');
        });

        it('should work with instanceof', () => {
            assert(!([] instanceof Validator));
            assert(!(Module instanceof Validator));
            assert(!(Module instanceof Array));
            assert(Module instanceof Object);
        });

        it('should accept empty list', () => {
            assert(new Validator().validateListOnlyContainsInstancesOf([], Array, ''));
        });

        it('should not accept undefined list', () => {
            assert.throws(() => {
                new Validator().validateListOnlyContainsInstancesOf(undefined, Array, '');
            });
        });

        it('should not accept undefined type', () => {
            assert.throws(() => {
                new Validator().validateListOnlyContainsInstancesOf([], undefined, '');
            });
        });

        it('should deny list with one element of wrong type', () => {
            assert.throws(() => {
                new Validator().validateListOnlyContainsInstancesOf([new Module()], Validator, '');
            });
        });

        it('should accept list of Module objects', () => {
            assert(new Validator().validateListOnlyContainsInstancesOf([new Module(), new Module()], Module, ''));
        });

        it('should deny list of Module objects and an Array', () => {
            assert.throws(() => {
                new Validator().validateListOnlyContainsInstancesOf([new Module(), new Module(), []], Module, '');
            });
        });

        it('should deny list of Module objects and a Validator', () => {
            assert.throws(() => {
                new Validator().validateListOnlyContainsInstancesOf([new Module(), new Module(), new Validator()], Module, '');
            });
        });

    });
});

