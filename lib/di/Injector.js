'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

var _utilInstantiator = require('./util/Instantiator');

var _utilInstantiator2 = _interopRequireDefault(_utilInstantiator);

var _utilValidator = require('./util/Validator');

var _utilValidator2 = _interopRequireDefault(_utilValidator);

var _bindingsTypesClassBinding = require('./bindings/types/ClassBinding');

var _bindingsTypesClassBinding2 = _interopRequireDefault(_bindingsTypesClassBinding);

var _bindingsTypesInstanceBinding = require('./bindings/types/InstanceBinding');

var _bindingsTypesInstanceBinding2 = _interopRequireDefault(_bindingsTypesInstanceBinding);

var _bindingsScopesSingletonScope = require('./bindings/scopes/SingletonScope');

var _bindingsScopesSingletonScope2 = _interopRequireDefault(_bindingsScopesSingletonScope);

var Injector = (function () {
    function Injector(modules) {
        _classCallCheck(this, Injector);

        this.modules = getModulesFromArguments(modules, arguments);
        this.injectorStack = [];
        this.implicitBindings = {};
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

exports['default'] = Injector;

function _get(typeOrTypeName, injector) {
    if (!(injector instanceof Injector)) throw new TypeError('Value of argument \'injector\' violates contract, expected Injector got ' + (injector === null ? 'null' : injector instanceof Object && injector.constructor ? injector.constructor.name : typeof injector));

    if (typeOrTypeName === undefined) {
        throw Error('Injector.get() requires one argument.');
    }
    if (listContainsType(injector.injectorStack, typeOrTypeName)) {
        throw Error('Circular injection.');
    }
    injector.injectorStack.push(typeOrTypeName);

    var binding = findBindingInModules(typeOrTypeName, injector);
    if (binding === undefined) {
        if (injector.implicitBindings[typeOrTypeName]) {
            binding = injector.implicitBindings[typeOrTypeName];
        } else {
            binding = createImplicitBinding(typeOrTypeName);
            injector.implicitBindings[typeOrTypeName] = binding;
        }
    }
    binding = updateBindingIfSingleton(binding, injector);
    var instance = binding.binding.get(injector);
    injector.injectorStack.pop();
    return instance;
}

function validateModules(modules) {
    if (!Array.isArray(modules)) throw new TypeError('Value of argument \'modules\' violates contract, expected array got ' + (modules === null ? 'null' : modules instanceof Object && modules.constructor ? modules.constructor.name : typeof modules));

    for (var i = 0; i < modules.length; i++) {
        if (!(modules[i] instanceof _Module2['default'])) {
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
    if (!(injector instanceof Injector)) throw new TypeError('Value of argument \'injector\' violates contract, expected Injector got ' + (injector === null ? 'null' : injector instanceof Object && injector.constructor ? injector.constructor.name : typeof injector));

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
    if (!(injector instanceof Injector)) throw new TypeError('Value of argument \'injector\' violates contract, expected Injector got ' + (injector === null ? 'null' : injector instanceof Object && injector.constructor ? injector.constructor.name : typeof injector));

    if ((binding.scope === _bindingsScopesSingletonScope2['default'] || getDecoratedBindingFromBinding(binding) === _bindingsScopesSingletonScope2['default']) && !(binding.binding instanceof _bindingsTypesInstanceBinding2['default'])) {
        binding.binding = new _bindingsTypesInstanceBinding2['default'](binding.binding.get(injector));
    }
    return binding;
}

function getDecoratedBindingFromBinding(binding) {
    if (binding.binding.TheClass && binding.binding.TheClass.__diska && binding.binding.TheClass.__diska.scope) {
        return binding.binding.TheClass.__diska.scope;
    } else {
        return undefined;
    }
}

function createImplicitBinding(type) {
    if (typeof type === 'string') {
        throw new Error('Failed when trying to inject ' + type + '. ' + 'You must either have an @Inject() decorator on the class, or use module.bind() to ' + 'bind classes with names that match the constructor arguments.');
    }
    return {
        binding: new _bindingsTypesClassBinding2['default'](type)
    };
}

function listContainsType(list, type) {
    if (!Array.isArray(list)) throw new TypeError('Value of argument \'list\' violates contract, expected array got ' + (list === null ? 'null' : list instanceof Object && list.constructor ? list.constructor.name : typeof list));

    for (var i = 0; i < list.length; i++) {
        if (list[i] === type) {
            return true;
        }
    }
    return false;
}
module.exports = exports['default'];
//# sourceMappingURL=Injector.js.map
