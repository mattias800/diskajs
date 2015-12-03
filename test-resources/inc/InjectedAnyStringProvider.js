import {Provider} from '../../src/index';
import AnyString from './AnyString';

export default class InjectedAnyStringProvider extends Provider {

    static inject() {
        return [AnyString];
    }

    constructor(incString) {
        super();
        this.incString = incString;
    }

    get() {
        return this.incString;
    }

}

