/* @flow */
import Module from './Module';
import Instantiator from './util/Instantiator';
import Validator from './util/Validator';
import ClassBinding from './bindings/types/ClassBinding';
import InstanceBinding from './bindings/types/InstanceBinding';
import Singleton from './bindings/scopes/Singleton';

export default class Injector {

    modules:Array<Module>;
    injectorStack:Array<any>;

    constructor(modules:Array<Module>) {
        this.modules = getModulesFromArguments(modules, arguments);
        this.injectorStack = [];
        validateModules(this.modules);
    }

    get(type:any) {
        return get(type, this);
    }

    getChildInjector(childModules:Array<Module>):Injector {
        var modules = getModulesFromArguments(childModules, arguments);
        for (var i = 0; i < this.modules.length; i++) {
            modules.push(this.modules[i]);
        }
        return new Injector(modules);
    }
}

function get(typeOrTypeName:any, injector:Injector) {
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

function validateModules(modules:Array<Module>) {
    for (var i = 0; i < modules.length; i++) {
        if (!(modules[i] instanceof Module)) {
            throw Error('Injector() can only take modules as arguments.');
        }
    }
}
function getModulesFromArguments(modules:Array<Module>, args) {
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

function findBindingInModules(type, injector:Injector) {
    for (var i = 0; i < injector.modules.length; i++) {
        var module = injector.modules[i];
        var binding = module.getBindingForType(type);
        if (binding) {
            return binding;
        }
    }
    return undefined;
}

function updateBindingIfSingleton(binding, injector:Injector) {
    if (binding.scope === Singleton && !(binding.binding instanceof InstanceBinding)) {
        binding.binding = new InstanceBinding(binding.binding.get(injector));
    }
    return binding;
}

function createImplicitBinding(type:Object) {
    if (typeof type === 'string') {
        throw new Error('Failed when trying to inject ' + type + '. ' +
            'Implicit binding is only possible if type was added to module. Use module.bind() to bind it. ' +
            'If you are using constructor argument injection, you must bind all dependencies explicitly.');
    }
    return {
        binding : new ClassBinding(type)
    };
}

function listContainsType(list:Array<any>, type:any):boolean {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === type) {
            return true;
        }
    }
    return false;
}

