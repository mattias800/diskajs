import {Provider} from '../../src/index';
import IncString from './IncString';

export default class IncStringProvider extends Provider {

    get() {
        return new IncString();
    }

}