'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilInstantiator = require('../../util/Instantiator');

var ClassBinding = (function () {
    function ClassBinding(TheClass) {
        _classCallCheck(this, ClassBinding);

        this.TheClass = TheClass;
    }

    _createClass(ClassBinding, [{
        key: 'get',
        value: function get(injector) {
            var type = this.TheClass;
            var depsTypes;
            var isInjectingUsingConstructorArguments = false;
            if (typeof type.inject === 'function') {
                depsTypes = type.inject();
            } else {
                isInjectingUsingConstructorArguments = true;
                depsTypes = parseArgumentsFromTypeConstructor(type);
            }

            var deps = depsTypes.map(function (depType) {
                return injector.get(depType);
            });
            return _utilInstantiator.Instantiator.createInstance(this.TheClass, deps);
        }
    }]);

    return ClassBinding;
})();

exports.ClassBinding = ClassBinding;

function parseTypeNameFromType(type) {
    if (typeof type === 'string') {
        return type;
    } else {
        return type.toString().split(' ')[1].split('(')[0];
    }
}

function parseArgumentsFromTypeConstructor(type) {
    return type.toString().split('(')[1].split(')')[0].split(',').map(function (argument) {
        return capitalizeFirstLetter(argument.trim());
    }).filter(function (argument) {
        return argument ? true : false;
    });
}

function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=ClassBinding.js.map