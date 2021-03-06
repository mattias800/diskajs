/* @flow */
import Module from './Module';
import Validator from './util/Validator';
import ClassBinding from './bindings/types/ClassBinding';
import InstanceBinding from './bindings/types/InstanceBinding';
import SingletonScope from './bindings/scopes/SingletonScope';

export default class Injector {

    modules:Array<Module>;
    injectorStack:Array<any>;
    implicitBindings:Object;

    constructor(modules) {
        this.modules = getModulesFromArguments(modules, arguments);
        this.injectorStack = [];
        this.implicitBindings = {};
        validateModules(this.modules);
    }

    get(type:any) {
        return get(type, this);
    }

    getChildInjector(childModules):Injector {
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
    if (typeOrTypeName === Injector) {
        return injector;
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

function validateModules(modules:Array<Module>) {
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
    if ((binding.scope === SingletonScope || getDecoratedBindingFromBinding(binding) === SingletonScope) && !(binding.binding instanceof InstanceBinding)) {
        binding.binding = new InstanceBinding(binding.binding.get(injector));
    }
    return binding;
}

function getDecoratedBindingFromBinding(binding) {
    if (
        binding.binding.TheClass &&
        binding.binding.TheClass.__diska &&
        binding.binding.TheClass.__diska.scope) {
        return binding.binding.TheClass.__diska.scope;
    } else {
        return undefined;
    }
}

function createImplicitBinding(type) {
    if (typeof type === 'string') {
        throw new Error('Failed when trying to inject argument ' + type + '. ' +
            'You must either have an @Inject() decorator on owner class, or use module.bind() to ' +
            'bind classes with names that match the constructor arguments.');
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

