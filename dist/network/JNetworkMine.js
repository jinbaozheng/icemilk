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

var NetworkMineManager = function () {
  function NetworkMineManager() {
    _classCallCheck(this, NetworkMineManager);
  }

  _createClass(NetworkMineManager, null, [{
    key: 'mineOrderNeedLogin',


    /**
     * 我的订单
     * @returns {*}
     */
    value: function mineOrderNeedLogin() {
      var loginParas = _JNetwork2.default.locationParas();
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

    /**
     * 我的收藏
     * @returns {*}
     */

  }, {
    key: 'mineFavoriteNeedLogin',
    value: function mineFavoriteNeedLogin() {
      var loginParas = _JNetwork2.default.locationParas();
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