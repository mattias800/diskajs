'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Provider = require('../../Provider');

var ProviderBinding = (function () {
    function ProviderBinding(ProviderClass) {
        _classCallCheck(this, ProviderBinding);

        this.ProviderClass = ProviderClass;
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
            if (!(provider instanceof _Provider.Provider)) {
                throw Error('toProvider() argument must extend Provider.');
            }
            return provider.get();
        }
    }]);

    return ProviderBinding;
})();

exports.ProviderBinding = ProviderBinding;
//# sourceMappingURL=ProviderBinding.js.map