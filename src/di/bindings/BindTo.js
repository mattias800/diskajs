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
            throw Error('Missing toProvider() argument.');
        }
        return this.module.addBinding(this.type, new ProviderBinding(provider));
    }

    to(TheClass) {
        if (TheClass === undefined) {
            throw Error('Missing to() argument.');
        }
        return this.module.addBinding(this.type, new ClassBinding(TheClass));
    }

}
