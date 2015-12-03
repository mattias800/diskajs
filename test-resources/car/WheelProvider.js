import {Provider} from '../../src/index';
import Wheel from './Wheel';

export default class WheelProvider extends Provider {

    get() {
        return new Wheel({ type: 'iron' });
    }
}
