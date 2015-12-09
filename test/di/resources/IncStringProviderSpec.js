import IncStringProvider from '../../../test-resources/inc/IncStringProvider';
import IncString from '../../../test-resources/inc/IncString';

var assert = require('assert');

describe('IncStringProvider', function() {

    it('should return an IncString', function() {
        new IncStringProvider();
        assert(new IncStringProvider().get() instanceof IncString);
    });

});