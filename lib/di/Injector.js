'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

var _Instantiator = require('./util/Instantiator');

var _Instantiator2 = _interopRequireDefault(_Instantiator);

var _Validator = require('./util/Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _ClassBinding = require('./bindings/types/ClassBinding');

var _ClassBinding2 = _interopRequireDefault(_ClassBinding);

var _InstanceBinding = require('./bindings/types/InstanceBinding');

var _InstanceBinding2 = _interopRequireDefault(_InstanceBinding);

var _SingletonScope = require('./bindings/scopes/SingletonScope');

var _SingletonScope2 = _interopRequireDefault(_SingletonScope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

exports.default = Injector;

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
    for (var i = 0; i < modules.length; i++) {
        if (!(modules[i] instanceof _Module2.default)) {
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
    if ((binding.scope === _SingletonScope2.default || getDecoratedBindingFromBinding(binding) === _SingletonScope2.default) && !(binding.binding instanceof _InstanceBinding2.default)) {
        binding.binding = new _InstanceBinding2.default(binding.binding.get(injector));
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
        throw new Error('Failed when trying to inject ' + type + '. ' + 'Implicit binding is only possible if type was added to module. Use module.bind() to bind it. ' + 'If you are using constructor argument injection, you must bind all dependencies explicitly.');
    }
    return {
        binding: new _ClassBinding2.default(type)
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
