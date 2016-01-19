import {Inject, Injector, Module} from '../../src/index';

import Grinder from'./../../test-resources/coffee/Grinder';
import CoffeeMaker from './../../test-resources/coffee/CoffeeMaker';

import IncString from '../../test-resources/inc/IncString';
import AnyString from '../../test-resources/inc/AnyString';
import IncStringProvider from '../../test-resources/inc/IncStringProvider';
import CircularIncStringProvider from '../../test-resources/inc/CircularIncStringProvider';
import InjectedAnyStringProvider from '../../test-resources/inc/InjectedAnyStringProvider';
import ProviderWithoutExtends from '../../test-resources/inc/ProviderWithoutExtends';
import Car from '../../test-resources/car/Car';
import CarWithStringInjection from '../../test-resources/car/CarWithStringInjection';
import Wheel from '../../test-resources/car/Wheel';
import WheelProvider from '../../test-resources/car/WheelProvider';
import Soda from '../../test-resources/Soda/Soda';
import SodaIngredient from '../../test-resources/Soda/SodaIngredient';
import Apple from '../../test-resources/Soda/Apple';
import Orange from '../../test-resources/Soda/Orange';

var assert = require('assert');

describe('Injector', () => {

    it('should work', () => {
        var module = new Module();
        module.bind(Grinder).to(Grinder);
        module.bind(CoffeeMaker).to(CoffeeMaker);
        var injector = new Injector(module);
        var coffeeMaker = injector.get(CoffeeMaker);
        assert(coffeeMaker.brew() === 'brew');
    });

    it('should work with default injection', () => {
        var injector = new Injector(new Module());
        var coffeeMaker = injector.get(CoffeeMaker);
        assert(coffeeMaker.brew() === 'brew');
    });

    it('should create new objects by default', () => {
        var injector = new Injector(new Module());
        var incString1 = injector.get(IncString);
        var incString2 = injector.get(IncString);
        assert(incString1.getString() !== incString2.getString());
    });

    it('should reuse objects if specified as singleton', () => {
        var created = 0;

        @Inject()
        class Hejsan {
            constructor() {
                created++;
            }
        }

        var module = new Module();
        module.bind(Hejsan).to(Hejsan).asSingleton();
        var injector = new Injector(module);
        injector.get(Hejsan);
        injector.get(Hejsan);
        assert.equal(created, 1);
    });

    it('should reuse objects if specified as singleton when using string injection', () => {
        var created = 0;

        @Inject()
        class Hejsan {
            constructor() {
                created++;
            }
        }

        var module = new Module();
        module.bind(Hejsan).to(Hejsan).asSingleton();
        var injector = new Injector(module);
        injector.get('Hejsan');
        injector.get('Hejsan');
        assert.equal(created, 1);
    });

    it('should reuse objects if specified as singleton that is not injected', () => {
        var module = new Module();
        module.bind(IncString).toProvider(IncStringProvider).asSingleton();
        var injector = new Injector(module);
        var incString1 = injector.get(IncString);
        var incString2 = injector.get(IncString);
        assert(incString1.getString() === incString2.getString());
    });

    it('should reuse objects if specified as singleton that is injected', () => {
        var module = new Module();
        module.bind(IncString).toProvider(InjectedAnyStringProvider).asSingleton();
        var injector = new Injector(module);
        var incString1 = injector.get(IncString);
        var incString2 = injector.get(IncString);
        assert(incString1.getString() === incString2.getString());
    });

    it('circular binding should throw exception', () => {
        var module = new Module();
        module.bind(IncString).toProvider(CircularIncStringProvider).asSingleton();
        var injector = new Injector(module);
        assert.throws(() => {
            var incString1 = injector.get(IncString);
        });
    });

    it('should throw when toProvider() is supplied with anything but providers', () => {
        var module = new Module();
        module.bind(AnyString).toProvider(ProviderWithoutExtends);
        var injector = new Injector(module);
        assert.throws(() => {
            var obj = injector.get(AnyString);
        });
    });

    it('should be able to use multiple modules', () => {
        var carModule = new Module();
        var wheelModule = new Module();
        wheelModule.bind(Wheel).toProvider(WheelProvider);
        var injector = new Injector(carModule, wheelModule);
        var car = injector.get(Car);
    });

    it('should handle one module as argument', () => {
        var module = new Module();
        var injector = new Injector(module);
        assert(injector.modules.length === 1);
        assert(injector.modules[0] === module);
    });

    it('should handle module list as argument', () => {
        var module1 = new Module();
        var module2 = new Module();
        var injector = new Injector([module1, module2]);
        assert.equal(injector.modules.length, 2);
        assert(injector.modules[0] === module1);
        assert(injector.modules[1] === module2);
    });

    it('should handle modules as multiple arguments', () => {
        var module1 = new Module();
        var module2 = new Module();
        var injector = new Injector(module1, module2);
        assert.equal(injector.modules.length, 2);
        assert(injector.modules[0] === module1);
        assert(injector.modules[1] === module2);
    });

    it('should throw exception when passing anything but modules as arguments', () => {
        var wheel = new Wheel();
        assert.throws(() => {
            var injector = new Injector(wheel);
        });
    });

    it('should be able to bind classes without inject to providers', () => {
        var module = new Module();
        module.bind(Wheel).toProvider(WheelProvider);
        var injector = new Injector(module);
        assert(injector.get(Wheel));
    });

});

describe('string injection', () => {
    it('should inject based on strings', () => {
        var module = new Module();
        module.bind(Wheel).toProvider(WheelProvider);
        var injector = new Injector(module);
        assert(injector.get(CarWithStringInjection));
    });
});


describe('get() with type as string', () => {
    it('should get object of type where type is a string', () => {
        var module = new Module();
        module.bind(Wheel).toProvider(WheelProvider);
        var injector = new Injector(module);
        assert(injector.get('Wheel'));
    });
});

describe('Child injectors', () => {

    it('should be a function', () => {
        var module = new Module();
        var injector = new Injector(module);
        assert(typeof injector.getChildInjector === 'function');
    });

    it('should return a new injector', () => {
        var module = new Module();
        var childModule = new Module();
        var injector = new Injector(module);
        var childInjector = injector.getChildInjector(childModule);
        assert(childInjector);
    });

    it('should create object only from child injector, not from parent injector', () => {
        var injector = new Injector(new Module());
        var childModule = new Module();
        childModule.bind(Wheel).toProvider(WheelProvider);
        var childInjector = injector.getChildInjector(childModule);
        var wheel = childInjector.get(Wheel);
        assert(wheel);
        assert.throws(() => {
            injector.get(Wheel);
        });
    });
});

describe("Injecting the injector", () => {
    it("should inject the current injector if specified", () => {
        @Inject()
        class ChildClass {
            getName() {
                return "it works";
            }
        }

        @Inject(Injector)
        class TestClass {
            constructor(injector:Injector) {
                this.name = injector.get(ChildClass).getName();
            }

        }

        var injector = new Injector(new Module());
        var test = injector.get(TestClass);
        assert.equal(test.name, "it works");
    });
});


