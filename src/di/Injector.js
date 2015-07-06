import {Module} from './Module';
import {Instantiator} from './util/Instantiator';
import {Validator} from './util/Validator';
import {ClassBinding} from './bindings/types/ClassBinding';
import {InstanceBinding} from './bindings/types/InstanceBinding';
import {Singleton} from './bindings/scopes/Singleton';

export class Injector {

    constructor(modules) {
        this.modules = getModulesFromArguments(modules, arguments);
        this.injectorStack = [];
        validateModules(this.modules);
    }

    get(type) {
        return get(type, this);
    }

    getChildInjector(childModules) {
        var modules = getModulesFromArguments(childModules, arguments);
        for (var i = 0; i < this.modules.length; i++) {
            modules.push(this.modules[i]);
        }
        return new Injector(modules);
    }
}

function get(typeOrTypeName, injector) {
    if (typeOrTypeName === undefined) {
        throw Error('Injector.get() requires one argument.');
    }
    if (listContainsType(injector.injectorStack, typeOrTypeName)) {
        throw Error('Circular injection.');
    }
    injector.injectorStack.push(typeOrTypeName);
    var binding = findBindingInModules(typeOrTypeName, injector);
    binding = createTemporaryBindingIfNotDefined(binding, typeOrTypeName, injector);
    binding = updateBindingIfSingleton(binding, injector);
    var instance = binding.binding.get(injector);
    injector.injectorStack.pop();
    return instance;
}

function validateModules(modules) {
    for (var i = 0; i < modules.length; i++) {
        if (!(modules[i] instanceof Module)) {
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
    if (binding.scope === Singleton && !(binding.binding instanceof InstanceBinding)) {
        binding.binding = new InstanceBinding(binding.binding.get(injector));
    }
    return binding;
}

function createTemporaryBindingIfNotDefined(binding, type, injector) {
    if (binding === undefined) {
        if (typeof type === 'string') {
            throw new Error('Failed when trying to inject ' + type + '. ' +
                'Implicit binding is only possible if type was added to module. Use module.bind() to bind it. ' +
                'If you are using constructor argument injection, you must bind all dependencies explicitly.');
        }
        binding = {
            binding: new ClassBinding(type)
        };
    }
    return binding;
}

function listContainsType(list, type) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === type) {
            return true;
        }
    }
    return false;
}

