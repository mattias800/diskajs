'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bindingsBindTo = require('./bindings/BindTo');

var _bindingsAs = require('./bindings/As');

var _bindingsTypesInstanceBinding = require('./bindings/types/InstanceBinding');

var _bindingsScopesSingleton = require('./bindings/scopes/Singleton');

var Module = (function () {
    function Module() {
        _classCallCheck(this, Module);

        this.bindings = {};
    }

    _createClass(Module, [{
        key: 'bind',
        value: function bind(type) {
            return new _bindingsBindTo.BindTo(type, this);
        }
    }, {
        key: 'addBinding',
        value: function addBinding(type, binding) {
            if (this.bindings[type] !== undefined) {
                throw Error('Type "' + type + '" already has a binding.');
            }
            var that = this;

            this.bindings[type] = {
                binding: binding,
                scope: undefined
            };

            return new _bindingsAs.As({
                setScope: function setScope(scopeType) {
                    that.bindings[type].scope = scopeType;
                }
            });
        }
    }, {
        key: 'getBindingForType',
        value: function getBindingForType(type) {
            return this.bindings[type];
        }
    }]);

    return Module;
})();

exports.Module = Module;
//# sourceMappingURL=Module.js.map