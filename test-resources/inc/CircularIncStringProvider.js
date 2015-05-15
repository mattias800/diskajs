import {Provider} from '../../src/index';
import {IncString} from './IncString';

export class CircularIncStringProvider extends Provider {

    static inject() {
        return [IncString];
    }

    constructor(incString) {
        super();
        this.incString = incString;
    }

    get() {
        return this.incString;
    }

}

