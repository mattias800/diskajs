import {IncStringProvider} from '../../../test-resources/inc/IncStringProvider';
import {IncString} from '../../../test-resources/inc/IncString';

var assert = require('assert');

describe('IncStringProvider', function() {

    it('should return an IncString', function() {
        assert(new IncStringProvider().get() instanceof IncString);
    });

});