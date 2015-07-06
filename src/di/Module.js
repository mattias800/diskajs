import {BindTo} from './bindings/BindTo';
import {As} from './bindings/As';
import {InstanceBinding} from './bindings/types/InstanceBinding';
import {Singleton} from './bindings/scopes/Singleton';

export class Module {

    constructor() {
        this.bindings = {};
        this.bindingsPerTypeName = {};
        this.lastSuccessFulBindingTypeName = undefined;
    }

    bind(type) {
        if (type === undefined) {
            if (this.lastSuccessFulBindingTypeName === undefined) {
                throw new Error('First module bind() get undefined argument. Type is required.');
            } else {
                throw new Error('Module bind() get undefined argument. Type is required. ' +
                    'Last successful binding was for ' + this.lastSuccessFulBindingTypeName + '.');
            }
        }
        return new BindTo(type, this);
    }

    addBinding(type, binding) {
        var typeName = parseTypeNameFromType(type);

        if (this.bindings[type] !== undefined) {
            throw Error('Type ' + typeName + ' already has a binding.');
        }
        var that = this;

        this.bindings[type] = {
            binding: binding,
            scope: undefined
        };

        this.bindingsPerTypeName[typeName] = {
            binding: binding,
            scope: undefined
        };

        this.lastSuccessFulBindingTypeName = typeName;

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
