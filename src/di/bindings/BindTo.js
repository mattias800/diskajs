import {ClassBinding} from './types/ClassBinding';
import {InstanceBinding} from './types/InstanceBinding';
import {ProviderBinding} from './types/ProviderBinding';
import {Provider} from './../Provider';

export class BindTo {

    constructor(type, module) {
        this.type = type;
        this.module = module;
    }

    toProvider(provider) {
        if (provider === undefined) {
            throw Error('toProvider() got undefined argument when trying to bind ' +
                parseTypeNameFromType(this.type) + '.');
        }
        return this.module.addBinding(this.type, new ProviderBinding(provider));
    }

    to(TheClass) {
        if (TheClass === undefined) {
            throw Error('to() got undefined argument when trying to bind ' + parseTypeNameFromType(this.type) + '.');
        }
        return this.module.addBinding(this.type, new ClassBinding(TheClass));
    }

}

function parseTypeNameFromType(type) {
    return type.toString().split(' ')[1].split('(')[0];
}
