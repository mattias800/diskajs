"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instantiator = (function () {
    function Instantiator() {
        _classCallCheck(this, Instantiator);
    }

    _createClass(Instantiator, null, [{
        key: "createInstance",
        value: function createInstance(Type, args) {
            var Temp = function Temp() {},
                // temporary constructor
            inst,
                ret; // other vars

            // Give the Temp constructor the Constructor's prototype
            Temp.prototype = Type.prototype;

            // Create a new instance
            inst = new Temp();

            // Call the original Constructor with the temp
            // instance as its context (i.e. its 'this' value)
            ret = Type.apply(inst, args);

            // If an object has been returned then return it otherwise
            // return the original instance.
            // (consistent with behaviour of the new operator)
            return Object(ret) === ret ? ret : inst;
        }
    }]);

    return Instantiator;
})();

exports.default = Instantiator;
//# sourceMappingURL=Instantiator.js.map
