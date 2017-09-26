"use strict";
/**
 * Created by cuppi on 2017/9/4.
 */

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var JToolUrl_1 = require("../tool/JToolUrl");

var NetworkDelegate = function NetworkDelegate() {
    (0, _classCallCheck3.default)(this, NetworkDelegate);
};

exports.default = NetworkDelegate;
exports.defaultInterceptor = {
    requestInterceptor: function requestInterceptor(config) {
        // Do something before request is sent
        console.log('POST ' + JToolUrl_1.default.urlFromPortion(config.url, '', config.params));
        return config;
    },
    requestInterceptorError: function requestInterceptorError(error) {
        // Do something with request error
        return _promise2.default.reject(error);
    },
    responseInterceptor: function responseInterceptor(response) {
        // Do something with response data
        return response;
    },
    responseInterceptorError: function responseInterceptorError(error) {
        // Do something with response error
        return _promise2.default.reject(error);
    }
};
//# sourceMappingURL=NetworkDelegate.js.map
