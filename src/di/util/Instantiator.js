export class Instantiator {

    static createInstance(Type, args) {
        var Temp = function() {
            }, // temporary constructor
            inst, ret; // other vars

        // Give the Temp constructor the Constructor's prototype
        Temp.prototype = Type.prototype;

        // Create a new instance
        inst = new Temp();

        // Call the original Constructor with the temp
        // instance as its context (i.e. its 'this' value)
        ret = Type.apply(inst, args);

        // If an object has been returned then return it otherwise
        // return the original instance.
        // (consistent with behaviour of the new operator)
        return Object(ret) === ret ? ret : inst;
    }

}