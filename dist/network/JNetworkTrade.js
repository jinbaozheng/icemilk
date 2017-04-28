
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkTradeManager = function () {
  function NetworkTradeManager() {
    (0, _classCallCheck3.default)(this, NetworkTradeManager);
  }

  (0, _createClass3.default)(NetworkTradeManager, null, [{
    key: 'tradeLockSeatNeedLogin',
    value: function tradeLockSeatNeedLogin(type, paras) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzLockSeat, (0, _extends3.default)({ type: type }, paras), loginParas);
    }
  }, {
    key: 'cancelLockSeatNeedLogin',
    value: function cancelLockSeatNeedLogin(orderId) {
      return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzCancelOrder, { orderId: orderId });
    }
  }, {
    key: 'tradeApplyOrderNeedLoginInType',
    value: function tradeApplyOrderNeedLoginInType(type, paras) {
      var loginParas = _JNetwork2.default.loginParas();
      var inType = _JNetwork2.default.inType();
      if (inType === 'DPIOS' || inType === 'DPANDROID') {
        return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzAppApplyTicket, (0, _extends3.default)({ type: type }, paras), loginParas);
      }

      if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
        return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzWepApplyTicket, (0, _extends3.default)({ type: type }, paras), loginParas);
      }

      return _JNetwork2.default.wrongInType();
    }
  }, {
    key: 'tradePrePayOrderNeedLoginInType',
    value: function tradePrePayOrderNeedLoginInType(orderId, payType, prizeIds, redIds) {
      var loginParas = _JNetwork2.default.loginParas();
      var inType = _JNetwork2.default.inType();

      if (inType === 'DPIOS' || inType === 'DPANDROID') {
        return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzAppPrepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds }, loginParas);
      }

      if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
        return _JNetwork2.default.POST(_JUrlList.tradeUrl.jbzWebPrepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds }, loginParas);
      }

      return _JNetwork2.default.wrongInType();
    }
  }]);
  return NetworkTradeManager;
}();

exports.default = NetworkTradeManager;