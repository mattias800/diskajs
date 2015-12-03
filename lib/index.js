'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Singleton = exports.Inject = exports.Provider = exports.Injector = exports.Module = undefined;

var _Module = require('./di/Module');

var _Module2 = _interopRequireDefault(_Module);

var _Injector = require('./di/Injector');

var _Injector2 = _interopRequireDefault(_Injector);

var _Provider = require('./di/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _Inject = require('./di/decorators/Inject');

var _Inject2 = _interopRequireDefault(_Inject);

var _Singleton = require('./di/decorators/Singleton');

var _Singleton2 = _interopRequireDefault(_Singleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Module = _Module2.default;
exports.Injector = _Injector2.default;
exports.Provider = _Provider2.default;
exports.Inject = _Inject2.default;
exports.Singleton = _Singleton2.default;
//# sourceMappingURL=index.js.map
