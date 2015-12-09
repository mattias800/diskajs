'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bindingsBindTo = require('./bindings/BindTo');

var _bindingsBindTo2 = _interopRequireDefault(_bindingsBindTo);

var _bindingsAs = require('./bindings/As');

var _bindingsAs2 = _interopRequireDefault(_bindingsAs);

var _bindingsTypesInstanceBinding = require('./bindings/types/InstanceBinding');

var _bindingsTypesInstanceBinding2 = _interopRequireDefault(_bindingsTypesInstanceBinding);

var _bindingsScopesSingletonScope = require('./bindings/scopes/SingletonScope');

var _bindingsScopesSingletonScope2 = _interopRequireDefault(_bindingsScopesSingletonScope);

var _bindingsTypesBinding = require('./bindings/types/Binding');

var _bindingsTypesBinding2 = _interopRequireDefault(_bindingsTypesBinding);

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
            return new _bindingsBindTo2['default'](type, this);
        }
    }, {
        key: 'addBinding',
        value: function addBinding(type, binding) {
            if (!(binding instanceof _bindingsTypesBinding2['default'])) throw new TypeError('Value of argument \'binding\' violates contract, expected Binding got ' + (binding === null ? 'null' : binding instanceof Object && binding.constructor ? binding.constructor.name : typeof binding));

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

            return new _bindingsAs2['default']({
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

exports['default'] = Module;

function parseTypeNameFromType(type) {
    return type.toString().split(' ')[1].split('(')[0];
}
module.exports = exports['default'];
//# sourceMappingURL=Module.js.map
