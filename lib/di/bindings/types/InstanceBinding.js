"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Binding2 = require("./Binding");

var _Binding3 = _interopRequireDefault(_Binding2);

var _Injector = require("../../Injector");

var _Injector2 = _interopRequireDefault(_Injector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstanceBinding = (function (_Binding) {
    _inherits(InstanceBinding, _Binding);

    function InstanceBinding(instance) {
        _classCallCheck(this, InstanceBinding);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InstanceBinding).call(this));

        _this.instance = instance;
        return _this;
    }

    _createClass(InstanceBinding, [{
        key: "get",
        value: function get(injector) {
            return this.instance;
        }
    }]);

    return InstanceBinding;
})(_Binding3.default);

exports.default = InstanceBinding;
//# sourceMappingURL=InstanceBinding.js.map
