import {Provider} from '../../src/index';
import {IncString} from './IncString';

export class IncStringProvider extends Provider {

    get() {
        return new IncString();
    }

}