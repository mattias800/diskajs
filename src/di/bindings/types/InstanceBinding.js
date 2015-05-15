export class InstanceBinding {

    constructor(instance) {
        this.instance = instance;
    }

    get(injector) {
        return this.instance;
    }
}
