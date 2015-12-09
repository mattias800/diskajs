'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Provider = require('../../Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _Binding2 = require('./Binding');

var _Binding3 = _interopRequireDefault(_Binding2);

var _Injector = require("../../Injector");

var _Injector2 = _interopRequireDefault(_Injector);

var ProviderBinding = (function (_Binding) {
    _inherits(ProviderBinding, _Binding);

    function ProviderBinding(ProviderClass) {
        _classCallCheck(this, ProviderBinding);

        _get(Object.getPrototypeOf(ProviderBinding.prototype), 'constructor', this).call(this);
        this.ProviderClass = ProviderClass;
    }

    _createClass(ProviderBinding, [{
        key: 'get',
        value: function get(injector) {
            if (!(injector instanceof _Injector2['default'])) throw new TypeError('Value of argument \'injector\' violates contract, expected Injector got ' + (injector === null ? 'null' : injector instanceof Object && injector.constructor ? injector.constructor.name : typeof injector));

            var provider;
            provider = injector.get(this.ProviderClass);
            if (!(provider instanceof _Provider2['default'])) {
                throw Error('toProvider() argument must extend Provider.');
            }
            return provider.get();
        }
    }]);

    return ProviderBinding;
})(_Binding3['default']);

exports['default'] = ProviderBinding;
module.exports = exports['default'];
//# sourceMappingURL=ProviderBinding.js.map
