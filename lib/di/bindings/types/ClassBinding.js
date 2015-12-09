'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilInstantiator = require('../../util/Instantiator');

var _utilInstantiator2 = _interopRequireDefault(_utilInstantiator);

var _Binding2 = require('./Binding');

var _Binding3 = _interopRequireDefault(_Binding2);

var _Injector = require("../../Injector");

var _Injector2 = _interopRequireDefault(_Injector);

var ClassBinding = (function (_Binding) {
    _inherits(ClassBinding, _Binding);

    function ClassBinding(TheClass) {
        _classCallCheck(this, ClassBinding);

        _get(Object.getPrototypeOf(ClassBinding.prototype), 'constructor', this).call(this);
        this.TheClass = TheClass;
    }

    _createClass(ClassBinding, [{
        key: 'get',
        value: function get(injector) {
            if (!(injector instanceof _Injector2['default'])) throw new TypeError('Value of argument \'injector\' violates contract, expected Injector got ' + (injector === null ? 'null' : injector instanceof Object && injector.constructor ? injector.constructor.name : typeof injector));

            var type = this.TheClass;
            var depsTypes;
            var isInjectingUsingConstructorArguments = false;
            if (typeof type.inject === 'function') {
                depsTypes = type.inject();
            } else if (type.__diska && type.__diska.inject) {
                depsTypes = type.__diska.inject;
            } else {
                isInjectingUsingConstructorArguments = true;
                depsTypes = parseArgumentsFromTypeConstructor(type);
            }

            var deps = depsTypes.map(function (depType) {
                return injector.get(depType);
            });
            return _utilInstantiator2['default'].createInstance(this.TheClass, deps);
        }
    }]);

    return ClassBinding;
})(_Binding3['default']);

exports['default'] = ClassBinding;

function parseTypeNameFromType(type) {
    if (typeof type === 'string') {
        if (typeof type !== 'string') throw new TypeError('Function \'parseTypeNameFromType\' return value violates contract, expected string got ' + (type === null ? 'null' : type instanceof Object && type.constructor ? type.constructor.name : typeof type));
        return type;
    } else {
        var _type$toString$split$1$split$0;

        _type$toString$split$1$split$0 = type.toString().split(' ')[1].split('(')[0];
        if (typeof _type$toString$split$1$split$0 !== 'string') throw new TypeError('Function \'parseTypeNameFromType\' return value violates contract, expected string got ' + (_type$toString$split$1$split$0 === null ? 'null' : _type$toString$split$1$split$0 instanceof Object && _type$toString$split$1$split$0.constructor ? _type$toString$split$1$split$0.constructor.name : typeof _type$toString$split$1$split$0));
        return _type$toString$split$1$split$0;
    }
}

function parseArgumentsFromTypeConstructor(type) {
    var _type$toString$split$1$split$0$split$map$filter;

    _type$toString$split$1$split$0$split$map$filter = type.toString().split('(')[1].split(')')[0].split(',').map(function (argument) {
        return capitalizeFirstLetter(argument.trim());
    }).filter(function (argument) {
        return argument ? true : false;
    });
    if (!Array.isArray(_type$toString$split$1$split$0$split$map$filter)) throw new TypeError('Function \'parseArgumentsFromTypeConstructor\' return value violates contract, expected array got ' + (_type$toString$split$1$split$0$split$map$filter === null ? 'null' : _type$toString$split$1$split$0$split$map$filter instanceof Object && _type$toString$split$1$split$0$split$map$filter.constructor ? _type$toString$split$1$split$0$split$map$filter.constructor.name : typeof _type$toString$split$1$split$0$split$map$filter));
    return _type$toString$split$1$split$0$split$map$filter;
}

function capitalizeFirstLetter(s) {
    var _ref;

    if (typeof s !== 'string') throw new TypeError('Value of argument \'s\' violates contract, expected string got ' + (s === null ? 'null' : s instanceof Object && s.constructor ? s.constructor.name : typeof s));
    _ref = s.charAt(0).toUpperCase() + s.slice(1);
    if (typeof _ref !== 'string') throw new TypeError('Function \'capitalizeFirstLetter\' return value violates contract, expected string got ' + (_ref === null ? 'null' : _ref instanceof Object && _ref.constructor ? _ref.constructor.name : typeof _ref));
    return _ref;
}
module.exports = exports['default'];
//# sourceMappingURL=ClassBinding.js.map
