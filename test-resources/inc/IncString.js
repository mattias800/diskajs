import {Inject} from '../../src/index';

var number = 0;

@Inject()
export default class IncString {

    static inject() {
        return [];
    }

    constructor() {
        this.s = (number++).toString();
    }

    getString() {
        return this.s;
    }

}