
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

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../unify/JUrlList');

var _JDataUnify = require('../unify/JDataUnify');

var _JDataUnify2 = _interopRequireDefault(_JDataUnify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JNetworkTrade = function () {
  function JNetworkTrade() {
    (0, _classCallCheck3.default)(this, JNetworkTrade);
  }

  (0, _createClass3.default)(JNetworkTrade, null, [{
    key: 'tradeLockSeatNeedLogin',
    value: function tradeLockSeatNeedLogin(type, paras) {
      var loginParas = _JNetwork2.default.loginParas();
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzLockSeat, (0, _extends3.default)({ type: type }, loginParas, paras)).then(function (data) {
          resolve((0, _JDataUnify2.default)('tradeUrl.jbzLockSeat', data));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cancelLockSeatNeedLogin',
    value: function cancelLockSeatNeedLogin(orderId) {
      return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzCancelOrder, { orderId: orderId });
    }
  }, {
    key: 'tradeApplyOrderNeedLogin',
    value: function tradeApplyOrderNeedLogin(type, paras) {
      var loginParas = _JNetwork2.default.loginParas();
      var inType = _JNetwork2.default.inType;

      if (inType === 'ICBC-APP' || inType === 'SHANGHAI-APP') {
        return new _promise2.default(function (resolve, reject) {
          _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzWebAtAppApplyTicket, (0, _extends3.default)({ type: type }, loginParas, paras)).then(function (data) {
            resolve((0, _JDataUnify2.default)('tradeUrl.jbzWebAtAppApplyTicket', data));
          }, function (error) {
            reject(error);
          });
        });
      }

      return _JNetwork2.default.wrongInType();
    }
  }, {
    key: 'tradePrePayOrderNeedLoginInType',
    value: function tradePrePayOrderNeedLoginInType(orderId, payType, prizeIds, redIds) {
      var loginParas = _JNetwork2.default.loginParas();
      var inType = _JNetwork2.default.inType;

      if (inType === 'DPIOS' || inType === 'DPANDROID') {
        return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzAppPrepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds }, loginParas);
      }

      if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
        return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzWebPrepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds }, loginParas);
      }

      return _JNetwork2.default.wrongInType();
    }
  }]);
  return JNetworkTrade;
}();

exports.default = JNetworkTrade;