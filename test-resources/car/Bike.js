import Vehicle from "./Vehicle";
import {Inject} from '../../src/index';

@Inject()
export default class Bike extends Vehicle {

    getName() {
        return "bike";
    }
}