import {BindTo} from './bindings/BindTo';
import {As} from './bindings/As';
import {InstanceBinding} from './bindings/types/InstanceBinding';
import {Singleton} from './bindings/scopes/Singleton';

export class Module {

    constructor() {
        this.bindings = {};
        this.bindingsPerTypeName = {};
    }

    bind(type) {
        if (type === undefined) {
            throw new Error('Module bind() get undefined argument. Type is required.');
        }
        return new BindTo(type, this);
    }

    addBinding(type, binding) {
        if (this.bindings[type] !== undefined) {
            throw Error('Type ' + parseTypeNameFromType(type) + ' already has a binding.');
        }
        var that = this;

        this.bindings[type] = {
            binding: binding,
            scope: undefined
        };

        this.bindingsPerTypeName[parseTypeNameFromType(type)] = {
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
        if (typeof type === 'string') {
            return this.bindingsPerTypeName[type];
        } else {
            return this.bindings[type];
        }
    }

}

function parseTypeNameFromType(type) {
    return type.toString().split(' ')[1].split('(')[0];
}
