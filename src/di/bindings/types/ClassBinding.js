import {Instantiator} from '../../util/Instantiator';

export class ClassBinding {

    constructor(TheClass) {
        this.TheClass = TheClass;
    }

    get(injector) {
        var type = this.TheClass;
        if (typeof type.inject !== 'function') {
            throw Error(
                'Cannot inject dependencies into object of type ' + parseTypeNameFromType(type) + '. ' +
                'Add static method inject() to ' + parseTypeNameFromType(type) + ' that returns a list of types to be injected.');
        }
        var depsTypes = type.inject();
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
