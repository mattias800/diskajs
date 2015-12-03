'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ClassBinding = require('./types/ClassBinding');

var _ClassBinding2 = _interopRequireDefault(_ClassBinding);

var _InstanceBinding = require('./types/InstanceBinding');

var _InstanceBinding2 = _interopRequireDefault(_InstanceBinding);

var _ProviderBinding = require('./types/ProviderBinding');

var _ProviderBinding2 = _interopRequireDefault(_ProviderBinding);

var _Provider = require('./../Provider');

var _Provider2 = _interopRequireDefault(_Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            return this.module.addBinding(this.type, new _ProviderBinding2.default(provider));
        }
    }, {
        key: 'toInstance',
        value: function toInstance(instance) {
            if (instance === undefined) {
                throw Error('toInstance() got undefined argument when trying to bind ' + parseTypeNameFromType(this.type) + '.');
            }
            return this.module.addBinding(this.type, new _InstanceBinding2.default(instance));
        }
    }, {
        key: 'to',
        value: function to(TheClass) {
            if (TheClass === undefined) {
                throw Error('to() got undefined argument when trying to bind ' + parseTypeNameFromType(this.type) + '.');
            }
            return this.module.addBinding(this.type, new _ClassBinding2.default(TheClass));
        }
    }]);

    return BindTo;
})();

exports.default = BindTo;

function parseTypeNameFromType(type) {
    return type.toString().split(' ')[1].split('(')[0];
}
//# sourceMappingURL=BindTo.js.map
