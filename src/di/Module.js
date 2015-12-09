/* @flow */
import BindTo from './bindings/BindTo';
import As from './bindings/As';
import InstanceBinding from './bindings/types/InstanceBinding';
import SingletonScope from './bindings/scopes/SingletonScope';
import Binding from './bindings/types/Binding';

export default class Module {

    bindings:Object;
    bindingsPerTypeName:Object;
    lastSuccessFulBindingTypeName:string;

    constructor() {
        this.bindings = {};
        this.bindingsPerTypeName = {};
        this.lastSuccessFulBindingTypeName = '';
    }

    bind(type) {
        if (type === undefined) {
            if (this.lastSuccessFulBindingTypeName === '') {
                throw new Error('First module bind() get undefined argument. Type is required.');
            } else {
                throw new Error('Module bind() get undefined argument. Type is required. ' +
                    'Last successful binding was for ' + this.lastSuccessFulBindingTypeName + '.');
            }
        }
        return new BindTo(type, this);
    }

    addBinding(type, binding:Binding):As {
        var typeName = parseTypeNameFromType(type);

        if (this.bindings[type] !== undefined) {
            throw Error('Type ' + typeName + ' already has a binding.');
        }
        var that = this;

        var binding = {
            binding : binding,
            scope : undefined
        };

        this.bindings[type] = binding;
        this.bindingsPerTypeName[typeName] = binding;

        this.lastSuccessFulBindingTypeName = typeName;

        return new As({
            setScope : (scopeType) => {
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
