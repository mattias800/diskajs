/* @flow */

import Provider from '../../Provider';
import Binding from './Binding';
import Injector from "../../Injector"

export default class ProviderBinding extends Binding {

    ProviderClass:any;

    constructor(ProviderClass:any) {
        super();
        this.ProviderClass = ProviderClass;
    }

    get(injector:Injector):any {
        var provider;
        provider = injector.get(this.ProviderClass);
        if (!(provider instanceof Provider)) {
            throw Error('toProvider() argument must extend Provider.');
        }
        return provider.get();
    }
}
