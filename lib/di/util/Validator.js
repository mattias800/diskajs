"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = (function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, [{
        key: "validateListOnlyContainsInstancesOf",
        value: function validateListOnlyContainsInstancesOf(list, type, message) {
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

exports.default = Validator;
//# sourceMappingURL=Validator.js.map
