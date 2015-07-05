import {Wheel} from './Wheel';

export class CarWithInjectArray {

    static inject = [Wheel];

    constructor(wheel) {
        this.wheel = wheel;
    }
}
