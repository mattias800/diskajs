import {Provider} from '../../Provider';

export class ProviderBinding {

    constructor(ProviderClass) {
        this.ProviderClass = ProviderClass;
    }

    get(injector) {
        var provider;
        if (typeof this.ProviderClass.inject !== 'function') {
            provider = new this.ProviderClass();
        } else {
            provider = injector.get(this.ProviderClass);
        }
        if (!(provider instanceof Provider)) {
            throw Error('toProvider() argument must extend Provider.');
        }
        return provider.get();
    }
}
