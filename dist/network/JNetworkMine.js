
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JDataUnify = require('../unify/JDataUnify');

var _JDataUnify2 = _interopRequireDefault(_JDataUnify);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../unify/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JNetworkMine = function () {
  function JNetworkMine() {
    (0, _classCallCheck3.default)(this, JNetworkMine);
  }

  (0, _createClass3.default)(JNetworkMine, null, [{
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
    key: 'mineFavoriteCinemaNeedLogin',
    value: function mineFavoriteCinemaNeedLogin() {
      var loginParas = _JNetwork2.default.loginParas();
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.mineUrl.jbzMineCinema, (0, _extends3.default)({}, loginParas)).then(function (data) {
          resolve((0, _JDataUnify2.default)('mineUrl.jbzMineCinema', data));
        }, function (error) {
          reject(error);
        });
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
  return JNetworkMine;
}();

exports.default = JNetworkMine;