
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
      return _JNetwork2.default.POST(_JUrlList.tradeUrl.lockseat, (0, _extends3.default)({ type: type }, paras), loginParas);
    }
  }, {
    key: 'cancelLockSeatNeedLogin',
    value: function cancelLockSeatNeedLogin(orderId) {
      return _JNetwork2.default.POST(_JUrlList.tradeUrl.cancelOrder, { orderId: orderId });
    }
  }, {
    key: 'tradeConfirmOrderNeedLogin',
    value: function tradeConfirmOrderNeedLogin(type, paras) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.POST(_JUrlList.tradeUrl.applyticket, (0, _extends3.default)({ type: type }, paras), loginParas);
    }
  }, {
    key: 'tradePrePayOrderNeedLogin',
    value: function tradePrePayOrderNeedLogin(orderId, payType, prizeIds, redIds) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.POST(_JUrlList.tradeUrl.prepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds }, loginParas);
    }
  }]);
  return NetworkTradeManager;
}();

exports.default = NetworkTradeManager;