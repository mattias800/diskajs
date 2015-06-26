import {Instantiator} from '../../util/Instantiator';

export class ClassBinding {

    constructor(TheClass) {
        this.TheClass = TheClass;
    }

    get(injector) {
        var type = this.TheClass;
        if (typeof type.inject !== 'function') {
            throw Error(
                'Cannot inject dependencies into object of type "' + type + '". ' +
                'Add static method inject() to "' + type + '" that returns a list of types to be injected.');
        }
        var depsTypes = type.inject();
        var deps = depsTypes.map((depType) => {
            return injector.get(depType);
        });
        return Instantiator.createInstance(this.TheClass, deps);
    }

}
