import Bike from "../../../test-resources/car/Bike";
import Vehicle from "../../../test-resources/car/Vehicle";
import {
    Inject,
    Injector,
    Singleton,
    Module
} from "../../../src/index";

var assert = require('assert');

describe.only("Singleton decorator", () => {
    it("should inject same object every time", () => {

        @Singleton()
        @Inject()
        class NiceSingleton {

            counter:number;

            constructor() {
                this.counter = 0;
            }

            inc() {
                this.counter++;
            }
        }

        var module = new Module();
        var injector = new Injector(module);
        var s1 = injector.get(NiceSingleton);
        var s2 = injector.get(NiceSingleton);
        s1.inc();
        assert.equal(s1, s2);
        assert.equal(s1.counter, s2.counter);
    });

    it("should inject same object every time when bind target has @Singleton", () => {

        @Singleton()
        @Inject()
        class NiceSingleton {

            counter:number;

            constructor() {
                this.counter = 0;
            }

            inc() {
                this.counter++;
            }
        }

        @Inject()
        class NiceSingletonWithName extends NiceSingleton {

            name:string;

            constructor() {
                super();
                this.name = '';
            }

            setName(name) {
                this.name = name;
            }
        }

        var module = new Module();
        module.bind(NiceSingleton).to(NiceSingletonWithName);
        var injector = new Injector(module);
        var s1 = injector.get(NiceSingleton);
        var s2 = injector.get(NiceSingleton);
        s1.inc();
        assert.equal(s1, s2);
        assert.equal(s1.counter, s2.counter);
    });

    it("should inject same object every time when bind source has @Singleton", () => {

        @Inject()
        class NiceSingleton {

            counter:number;

            constructor() {
                this.counter = 0;
            }

            inc() {
                this.counter++;
            }
        }

        @Singleton()
        @Inject()
        class NiceSingletonWithName extends NiceSingleton {

            name:string;

            constructor() {
                super();
                this.name = '';
            }

            setName(name) {
                this.name = name;
            }
        }

        var module = new Module();
        module.bind(NiceSingleton).to(NiceSingletonWithName);
        var injector = new Injector(module);
        var s1 = injector.get(NiceSingleton);
        var s2 = injector.get(NiceSingleton);
        s1.inc();
        assert.equal(s1, s2);
        assert.equal(s1.counter, s2.counter);
    });
});
