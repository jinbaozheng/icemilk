/**
 * Created by cuppi on 2016/12/7.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkTradeManager = function () {
  function NetworkTradeManager() {
    _classCallCheck(this, NetworkTradeManager);
  }

  _createClass(NetworkTradeManager, null, [{
    key: 'tradeLockSeat',

    /**
     * 锁座
     * @param type 平台类型
     * @param paras 锁座参数
     * @returns {{terminate, then}|*}
     */
    value: function tradeLockSeat(type, paras) {
      return _JNetwork2.default.post(_JUrlList.tradeUrl.lockseat, _extends({ type: type }, paras));
    }

    /**
     * 锁座
     * @param type 平台类型
     * @param paras 锁座参数
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'tradeLockSeatNeedLogin',
    value: function tradeLockSeatNeedLogin(type, paras) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.post(_JUrlList.tradeUrl.lockseat, _extends({ type: type }, paras), loginParas);
    }

    // 取消锁座
    // @param orderId 订单Id

  }, {
    key: 'cancelOrder',
    value: function cancelOrder(orderId) {
      console.log(orderId);
      return _JNetwork2.default.post(_JUrlList.tradeUrl.cancelOrder, { orderId: orderId });
    }

    /**
     * 下订单
     * @param type 平台类型
     * @param paras 下订单参数
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'tradeConfirmOrder',
    value: function tradeConfirmOrder(type, paras) {
      return _JNetwork2.default.post(_JUrlList.tradeUrl.applyticket, _extends({ type: type }, paras));
    }

    /**
     * 下订单
     * @param type 平台类型
     * @param paras 下订单参数
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'tradeConfirmOrderNeedLogin',
    value: function tradeConfirmOrderNeedLogin(type, paras) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.post(_JUrlList.tradeUrl.applyticket, _extends({ type: type }, paras), loginParas);
    }
  }, {
    key: 'tradePrePayOrderNeedLogin',
    value: function tradePrePayOrderNeedLogin(orderId, payType, prizeIds, redIds) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.post(_JUrlList.tradeUrl.prepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds }, loginParas);
    }
  }]);

  return NetworkTradeManager;
}();

exports.default = NetworkTradeManager;