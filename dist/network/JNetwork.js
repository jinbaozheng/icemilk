/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';

var _defineProperty = require("babel-runtime/core-js/reflect/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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

        this.otherParas = [];
        this.otherHeaders = [];
    }

    (0, _createClass3.default)(JNetwork, [{
        key: "useParas",
        value: function useParas() {
            for (var _len = arguments.length, paras = Array(_len), _key = 0; _key < _len; _key++) {
                paras[_key] = arguments[_key];
            }

            this.otherParas = paras;
            return this;
        }
    }, {
        key: "useHeaders",
        value: function useHeaders() {
            for (var _len2 = arguments.length, headers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                headers[_key2] = arguments[_key2];
            }

            this.otherHeaders = headers;
            return this;
        }
    }, {
        key: "checkConfigBaseUrl",

        /***
         * 检查是否配置SDK
         * @private
         */
        value: function checkConfigBaseUrl() {
            if (!JNetwork.baseUrl || JNetwork.baseUrl === '') {
                console.log('please check if you have config baseUrl for SDK');
                // throw Error('Not Config');
            }
        }
        /**
         * 发送请求
         * @param method 方法类型
         * @param baseUrl 基地址
         * @param url 相对地址
         * @param parameters 参数
         * @param headers 头参数
         * @param otherObject 其他相关设置
         * @returns {JPromise<any>}
         */

    }, {
        key: "fetchRequest",
        value: function fetchRequest(method, baseUrl, url, parameters, headers, otherObject) {
            var _this = this;

            this.checkConfigBaseUrl();
            var isOk = void 0;
            var jpromise = JNetwork.wrapCancelablePromise(new _promise2.default(function (resolve, reject) {
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
                    _this.otherParas.forEach(function (key) {
                        if ((typeof key === "undefined" ? "undefined" : (0, _typeof3.default)(key)) == "object") {
                            otherParas = (0, _assign2.default)({}, otherParas, key);
                            return;
                        }
                        var globalParas = JNetwork.delegate.globalParas;
                        if (!globalParas) {
                            console.error('未找到全局参数，请确认是否设置globalParas');
                            return;
                        }
                        var globalParaFunc = null;
                        if (typeof globalParas == "function") {
                            globalParaFunc = globalParas()[key];
                        } else if ((typeof globalParas === "undefined" ? "undefined" : (0, _typeof3.default)(globalParas)) == "object") {
                            globalParaFunc = globalParas[key];
                        }
                        if (globalParaFunc) {
                            var globalPara = null;
                            if (typeof globalParaFunc == "function") {
                                globalPara = globalParaFunc();
                            } else {
                                globalPara = globalParaFunc;
                            }
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
                    _this.otherHeaders.forEach(function (key) {
                        if ((typeof key === "undefined" ? "undefined" : (0, _typeof3.default)(key)) == "object") {
                            otherHeaders = (0, _assign2.default)({}, otherHeaders, key);
                            return;
                        }
                        var globalHeaderFunc = JNetwork.delegate.globalHeaders()[key];
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
                    return JNetwork.delegate.requestInterceptor(config);
                }, function (error) {
                    return JNetwork.delegate.requestInterceptorError(error);
                });
                jaxios.interceptors.response.use(function (response) {
                    return JNetwork.delegate.responseInterceptor(response);
                }, function (error) {
                    return JNetwork.delegate.responseInterceptorError(error);
                });
                // TODO: 隐性bug 只有post方法
                jaxios.post(url).then(function (response) {
                    isOk = response.status === 200;
                    return response.data;
                }).then(function (responseJson) {
                    if (isOk) {
                        if (!responseJson.errorCode) {
                            if (JNetwork.delegate.resolveInterceptor(responseJson.data)) {
                                resolve(responseJson.data);
                            }
                        } else {
                            if (JNetwork.delegate.rejectInterceptor(JNetwork.generalError(responseJson.message, responseJson.errorCode))) {
                                if (responseJson.errorCode == 10022) {
                                    reject(JNetwork.notLoginError(10022));
                                } else {
                                    reject(JNetwork.generalError(responseJson.message, responseJson.errorCode));
                                }
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
        key: "getCarryData",
        value: function getCarryData() {
            var carryData = null;
            if (JNetwork.carryData) {
                if (typeof JNetwork.carryData == "function") {
                    carryData = JNetwork.carryData();
                }
                if ((0, _typeof3.default)(JNetwork.carryData) == "object") {
                    carryData = JNetwork.carryData;
                }
            }
            return carryData || {};
        }
    }, {
        key: "freedomPOST",
        value: function freedomPOST(baseUrl, url, parameters, headers, otherObject) {
            return this.fetchRequest('post', baseUrl, url, parameters, headers, otherObject);
        }
    }, {
        key: "freedomGET",
        value: function freedomGET(baseUrl, url, parameters, headers, otherObject) {
            return this.fetchRequest('get', baseUrl, url, parameters, headers, otherObject);
        }
    }, {
        key: "POST",
        value: function POST(url, parameters, headers, otherObject) {
            return this.freedomPOST(JNetwork.baseUrl, url, (0, _assign2.default)({}, this.getCarryData(), parameters), headers, (0, _assign2.default)({ timeout: JNetwork.timeout }, otherObject));
        }
    }, {
        key: "GET",
        value: function GET(url, parameters, headers, otherObject) {
            return this.freedomGET(JNetwork.baseUrl, url, (0, _assign2.default)({}, this.getCarryData(), parameters), headers, (0, _assign2.default)({ timeout: JNetwork.timeout }, otherObject));
        }
    }], [{
        key: "useParas",
        value: function useParas() {
            var instance = new this();

            for (var _len3 = arguments.length, paras = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                paras[_key3] = arguments[_key3];
            }

            instance.otherParas = paras;
            return instance;
        }
    }, {
        key: "useHeaders",
        value: function useHeaders() {
            var instance = new this();

            for (var _len4 = arguments.length, headers = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                headers[_key4] = arguments[_key4];
            }

            instance.otherHeaders = headers;
            return instance;
        }
    }, {
        key: "instance",
        value: function instance() {
            if (!this._instance) {
                this._instance = new this();
            }
            return this._instance;
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
         * 普通异常
         * @param {error} errorMessage
         * @param {number} code
         * @returns {Error}
         */

    }, {
        key: "generalError",
        value: function generalError(errorMessage, code) {
            var resultError = new Error(errorMessage);
            (0, _defineProperty2.default)(resultError, 'errorCode', { value: code });
            return resultError;
        }
        /**
         * 没有登录异常
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
    }, {
        key: "freedomPOST",
        value: function freedomPOST(baseUrl, url, parameters, headers, otherObject) {
            var _instance;

            return (_instance = this.instance()).freedomPOST.apply(_instance, arguments);
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
            var _instance2;

            return (_instance2 = this.instance()).freedomGET.apply(_instance2, arguments);
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
            var _instance3;

            return (_instance3 = this.instance()).POST.apply(_instance3, arguments);
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
            var _instance4;

            return (_instance4 = this.instance()).GET.apply(_instance4, arguments);
        }
    }]);
    return JNetwork;
}();

JNetwork.inType = '';
JNetwork.baseUrl = '';
JNetwork.delegate = null;
JNetwork.carryData = {};
JNetwork.timeout = 10 * 1000;
exports.default = JNetwork;
//# sourceMappingURL=JNetwork.js.map
