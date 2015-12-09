"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = (function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, [{
        key: "validateListOnlyContainsInstancesOf",
        value: function validateListOnlyContainsInstancesOf(list, type, message) {
            if (!Array.isArray(list)) throw new TypeError("Value of argument 'list' violates contract, expected array got " + (list === null ? "null" : list instanceof Object && list.constructor ? list.constructor.name : typeof list));
            if (typeof message !== "string") throw new TypeError("Value of argument 'message' violates contract, expected string got " + (message === null ? "null" : message instanceof Object && message.constructor ? message.constructor.name : typeof message));

            if (list === undefined) {
                throw Error(message);
            }
            if (type === undefined) {
                throw Error(message);
            }
            if (list && list.length) {
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    if (!(item instanceof type)) {
                        throw Error(message);
                    }
                }
            }
            return true;
        }
    }]);

    return Validator;
})();

exports["default"] = Validator;
module.exports = exports["default"];
//# sourceMappingURL=Validator.js.map
