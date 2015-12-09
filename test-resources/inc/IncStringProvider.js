import {Provider, Inject} from '../../src/index';
import IncString from './IncString';

@Inject()
export default class IncStringProvider extends Provider {

    get() {
        return new IncString();
    }

}