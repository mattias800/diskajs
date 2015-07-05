export class CarWithStringInjection {

    static inject() {
        return ['Wheel']
    }

    constructor(wheel) {
        this.wheel = wheel;
    }
}
