import Grinder from './Grinder';

export default class CoffeeMaker {

    static inject() {
        return [Grinder];
    }

    constructor(grinder) {
        this.grinder = grinder;
    }

    brew() {
        this.grinder.grind();
        return 'brew';
    }
}

