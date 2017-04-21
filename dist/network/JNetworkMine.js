
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

var NetworkMineManager = function () {
  function NetworkMineManager() {
    (0, _classCallCheck3.default)(this, NetworkMineManager);
  }

  (0, _createClass3.default)(NetworkMineManager, null, [{
    key: 'mineOrderNeedLogin',
    value: function mineOrderNeedLogin() {
      var loginParas = _JNetwork2.default.loginParas();
      if (!loginParas.hasAccount) {
        return _JNetwork2.default.failedAuthorizationNetwork();
      }
      var openId = loginParas.openId,
          sessionId = loginParas.sessionId;

      return _JNetwork2.default.POST(_JUrlList.mineUrl.userorders, {
        openId: openId
      }, {
        openId: openId, sessionId: sessionId
      });
    }
  }, {
    key: 'mineFavoriteNeedLogin',
    value: function mineFavoriteNeedLogin() {
      var loginParas = _JNetwork2.default.loginParas();
      if (!loginParas.hasAccount) {
        return _JNetwork2.default.failedAuthorizationNetwork();
      }
      var openId = loginParas.openId,
          sessionId = loginParas.sessionId;

      return _JNetwork2.default.POST(_JUrlList.mineUrl.collectedcinemalist, {
        openId: openId
      }, {
        openId: openId, sessionId: sessionId
      });
    }
  }]);
  return NetworkMineManager;
}();

exports.default = NetworkMineManager;