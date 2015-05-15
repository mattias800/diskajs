import {Validator} from '../../src/di/util/Validator';
import {Module} from '../../src/di/Module';

var assert = require("assert");

describe('Validator', function() {

    describe('validateListOnlyContainsInstancesOf', function() {

        it('should exist', function() {
            assert(typeof new Validator().validateListOnlyContainsInstancesOf === 'function');
        });

        it('should work with instanceof', function() {
            assert(!([] instanceof Validator));
            assert(!(Module instanceof Validator));
            assert(!(Module instanceof Array));
            assert(Module instanceof Object);
        });

        it('should accept empty list', function() {
            assert(new Validator().validateListOnlyContainsInstancesOf([], Array, ''));
        });

        it('should not accept undefined list', function() {
            assert.throws(function() {
                new Validator().validateListOnlyContainsInstancesOf(undefined, Array, '');
            });
        });

        it('should not accept undefined type', function() {
            assert.throws(function() {
                new Validator().validateListOnlyContainsInstancesOf([], undefined, '');
            });
        });

        it('should deny list with one element of wrong type', function() {
            assert.throws(function() {
                new Validator().validateListOnlyContainsInstancesOf([new Module()], Validator, '');
            });
        });

        it('should accept list of Module objects', function() {
            assert(new Validator().validateListOnlyContainsInstancesOf([new Module(), new Module()], Module, ''));
        });

        it('should deny list of Module objects and an Array', function() {
            assert.throws(function() {
                new Validator().validateListOnlyContainsInstancesOf([new Module(), new Module(), []], Module, '');
            });
        });

        it('should deny list of Module objects and a Validator', function() {
            assert.throws(function() {
                new Validator().validateListOnlyContainsInstancesOf([new Module(), new Module(), new Validator()], Module, '');
            });
        });

    });
});

