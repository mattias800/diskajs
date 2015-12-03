'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Instantiator = require('../../util/Instantiator');

var _Instantiator2 = _interopRequireDefault(_Instantiator);

var _Binding2 = require('./Binding');

var _Binding3 = _interopRequireDefault(_Binding2);

var _Injector = require('../../Injector');

var _Injector2 = _interopRequireDefault(_Injector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassBinding = (function (_Binding) {
    _inherits(ClassBinding, _Binding);

    function ClassBinding(TheClass) {
        _classCallCheck(this, ClassBinding);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClassBinding).call(this));

        _this.TheClass = TheClass;
        return _this;
    }

    _createClass(ClassBinding, [{
        key: 'get',
        value: function get(injector) {
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
            return _Instantiator2.default.createInstance(this.TheClass, deps);
        }
    }]);

    return ClassBinding;
})(_Binding3.default);

exports.default = ClassBinding;

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
