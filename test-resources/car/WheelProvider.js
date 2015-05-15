import {Provider} from '../../src/index';
import {Wheel} from './Wheel';

export class WheelProvider extends Provider {

    get() {
        return new Wheel({ type: 'iron' });
    }
}
