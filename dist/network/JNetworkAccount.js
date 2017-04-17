/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkAccountManager = function () {
  function NetworkAccountManager() {
    _classCallCheck(this, NetworkAccountManager);
  }

  _createClass(NetworkAccountManager, null, [{
    key: 'accountLogin',

    /**
     * 用户登录
     * @param mobile 登录需要的手机号码
     * @param password 密码
     * @returns {{terminate, then}|*}
     */
    value: function accountLogin(mobile, password) {
      return _JNetwork2.default.post(_JUrlList.accountUrl.login, {
        mobile: mobile,
        password: password
      });
    }

    /**
     * 用户登出
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'accountLogout',
    value: function accountLogout(sessionId) {
      return _JNetwork2.default.post(_JUrlList.accountUrl.logout, {}, sessionId);
    }

    /**
     * 获取验证码
     * @param mobile 接收验证码的手机号码
     * @param type 验证码类型 （1：注册使用 2：忘记密码使用）
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'accountGetVerifyCode',
    value: function accountGetVerifyCode(mobile, type) {
      return _JNetwork2.default.post(_JUrlList.accountUrl.verifycode, {
        mobile: mobile,
        codetype: type
      });
    }

    /**
     * 注册用户
     * @param mobile 用户的手机号码
     * @param verifyCode 验证码
     * @param password 密码
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'accountRegister',
    value: function accountRegister(mobile, verifyCode, password) {
      return _JNetwork2.default.post(_JUrlList.accountUrl.register, {
        mobile: mobile,
        verifyCode: verifyCode,
        password: password
      });
    }

    /**
     * 忘记密码并且找回密码
     * @param mobile 手机号码
     * @param verfyCode 验证码
     * @param password 新密码
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'accountUpdatepass',
    value: function accountUpdatepass(mobile, verfyCode, password) {
      return _JNetwork2.default.post(_JUrlList.accountUrl.updatepass, {
        mobile: mobile,
        verifyCode: verfyCode,
        password: password
      });
    }
  }]);

  return NetworkAccountManager;
}();

exports.default = NetworkAccountManager;