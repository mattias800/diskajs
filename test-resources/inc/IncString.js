var number = 0;

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