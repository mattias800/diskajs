'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _typesClassBinding = require('./types/ClassBinding');

var _typesClassBinding2 = _interopRequireDefault(_typesClassBinding);

var _typesInstanceBinding = require('./types/InstanceBinding');

var _typesInstanceBinding2 = _interopRequireDefault(_typesInstanceBinding);

var _typesProviderBinding = require('./types/ProviderBinding');

var _typesProviderBinding2 = _interopRequireDefault(_typesProviderBinding);

var _Provider = require('./../Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var BindTo = (function () {
    function BindTo(type, module) {
        _classCallCheck(this, BindTo);

        this.type = type;
        this.module = module;
    }

    _createClass(BindTo, [{
        key: 'toProvider',
        value: function toProvider(provider) {
            if (provider === undefined) {
                throw Error('toProvider() got undefined argument when trying to bind ' + parseTypeNameFromType(this.type) + '.');
            }
            return this.module.addBinding(this.type, new _typesProviderBinding2['default'](provider));
        }
    }, {
        key: 'toInstance',
        value: function toInstance(instance) {
            if (instance === undefined) {
                throw Error('toInstance() got undefined argument when trying to bind ' + parseTypeNameFromType(this.type) + '.');
            }
            return this.module.addBinding(this.type, new _typesInstanceBinding2['default'](instance));
        }
    }, {
        key: 'to',
        value: function to(TheClass) {
            if (TheClass === undefined) {
                throw Error('to() got undefined argument when trying to bind ' + parseTypeNameFromType(this.type) + '.');
            }
            return this.module.addBinding(this.type, new _typesClassBinding2['default'](TheClass));
        }
    }]);

    return BindTo;
})();

exports['default'] = BindTo;

function parseTypeNameFromType(type) {
    return type.toString().split(' ')[1].split('(')[0];
}
module.exports = exports['default'];
//# sourceMappingURL=BindTo.js.map
