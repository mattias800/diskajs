import Bike from "../../../test-resources/car/Bike";
import Vehicle from "../../../test-resources/car/Vehicle";
import IncStringProvider from "../../../test-resources/inc/IncStringProvider";
import {
    Inject,
    Injector,
    Singleton,
    Provider,
    Module
} from "../../../src/index";

var assert = require('assert');

describe("Inject decorator", () => {
    it("should inject types specified by @Inject decorator", () => {

        @Inject(Vehicle)
        class VehicleContainer {

            vehicle:Vehicle;

            constructor(aVehicle:Vehicle) {
                this.vehicle = aVehicle;
            }

        }

        var module = new Module();
        var injector = new Injector(module);
        var vehicleContainer = injector.get(VehicleContainer);
        assert.equal(vehicleContainer.vehicle.getName(), "vehicle");

    });

    it("should work with Providers", () => {
        @Inject()
        class VehicleFactory {
            createVehicle():Vehicle {
                return new Vehicle();
            }
        }

        @Inject(VehicleFactory)
        class VehicleProvider extends Provider {

            vehicleFactory:VehicleFactory;

            constructor(vehicleFactory:VehicleFactory) {
                super();
                this.vehicleFactory = vehicleFactory;
            }

            get():Vehicle {
                return this.vehicleFactory.createVehicle();
            }

        }

        var module = new Module();
        module.bind(Vehicle).toProvider(VehicleProvider);
        var injector = new Injector(module);
        var vehicle = injector.get(Vehicle);
        assert.equal(vehicle.getName(), "vehicle");

    });

    it("should inject types specified by Inject decorator even when constructor argument name and type is another type",
        () => {
            @Inject(Bike)
            class VehicleContainer {

                vehicle:Vehicle;

                constructor(vehicle:Vehicle) {
                    this.vehicle = vehicle;
                }

            }

            var module = new Module();
            var injector = new Injector(module);
            var vehicleContainer = injector.get(VehicleContainer);
            assert.equal(vehicleContainer.vehicle.getName(), "bike");

        });

    it("should be able to inject a constructor with arguments, even though @Inject() contains no arguments", function() {

        @Inject()
        class UserAuthenticator {

            mode;

            constructor(mode) {
                this.mode = mode;
            }

            authenticate() {
                return true;
            }

        }

        var module = new Module();
        var injector = new Injector(module);
        var userAuthenticator = injector.get(UserAuthenticator);
        assert.equal(userAuthenticator.authenticate(), true);

    });

    it("should be possible to instantiate class with @Inject manually", () => {
        var incStringProvider = new IncStringProvider();
    });
});
