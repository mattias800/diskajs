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
            try {
                return injector.get(depType);
            } catch (e) {
                if (isInjectingUsingConstructorArguments) {
                    var typeName = parseTypeNameFromType(type);
                    var depTypeName = parseTypeNameFromType(depType);

                    throw new Error('Trying to inject ' + depTypeName + ' into ' + typeName +
                        ' using constructor argument, but could not find binding. ' +
                        'Implicit binding is not possible when injecting using constructor arguments, ' +
                        'please att module.bind(T).to(T) for all dependencies needed by ' + typeName + '.');
                } else {
                    throw e;
                }
            }
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
