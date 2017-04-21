
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkAccountManager = function () {
  function NetworkAccountManager() {
    (0, _classCallCheck3.default)(this, NetworkAccountManager);
  }

  (0, _createClass3.default)(NetworkAccountManager, null, [{
    key: 'accountLogin',
    value: function accountLogin(mobile, password) {
      return _JNetwork2.default.POST(_JUrlList.accountUrl.login, {
        mobile: mobile,
        password: password
      });
    }
  }, {
    key: 'accountLogout',
    value: function accountLogout(sessionId) {
      return _JNetwork2.default.POST(_JUrlList.accountUrl.logout, {}, sessionId);
    }
  }, {
    key: 'accountGetVerifyCode',
    value: function accountGetVerifyCode(mobile, type) {
      return _JNetwork2.default.POST(_JUrlList.accountUrl.verifycode, {
        mobile: mobile,
        codetype: type
      });
    }
  }, {
    key: 'accountRegister',
    value: function accountRegister(mobile, verifyCode, password) {
      return _JNetwork2.default.POST(_JUrlList.accountUrl.register, {
        mobile: mobile,
        verifyCode: verifyCode,
        password: password
      });
    }
  }, {
    key: 'accountUpdatepass',
    value: function accountUpdatepass(mobile, verfyCode, password) {
      return _JNetwork2.default.POST(_JUrlList.accountUrl.updatepass, {
        mobile: mobile,
        verifyCode: verfyCode,
        password: password
      });
    }
  }]);
  return NetworkAccountManager;
}();

exports.default = NetworkAccountManager;