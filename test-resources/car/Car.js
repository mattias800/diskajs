import Wheel from "./Wheel";
import Vehicle from "./Vehicle";

export default class Car extends Vehicle {

    static inject() {
        return [Wheel]
    }

    constructor(wheel) {
        super();
        this.wheel = wheel;
    }

    getName() {
        return "car";
    }
}