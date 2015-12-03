import Bike from "../../../test-resources/car/Bike";
import Vehicle from "../../../test-resources/car/Vehicle";
import {
    Inject,
    Injector,
    Singleton,
    Module
} from "../../../src/index";

var assert = require('assert');

describe.only("Inject", () => {
    it("should inject types specified by Inject decorator", () => {
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
});

describe.only("Inject", () => {
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
});
