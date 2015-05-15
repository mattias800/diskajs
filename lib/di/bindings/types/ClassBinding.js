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
            if (typeof type.inject !== 'function') {
                throw Error('Cannot inject dependencies into object of type "' + type + '". Add static method inject() to "' + type + '" that returns a list of types to be injected.');
            }
            var depsTypes = type.inject();
            var deps = depsTypes.map(function (depType) {
                return injector.get(depType);
            });
            return _utilInstantiator.Instantiator.createInstance(this.TheClass, deps);
        }
    }]);

    return ClassBinding;
})();

exports.ClassBinding = ClassBinding;
//# sourceMappingURL=ClassBinding.js.map