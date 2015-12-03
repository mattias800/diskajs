'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BindTo = require('./bindings/BindTo');

var _BindTo2 = _interopRequireDefault(_BindTo);

var _As = require('./bindings/As');

var _As2 = _interopRequireDefault(_As);

var _InstanceBinding = require('./bindings/types/InstanceBinding');

var _InstanceBinding2 = _interopRequireDefault(_InstanceBinding);

var _SingletonScope = require('./bindings/scopes/SingletonScope');

var _SingletonScope2 = _interopRequireDefault(_SingletonScope);

var _Binding = require('./bindings/types/Binding');

var _Binding2 = _interopRequireDefault(_Binding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = (function () {
    function Module() {
        _classCallCheck(this, Module);

        this.bindings = {};
        this.bindingsPerTypeName = {};
        this.lastSuccessFulBindingTypeName = '';
    }

    _createClass(Module, [{
        key: 'bind',
        value: function bind(type) {
            if (type === undefined) {
                if (this.lastSuccessFulBindingTypeName === '') {
                    throw new Error('First module bind() get undefined argument. Type is required.');
                } else {
                    throw new Error('Module bind() get undefined argument. Type is required. ' + 'Last successful binding was for ' + this.lastSuccessFulBindingTypeName + '.');
                }
            }
            return new _BindTo2.default(type, this);
        }
    }, {
        key: 'addBinding',
        value: function addBinding(type, binding) {
            var typeName = parseTypeNameFromType(type);

            if (this.bindings[type] !== undefined) {
                throw Error('Type ' + typeName + ' already has a binding.');
            }
            var that = this;

            var binding = {
                binding: binding,
                scope: undefined
            };

            this.bindings[type] = binding;
            this.bindingsPerTypeName[typeName] = binding;

            this.lastSuccessFulBindingTypeName = typeName;

            return new _As2.default({
                setScope: function setScope(scopeType) {
                    that.bindings[type].scope = scopeType;
                }
            });
        }
    }, {
        key: 'getBindingForType',
        value: function getBindingForType(type) {
            if (typeof type === 'string') {
                return this.bindingsPerTypeName[type];
            } else {
                return this.bindings[type];
            }
        }
    }]);

    return Module;
})();

exports.default = Module;

function parseTypeNameFromType(type) {
    return type.toString().split(' ')[1].split('(')[0];
}
//# sourceMappingURL=Module.js.map
