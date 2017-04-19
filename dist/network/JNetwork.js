/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _JToolUrl = require('../tool/JToolUrl.js');

var _JToolUrl2 = _interopRequireDefault(_JToolUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkManager = function () {
  function NetworkManager() {
    _classCallCheck(this, NetworkManager);
  }

  _createClass(NetworkManager, null, [{
    key: 'locationParas',


    /**
     *  需要定位的请求的公共参数
     * @returns {{cityId: number, longitude: number, latitude: number}} 公共参数
     */
    value: function locationParas() {
      if (this.delegate) {
        var cityParas = this.delegate.cityParas();
        var locationParas = this.delegate.locationParas();
        return {
          cityId: cityParas.id,
          longitude: locationParas.longitude,
          latitude: locationParas.latitude
        };
      }
      return {};
    }
  }, {
    key: 'loginParas',
    value: function loginParas() {
      if (this.delegate) {
        var loginParas = this.delegate.loginParas();
        if (loginParas) {
          return {
            sessionId: loginParas.sessionId,
            openId: loginParas.mobile,
            mobile: loginParas.mobile,
            hasAccount: true
          };
        }
      }
      return {
        hasAccount: false
      };
    }
  }, {
    key: 'failedAuthorizationNetwork',
    value: function failedAuthorizationNetwork() {
      return new Promise(function (resolve, reject) {
        reject(new Error('authorization error'));
      });
    }

    /**
     * 包裹可取消的请求 （使用fetch请求时使用，目前通过axios请求，无需使用）
     * @param promise 异步请求块
     * @returns {*} 被包裹后的异步请求块
     */

  }, {
    key: 'wrapCancelablePromise',
    value: function wrapCancelablePromise(promise) {
      var hasCanceled_ = false;
      var wrappedPromise = new Promise(function (resolve, reject) {
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
    }
  }, {
    key: 'inType',
    value: function inType() {
      var intype = '';
      // if (Platform.OS === 'android'){
      //     intype = 'DPANDROID';
      // }
      return intype;
    }

    /**
     * post请求
     * @param url 相对地址
     * @param parameters 地址参数
     * @param headers 头参数
     * @returns {{terminate, then}|*} 异步请求块
     */

  }, {
    key: 'POST',
    value: function POST(url, parameters, headers) {
      var _this = this;

      var isOk = void 0;
      return this.wrapCancelablePromise(new Promise(function (resolve, reject) {
        var iHeaders = Object.assign({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, headers);
        if (headers) {
          // console.log(iHeaders)
        }
        console.log('POST ' + _JToolUrl2.default.urlFromPortion(_this.baseUrl, url, parameters));
        (0, _axios2.default)(url, {
          timeout: _this.timeout,
          method: 'post',
          baseURL: _this.baseUrl,
          headers: iHeaders,
          params: _extends({}, parameters, { inType: _this.inType() })
        }).then(function (response) {
          isOk = response.status === 200;
          return response.data;
        }).then(function (responseJson) {
          if (isOk) {
            if (!responseJson.errorCode) {
              resolve(responseJson.data);
            } else {
              if (responseJson.errorCode === 10022) {
                reject(new Error('NotLogin'));
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
    }

    /**
     * get请求
     * @param url 相对地址
     * @param parameters 地址参数
     * @returns {{terminate, then}|*} 异步请求块
     */

  }, {
    key: 'GET',
    value: function GET(url, parameters) {
      var _this2 = this;

      var isOk = void 0;
      return this.wrapCancelablePromise(new Promise(function (resolve, reject) {
        var iHeaders = Object.assign({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, headers);
        if (headers) {
          // console.log(iHeaders)
        }
        console.log('GET ' + _JToolUrl2.default.urlFromPortion(_this2.baseUrl, url, parameters));
        (0, _axios2.default)(url, {
          timeout: _this2.timeout,
          method: 'get',
          baseURL: _this2.baseUrl,
          headers: iHeaders,
          params: _extends({}, parameters, { inType: _this2.inType() })
        }).then(function (response) {
          isOk = response.status === 200;
          return response.data;
        }).then(function (responseJson) {
          if (isOk) {
            if (!responseJson.errorCode) {
              resolve(responseJson.data);
            } else {
              if (responseJson.errorCode === 10022) {
                reject(new Error('NotLogin'));
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
    }
  }]);

  return NetworkManager;
}();

NetworkManager.baseUrl = '';
NetworkManager.timeout = 10 * 1000;
NetworkManager.delegate = null;
exports.default = NetworkManager;