/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || _assign2.default || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var JToolUrl_js_1 = require("../tool/JToolUrl.js");
/** @module network*/
/**
 * 网络请求类
 * @hideconstructor
 */
var JNetwork = function () {
    function JNetwork() {}
    /**
     * 需要定位的请求的公共参数
     * @private
     * @returns {*}
     */
    JNetwork.locationParas = function () {
        if (this.delegate) {
            var cityParas = this.delegate.cityParas();
            var coordinateParas = this.delegate.coordinateParas();
            return {
                cityId: cityParas.id,
                longitude: coordinateParas.longitude,
                latitude: coordinateParas.latitude
            };
        }
        return {};
    };
    /**
     * 需要登录的请求的公共参数
     * @private
     * @returns {*}
     */
    JNetwork.loginParas = function () {
        if (this.delegate && this.delegate.loginParas) {
            return this.delegate.loginParas();
        }
        return {};
    };
    /**
     * 验证失败
     * @private
     * @returns {Promise}
     */
    JNetwork.failedAuthorizationNetwork = function () {
        return new _promise2.default(function (resolve, reject) {
            reject(new Error('authorization error'));
        });
    };
    /**
     * 不存在的方法
     * @private
     * @returns {Promise}
     */
    JNetwork.unrealizedMethod = function () {
        return new _promise2.default(function (resolve, reject) {
            reject(new Error('unrealized method'));
        });
    };
    /**
     * 错误类型
     * @private
     * @returns {Promise}
     */
    JNetwork.wrongInType = function () {
        return new _promise2.default(function (resolve, reject) {
            reject(new Error('the inType is not exist, please check your inType property in JBZConfig'));
        });
    };
    /**
     * 包裹可取消的请求 （使用fetch请求时使用，目前通过axios请求，无需使用）
     * @private
     * @param promise 异步请求块
     * @returns {Promise} 被包裹后的异步请求块
     */
    JNetwork.wrapCancelablePromise = function (promise) {
        var hasCanceled_ = false;
        var wrappedPromise = new _promise2.default(function (resolve, reject) {
            promise.then(function (val) {
                return hasCanceled_ ? function () {} : resolve(val);
            }, function () {
                // 不写会有警告
            });
            promise.catch(function (error) {
                return hasCanceled_ ? function () {} : reject(error);
            });
        });
        return {
            terminate: function terminate() {
                hasCanceled_ = true;
            },
            then: function then(resolve, reject) {
                return wrappedPromise.then(resolve, reject);
            }
        };
    };
    /***
     * 检查是否配置SDK
     * @private
     */
    JNetwork.checkConfigBaseUrl = function () {
        if (!this.baseUrl || this.baseUrl === '') {
            console.log('please check if you have config baseUrl for SDK');
            throw Error('Not Config');
        }
    };
    /**
     * 高自由度POST方法
     * @param {string} baseUrl 基地址
     * @param {string} url 相对地址
     * @param {object} parameters 地址参数
     * @param {object} headers 头参数
     * @param {object} otherObject 其他可用配置
     * @returns {Promise} 异步请求块
     */
    JNetwork.freedomPOST = function (baseUrl, url, parameters, headers, otherObject) {
        this.checkConfigBaseUrl();
        var isOk;
        return this.wrapCancelablePromise(new _promise2.default(function (resolve, reject) {
            var iHeaders = (0, _assign2.default)({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, headers);
            if (headers) {
                // console.log(iHeaders)
            }
            console.log('POST ' + JToolUrl_js_1.default.urlFromPortion(baseUrl, url, parameters));
            axios_1.default(url, {
                timeout: otherObject.timeout,
                method: 'post',
                baseURL: baseUrl,
                headers: iHeaders,
                params: parameters
            }).then(function (response) {
                isOk = response.status === 200;
                return response.data;
            }).then(function (responseJson) {
                if (isOk) {
                    if (!responseJson.errorCode) {
                        resolve(responseJson.data);
                    } else {
                        var errorCode = responseJson.errorCode;
                        if (responseJson.errorCode === 10022) {
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
                if (error.message.indexOf('timeout' !== -1)) {
                    reject(new Error('请求超时, 请稍后重试'));
                } else {
                    reject(error);
                }
            });
        }));
    };
    /**
     * post请求
     * @param {string} url 相对地址
     * @param {object} parameters 地址参数
     * @param {object} headers 头参数(可空)
     * @param {object} otherObject 其他参数(可空)
     * @returns {Promise} 异步请求块
     */
    JNetwork.POST = function (url, parameters, headers, otherObject) {
        return this.freedomPOST(this.baseUrl, url, __assign({}, parameters, { inType: this.inType }), headers, __assign({ timeout: this.timeout }, otherObject));
    };
    /**
     * get请求
     * @param {string} url 相对地址
     * @param {string} parameters 地址参数
     * @param {string} headers 头参数
     * @returns {Promise} 异步请求块
     */
    JNetwork.GET = function (url, parameters, headers) {
        var _this = this;
        this.checkConfigBaseUrl();
        var isOk;
        return this.wrapCancelablePromise(new _promise2.default(function (resolve, reject) {
            var iHeaders = (0, _assign2.default)({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, headers);
            if (headers) {
                // console.log(iHeaders)
            }
            console.log('GET ' + JToolUrl_js_1.default.urlFromPortion(_this.baseUrl, url, parameters));
            axios_1.default(url, {
                timeout: _this.timeout,
                method: 'get',
                baseURL: _this.baseUrl,
                headers: iHeaders,
                params: __assign({}, parameters, { inType: _this.inType })
            }).then(function (response) {
                isOk = response.status === 200;
                return response.data;
            }).then(function (responseJson) {
                if (isOk) {
                    if (!responseJson.errorCode) {
                        resolve(responseJson.data);
                    } else {
                        if (responseJson.errorCode === 10022) {
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
                if (error.message.indexOf('timeout' !== -1)) {
                    reject(new Error('请求超时, 请稍后重试'));
                } else {
                    reject(error);
                }
            });
        }));
    };
    JNetwork.notLoginError = function (code) {
        var error = new Error('NotLogin');
        error.errorCode = code;
        return error;
    };
    JNetwork.baseUrl = '';
    JNetwork.timeout = 10 * 1000;
    JNetwork.delegate = null;
    JNetwork.inType = '';
    return JNetwork;
}();
exports.default = JNetwork;
//# sourceMappingURL=JNetwork.js.map
