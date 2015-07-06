import {Instantiator} from '../../util/Instantiator';

export class ClassBinding {

    constructor(TheClass) {
        this.TheClass = TheClass;
    }

    get(injector) {
        var type = this.TheClass;
        var depsTypes;
        var isInjectingUsingConstructorArguments = false;
        if (typeof type.inject === 'function') {
            depsTypes = type.inject();
        } else {
            isInjectingUsingConstructorArguments = true;
            depsTypes = parseArgumentsFromTypeConstructor(type);
        }

        var deps = depsTypes.map((depType) => {
            return injector.get(depType);
        });
        return Instantiator.createInstance(this.TheClass, deps);
    }
}

function parseTypeNameFromType(type) {
    if (typeof type === 'string') {
        return type;
    } else {
        return type.toString().split(' ')[1].split('(')[0];
    }
}

function parseArgumentsFromTypeConstructor(type) {
    return type.toString().split('(')[1].split(')')[0].split(',').map(function(argument) {
        return capitalizeFirstLetter(argument.trim());
    }).filter(function(argument) {
        return argument ? true : false;
    });
}

function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
