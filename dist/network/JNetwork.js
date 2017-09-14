/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty = require("babel-runtime/core-js/reflect/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var JPromise_1 = require("../structure/JPromise");
/** @module network*/
/**
 * 网络请求类
 * @hideconstructor
 */

var JNetwork = function () {
    function JNetwork() {
        (0, _classCallCheck3.default)(this, JNetwork);
    }

    (0, _createClass3.default)(JNetwork, null, [{
        key: "locationParas",

        /**
         * 需要定位的请求的公共参数
         * @private
         * @returns {*}
         */
        value: function locationParas() {
            if (this.delegate) {
                var cityParas = this.delegate.cityParas();
                var coordinateParas = this.delegate.coordinateParas();
                return {
                    cityId: cityParas.id,
                    longitude: coordinateParas.longitude,
                    latitude: coordinateParas.latitude
                };
            }
            return null;
        }
        /**
         * 需要登录的请求的公共参数
         * @private
         * @returns {*}
         */

    }, {
        key: "loginParas",
        value: function loginParas() {
            if (this.delegate && this.delegate.loginParas) {
                return this.delegate.loginParas();
            }
            return {};
        }
        /**
         * 验证失败
         * @private
         * @returns {Promise}
         */

    }, {
        key: "failedAuthorizationNetwork",
        value: function failedAuthorizationNetwork() {
            return new _promise2.default(function (resolve, reject) {
                reject(new Error('authorization error'));
            });
        }
        /**
         * 不存在的方法
         * @private
         * @returns {Promise}
         */

    }, {
        key: "unrealizedMethod",
        value: function unrealizedMethod() {
            return new _promise2.default(function (resolve, reject) {
                reject(new Error('unrealized method'));
            });
        }
        /**
         * 没有登录
         * @param code
         * @returns {any}
         */

    }, {
        key: "notLoginError",
        value: function notLoginError(code) {
            var error = new Error('NotLogin');
            (0, _defineProperty2.default)(error, 'errorCode', { value: code });
            return error;
        }
        /**
         * 错误类型
         * @private
         * @returns {Promise}
         */

    }, {
        key: "wrongInType",
        value: function wrongInType() {
            return new _promise2.default(function (resolve, reject) {
                reject(new Error('the inType is not exist, please check your inType property in JBZConfig'));
            });
        }
        /**
         * 包裹可取消的请求 （使用fetch请求时使用，目前通过axios请求，无需使用）
         * @private
         * @param promise 异步请求块
         * @returns {Promise} 被包裹后的异步请求块
         */

    }, {
        key: "wrapCancelablePromise",
        value: function wrapCancelablePromise(promise) {
            return JPromise_1.default.create(promise);
        }
        /***
         * 检查是否配置SDK
         * @private
         */

    }, {
        key: "checkConfigBaseUrl",
        value: function checkConfigBaseUrl() {
            if (!this.baseUrl || this.baseUrl === '') {
                console.log('please check if you have config baseUrl for SDK');
                throw Error('Not Config');
            }
        }
    }, {
        key: "fetchRequest",
        value: function fetchRequest(method, baseUrl, url, parameters, headers, otherObject) {
            var _this = this;

            this.checkConfigBaseUrl();
            var isOk = void 0;
            var jpromise = this.wrapCancelablePromise(new _promise2.default(function (resolve, reject) {
                var iHeaders = (0, _assign2.default)({
                    'Accept': 'application/json',
                    // TODO: 搞明白
                    'Content-Type': 'application/x-www-form-urlencoded'
                    // 'Content-Type': 'application/json'
                }, headers);
                var jaxios = axios_1.default.create({
                    method: method,
                    timeout: otherObject.timeout,
                    params: parameters,
                    baseURL: baseUrl,
                    headers: iHeaders
                });
                jaxios.interceptors.request.use(function (config) {
                    var otherParas = {};
                    jpromise.otherParas.forEach(function (key) {
                        if ((typeof key === "undefined" ? "undefined" : (0, _typeof3.default)(key)) == "object") {
                            otherParas = (0, _assign2.default)({}, otherParas, key);
                            return;
                        }
                        var globalParaFunc = _this.delegate.globalParas()[key];
                        if (globalParaFunc) {
                            var globalPara = globalParaFunc();
                            if ((typeof globalPara === "undefined" ? "undefined" : (0, _typeof3.default)(globalPara)) == "object") {
                                otherParas = (0, _assign2.default)({}, otherParas, globalPara);
                            } else if (typeof globalPara == "string" || typeof globalPara == "number") {
                                otherParas[key] = globalPara;
                            } else {
                                console.log('全局变量类型不正确:' + key);
                            }
                        } else {
                            console.log('不存在的全局变量:' + key);
                        }
                    });
                    var otherHeaders = {};
                    jpromise.otherHeaders.forEach(function (key) {
                        if ((typeof key === "undefined" ? "undefined" : (0, _typeof3.default)(key)) == "object") {
                            otherHeaders = (0, _assign2.default)({}, otherHeaders, key);
                            return;
                        }
                        var globalHeaderFunc = _this.delegate.globalHeaders()[key];
                        if (globalHeaderFunc) {
                            var globalHeader = globalHeaderFunc();
                            if ((typeof globalHeader === "undefined" ? "undefined" : (0, _typeof3.default)(globalHeader)) == "object") {
                                otherHeaders = (0, _assign2.default)({}, otherHeaders, globalHeader);
                            } else if (typeof globalHeader == "string" || typeof globalHeader == "number") {
                                otherHeaders[key] = globalHeader;
                            } else {
                                console.log('全局变量类型不正确:' + key);
                            }
                        } else {
                            console.log('不存在的全局变量:' + key);
                        }
                    });
                    config.params = (0, _assign2.default)({}, config.params, otherParas);
                    config.headers = (0, _assign2.default)({}, config.headers, otherHeaders);
                    return _this.delegate.requestInterceptor(config);
                }, function (error) {
                    return _this.delegate.requestInterceptorError(error);
                });
                jaxios.interceptors.response.use(function (response) {
                    return _this.delegate.responseInterceptor(response);
                }, function (error) {
                    return _this.delegate.responseInterceptorError(error);
                });
                jaxios.post(url).then(function (response) {
                    isOk = response.status === 200;
                    return response.data;
                }).then(function (responseJson) {
                    if (isOk) {
                        if (!responseJson.errorCode) {
                            resolve(responseJson.data);
                        } else {
                            var errorCode = responseJson.errorCode;
                            if (responseJson.errorCode == 10022) {
                                reject(JNetwork.notLoginError(100022));
                            } else {
                                reject(new Error(responseJson.message));
                            }
                        }
                    } else {
                        reject(responseJson);
                    }
                }).catch(function (error) {
                    // 请求超时
                    if (error.message.indexOf('timeout') != -1) {
                        reject(new Error('请求超时, 请稍后重试'));
                    } else {
                        reject(error);
                    }
                });
            }));
            return jpromise;
        }
        /**
         * 高自由度POST方法
         * @param {string} baseUrl 基地址
         * @param {string} url 相对地址
         * @param {object} parameters 地址参数
         * @param {object} headers 头参数
         * @param {object} otherObject 其他可用配置
         * @returns {Promise} 异步请求块
         */

    }, {
        key: "freedomPOST",
        value: function freedomPOST(baseUrl, url, parameters, headers, otherObject) {
            return this.fetchRequest('post', baseUrl, url, parameters, headers, otherObject);
        }
        /**
         * 高自由度GET方法
         * @param {string} baseUrl
         * @param {string} url
         * @param {object} parameters
         * @param {object} headers
         * @param {object} otherObject
         * @returns {Promise} 异步请求块
         */

    }, {
        key: "freedomGET",
        value: function freedomGET(baseUrl, url, parameters, headers, otherObject) {
            return this.fetchRequest('get', baseUrl, url, parameters, headers, otherObject);
        }
        /**
         * post请求
         * @param {string} url 相对地址
         * @param {object} parameters 地址参数
         * @param {object} headers 头参数
         * @param {object} otherObject 其他参数
         * @returns {Promise} 异步请求块
         */

    }, {
        key: "POST",
        value: function POST(url, parameters, headers, otherObject) {
            return this.freedomPOST(this.baseUrl, url, (0, _assign2.default)({}, parameters, { inType: this.inType }), headers, (0, _assign2.default)({ timeout: this.timeout }, otherObject));
        }
        /**
         * get请求
         * @param {string} url 相对地址
         * @param {object} parameters 地址参数
         * @param {object} headers 头参数
         * @param {object} otherObject 其他参数
         * @returns {Promise} 异步请求块
         */

    }, {
        key: "GET",
        value: function GET(url, parameters, headers, otherObject) {
            return this.freedomGET(this.baseUrl, url, (0, _assign2.default)({}, parameters, { inType: this.inType }), headers, (0, _assign2.default)({ timeout: this.timeout }, otherObject));
        }
    }]);
    return JNetwork;
}();

JNetwork.baseUrl = '';
JNetwork.timeout = 10 * 1000;
JNetwork.delegate = null;
JNetwork.inType = '';
exports.default = JNetwork;
//# sourceMappingURL=JNetwork.js.map
