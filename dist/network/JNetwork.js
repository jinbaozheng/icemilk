
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _JToolUrl = require('../tool/JToolUrl.js');

var _JToolUrl2 = _interopRequireDefault(_JToolUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JNetwork = function () {
  function JNetwork() {
    (0, _classCallCheck3.default)(this, JNetwork);
  }

  (0, _createClass3.default)(JNetwork, null, [{
    key: 'locationParas',
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
      return {};
    }
  }, {
    key: 'loginParas',
    value: function loginParas() {
      if (this.delegate && this.delegate.loginParas) {
        return this.delegate.loginParas();
      }
      return {};
    }
  }, {
    key: 'failedAuthorizationNetwork',
    value: function failedAuthorizationNetwork() {
      return new _promise2.default(function (resolve, reject) {
        reject(new Error('authorization error'));
      });
    }
  }, {
    key: 'unrealizedMethod',
    value: function unrealizedMethod() {
      return new _promise2.default(function (resolve, reject) {
        reject(new Error('unrealized method'));
      });
    }
  }, {
    key: 'wrongInType',
    value: function wrongInType() {
      return new _promise2.default(function (resolve, reject) {
        reject(new Error('the inType is not exist, please check your inType property in JBZConfig'));
      });
    }
  }, {
    key: 'wrapCancelablePromise',
    value: function wrapCancelablePromise(promise) {
      var hasCanceled_ = false;
      var wrappedPromise = new _promise2.default(function (resolve, reject) {
        promise.then(function (val) {
          return hasCanceled_ ? function () {} : resolve(val);
        }, function () {});
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
    key: 'checkConfigBaseUrl',
    value: function checkConfigBaseUrl() {
      if (!this.baseUrl || this.baseUrl === '') {
        console.log('please check if you have config baseUrl for SDK');
        throw Error('Not Config');
      }
    }
  }, {
    key: 'freedomPOST',
    value: function freedomPOST(baseUrl, url, parameters, headers, otherObject) {
      this.checkConfigBaseUrl();
      var isOk = void 0;
      return this.wrapCancelablePromise(new _promise2.default(function (resolve, reject) {
        var iHeaders = (0, _assign2.default)({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, headers);
        if (headers) {}
        console.log('POST ' + _JToolUrl2.default.urlFromPortion(baseUrl, url, parameters));
        (0, _axios2.default)(url, {
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
          if (error.message.indexOf('timeout' !== -1)) {
            reject(new Error('请求超时, 请稍后重试'));
          } else {
            reject(error);
          }
        });
      }));
    }
  }, {
    key: 'POST',
    value: function POST(url, parameters, headers, otherObject) {
      return this.freedomPOST(this.baseUrl, url, (0, _extends3.default)({}, parameters, { inType: this.inType }), headers, (0, _extends3.default)({ timeout: this.timeout }, otherObject));
    }
  }, {
    key: 'GET',
    value: function GET(url, parameters, headers) {
      var _this = this;

      this.checkConfigBaseUrl();
      var isOk = void 0;
      return this.wrapCancelablePromise(new _promise2.default(function (resolve, reject) {
        var iHeaders = (0, _assign2.default)({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, headers);
        if (headers) {}
        console.log('GET ' + _JToolUrl2.default.urlFromPortion(_this.baseUrl, url, parameters));
        (0, _axios2.default)(url, {
          timeout: _this.timeout,
          method: 'get',
          baseURL: _this.baseUrl,
          headers: iHeaders,
          params: (0, _extends3.default)({}, parameters, { inType: _this.inType })
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
          if (error.message.indexOf('timeout' !== -1)) {
            reject(new Error('请求超时, 请稍后重试'));
          } else {
            reject(error);
          }
        });
      }));
    }
  }, {
    key: 'notLoginError',
    value: function notLoginError(code) {
      var error = new Error('NotLogin');
      error.errorCode = code;
      return error;
    }
  }]);
  return JNetwork;
}();

JNetwork.baseUrl = '';
JNetwork.timeout = 10 * 1000;
JNetwork.delegate = null;
JNetwork.inType = '';
exports.default = JNetwork;