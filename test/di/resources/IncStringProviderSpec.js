import IncStringProvider from '../../../test-resources/inc/IncStringProvider';
import IncString from '../../../test-resources/inc/IncString';

var assert = require('assert');

describe('IncStringProvider', () => {

    it('should return an IncString', () => {
        new IncStringProvider();
        assert(new IncStringProvider().get() instanceof IncString);
    });

});