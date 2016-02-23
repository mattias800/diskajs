/* @flow */

import Binding from './Binding';
import Injector from "../../Injector"

export default class ClassBinding extends Binding {

    TheClass:any;

    constructor(TheClass:any) {
        super();
        this.TheClass = TheClass;
    }

    get(injector:Injector) {
        var type = this.TheClass;
        var depsTypes;
        if (typeof type.inject === 'function') {
            depsTypes = type.inject();
        } else if (type.__diska && type.__diska.inject) {
            depsTypes = type.__diska.inject;
        } else {
            throw "Unable to create instance of " + parseTypeNameFromType(this.TheClass) + ". You must add static inject() or @Inject.";
        }

        try {
            var deps = depsTypes.map((depType) => {
                return injector.get(depType);
            });
        } catch (e) {
            throw "Unable to instantiate objects required by " + parseTypeNameFromType(this.TheClass) + ": " + e;
        }
        return new this.TheClass(...deps);
    }
}

function parseTypeNameFromType(type:any):string {
    if (typeof type === 'string') {
        return type;
    } else {
        return type.toString().split(' ')[1].split('(')[0];
    }
}

function parseArgumentsFromTypeConstructor(type:any):Array<string> {
    return type.toString().split('(')[1].split(')')[0].split(',')
        .map((argument) => capitalizeFirstLetter(argument.trim()))
        .filter((argument) => argument ? true : false);
}

function capitalizeFirstLetter(s:string):string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
