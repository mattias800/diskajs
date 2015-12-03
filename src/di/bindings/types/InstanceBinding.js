/* @flow */

import Binding from "./Binding";
import Injector from "../../Injector";

export default class InstanceBinding extends Binding {

    instance:any;

    constructor(instance:any) {
        super();
        this.instance = instance;
    }

    get(injector:Injector):any {
        return this.instance;
    }
}
