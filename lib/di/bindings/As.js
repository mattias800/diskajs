'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _scopesSingleton = require('./scopes/Singleton');

var As = (function () {
    function As(args) {
        _classCallCheck(this, As);

        this.args = args;
    }

    _createClass(As, [{
        key: 'asSingleton',
        value: function asSingleton() {
            this.args.setScope(_scopesSingleton.Singleton);
        }
    }]);

    return As;
})();

exports.As = As;
//# sourceMappingURL=As.js.map