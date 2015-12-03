'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SingletonScope = require('./scopes/SingletonScope');

var _SingletonScope2 = _interopRequireDefault(_SingletonScope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var As = (function () {
    function As(args) {
        _classCallCheck(this, As);

        this.args = args;
    }

    _createClass(As, [{
        key: 'asSingleton',
        value: function asSingleton() {
            this.args.setScope(_SingletonScope2.default);
        }
    }]);

    return As;
})();

exports.default = As;
//# sourceMappingURL=As.js.map
