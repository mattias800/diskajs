'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _diModule = require('./di/Module');

var _diModule2 = _interopRequireDefault(_diModule);

var _diInjector = require('./di/Injector');

var _diInjector2 = _interopRequireDefault(_diInjector);

var _diProvider = require('./di/Provider');

var _diProvider2 = _interopRequireDefault(_diProvider);

var _diDecoratorsInject = require("./di/decorators/Inject");

var _diDecoratorsInject2 = _interopRequireDefault(_diDecoratorsInject);

var _diDecoratorsSingleton = require("./di/decorators/Singleton");

var _diDecoratorsSingleton2 = _interopRequireDefault(_diDecoratorsSingleton);

var defaultInjector = new _diInjector2['default'](new _diModule2['default']());

exports.Module = _diModule2['default'];
exports.Injector = _diInjector2['default'];
exports.Provider = _diProvider2['default'];
exports.Inject = _diDecoratorsInject2['default'];
exports.Singleton = _diDecoratorsSingleton2['default'];
exports.defaultInjector = defaultInjector;
//# sourceMappingURL=index.js.map
