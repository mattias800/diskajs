'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Provider = require('../../Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _Binding2 = require('./Binding');

var _Binding3 = _interopRequireDefault(_Binding2);

var _Injector = require('../../Injector');

var _Injector2 = _interopRequireDefault(_Injector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProviderBinding = (function (_Binding) {
    _inherits(ProviderBinding, _Binding);

    function ProviderBinding(ProviderClass) {
        _classCallCheck(this, ProviderBinding);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProviderBinding).call(this));

        _this.ProviderClass = ProviderClass;
        return _this;
    }

    _createClass(ProviderBinding, [{
        key: 'get',
        value: function get(injector) {
            var provider;
            if (typeof this.ProviderClass.inject !== 'function') {
                provider = new this.ProviderClass();
            } else {
                provider = injector.get(this.ProviderClass);
            }
            if (!(provider instanceof _Provider2.default)) {
                throw Error('toProvider() argument must extend Provider.');
            }
            return provider.get();
        }
    }]);

    return ProviderBinding;
})(_Binding3.default);

exports.default = ProviderBinding;
//# sourceMappingURL=ProviderBinding.js.map
