import ClassBinding from "../../../src/di/bindings/types/ClassBinding";
import Module from "../../../src/di/Module";

var assert = require('assert');

describe('ClassBinding', () => {

    it('should store TheClass from construction', () => {
        assert(new ClassBinding(Module).TheClass === Module);
    });

});