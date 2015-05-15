import {BindTo} from './bindings/BindTo';
import {As} from './bindings/As';
import {InstanceBinding} from './bindings/types/InstanceBinding';
import {Singleton} from './bindings/scopes/Singleton';

export class Module {

    constructor() {
        this.bindings = {};
    }

    bind(type) {
        return new BindTo(type, this);
    }

    addBinding(type, binding) {
        if (this.bindings[type] !== undefined) {
            throw Error('Type "' + type + '" already has a binding.');
        }
        var that = this;

        this.bindings[type] = {
            binding: binding,
            scope: undefined
        };

        return new As({
            setScope: function(scopeType) {
                that.bindings[type].scope = scopeType;
            }
        });
    }

    getBindingForType(type) {
        return this.bindings[type];
    }

}
