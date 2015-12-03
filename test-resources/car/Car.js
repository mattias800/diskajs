import Wheel from './Wheel';

export default class Car {

    static inject() {
        return [Wheel]
    }

    constructor(wheel) {
        this.wheel = wheel;
    }
}