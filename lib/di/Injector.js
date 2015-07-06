'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Module = require('./Module');

var _utilInstantiator = require('./util/Instantiator');

var _utilValidator = require('./util/Validator');

var _bindingsTypesClassBinding = require('./bindings/types/ClassBinding');

var _bindingsTypesInstanceBinding = require('./bindings/types/InstanceBinding');

var _bindingsScopesSingleton = require('./bindings/scopes/Singleton');

var Injector = (function () {
    function Injector(modules) {
        _classCallCheck(this, Injector);

        this.modules = getModulesFromArguments(modules, arguments);
        this.injectorStack = [];
        validateModules(this.modules);
    }

    _createClass(Injector, [{
        key: 'get',
        value: function get(type) {
            return _get(type, this);
        }
    }, {
        key: 'getChildInjector',
        value: function getChildInjector(childModules) {
            var modules = getModulesFromArguments(childModules, arguments);
            for (var i = 0; i < this.modules.length; i++) {
                modules.push(this.modules[i]);
            }
            return new Injector(modules);
        }
    }]);

    return Injector;
})();

exports.Injector = Injector;

function _get(typeOrTypeName, injector) {
    if (typeOrTypeName === undefined) {
        throw Error('Injector.get() requires one argument.');
    }
    if (listContainsType(injector.injectorStack, typeOrTypeName)) {
        throw Error('Circular injection.');
    }
    injector.injectorStack.push(typeOrTypeName);

    var binding = findBindingInModules(typeOrTypeName, injector);
    if (binding === undefined) {
        binding = createImplicitBinding(typeOrTypeName);
    }
    binding = updateBindingIfSingleton(binding, injector);
    var instance = binding.binding.get(injector);
    injector.injectorStack.pop();
    return instance;
}

function validateModules(modules) {
    for (var i = 0; i < modules.length; i++) {
        if (!(modules[i] instanceof _Module.Module)) {
            throw Error('Injector() can only take modules as arguments.');
        }
    }
}
function getModulesFromArguments(modules, args) {
    if (modules instanceof Array) {
        return modules;
    } else {
        var list = [];
        for (var i = 0; i < args.length; i++) {
            list.push(args[i]);
        }
        return list;
    }
}

function findBindingInModules(type, injector) {
    for (var i = 0; i < injector.modules.length; i++) {
        var module = injector.modules[i];
        var binding = module.getBindingForType(type);
        if (binding) {
            return binding;
        }
    }
    return undefined;
}

function updateBindingIfSingleton(binding, injector) {
    if (binding.scope === _bindingsScopesSingleton.Singleton && !(binding.binding instanceof _bindingsTypesInstanceBinding.InstanceBinding)) {
        binding.binding = new _bindingsTypesInstanceBinding.InstanceBinding(binding.binding.get(injector));
    }
    return binding;
}

function createImplicitBinding(type) {
    if (typeof type === 'string') {
        throw new Error('Failed when trying to inject ' + type + '. ' + 'Implicit binding is only possible if type was added to module. Use module.bind() to bind it. ' + 'If you are using constructor argument injection, you must bind all dependencies explicitly.');
    }
    return {
        binding: new _bindingsTypesClassBinding.ClassBinding(type)
    };
}

function listContainsType(list, type) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === type) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=Injector.js.map