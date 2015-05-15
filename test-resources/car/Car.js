import {Wheel} from './Wheel';

export class Car {

    static inject() {
        return [Wheel]
    }

    constructor(wheel) {
        this.wheel = wheel;
    }
}