import {Injector} from '../../src/index';
import Module from '../../src/index';

import {Grinder} from'./Grinder';
import {CoffeeMaker} from './CoffeeMaker';

export class CoffeeApp {
    constructor() {
        var module = new Module();
        module.bind(Grinder).to(Grinder);
        module.bind(CoffeeMaker).to(CoffeeMaker);

        var injector = new Injector(module);
        var coffeeMaker = injector.get(CoffeeMaker);
        coffeeMaker.brew();
    }
}
