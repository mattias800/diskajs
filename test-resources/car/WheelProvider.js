import {Provider, Inject} from '../../src/index';
import Wheel from './Wheel';

@Inject()
export default class WheelProvider extends Provider {

    get() {
        return new Wheel({ type: 'iron' });
    }
}
