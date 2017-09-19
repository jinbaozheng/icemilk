/**
 * Created by cuppi on 2016/12/7.
 */
'use strict';

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var JNetwork_1 = require("./JNetwork");
var JUrlList_1 = require("../unify/JUrlList");
var JDataUnify_1 = require("../unify/JDataUnify");
var JNetworkRoot_1 = require("./JNetworkRoot");
/**
 * 交易接口
 * @memberOf module:network
 */

var JNetworkTrade = function (_JNetworkRoot_1$defau) {
    (0, _inherits3.default)(JNetworkTrade, _JNetworkRoot_1$defau);

    function JNetworkTrade() {
        (0, _classCallCheck3.default)(this, JNetworkTrade);
        return (0, _possibleConstructorReturn3.default)(this, (JNetworkTrade.__proto__ || (0, _getPrototypeOf2.default)(JNetworkTrade)).apply(this, arguments));
    }

    (0, _createClass3.default)(JNetworkTrade, [{
        key: "tradeLockSeat",

        /**
         * 锁座
         * @param type 平台类型
         * @param paras 锁座参数
         * @returns {{terminate, then}|*}
         */
        value: function tradeLockSeat(type, paras) {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                _this2.prefixPromise(JUrlList_1.tradeUrl.jbzLockSeat, (0, _assign2.default)({ type: type }, paras)).then(function (data) {
                    resolve(JDataUnify_1.default('tradeUrl.jbzLockSeat', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 取消锁座
         * @param orderId 订单Id
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "tradeCancelLockSeat",
        value: function tradeCancelLockSeat(orderId) {
            return this.prefixPromise(JUrlList_1.tradeUrl.jbzCancelOrder, { orderId: orderId });
        }
        /**
         * 下订单
         * @param type 平台类型
         * @param paras 下订单参数
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "tradeApplyOrder",
        value: function tradeApplyOrder(type, paras) {
            var _this3 = this;

            var inType = JNetwork_1.default.inType;
            if (inType === 'ICBC-APP' || inType === 'SHANGHAI-APP') {
                return new _promise2.default(function (resolve, reject) {
                    _this3.prefixPromise(JUrlList_1.tradeUrl.jbzWebAtAppApplyTicket, (0, _assign2.default)({ type: type }, paras)).then(function (data) {
                        resolve(JDataUnify_1.default('tradeUrl.jbzWebAtAppApplyTicket', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            }
            return JNetwork_1.default.wrongInType();
        }
        /**
         * 申请预订单
         * @param orderId 订单Id
         * @param payType 支付类型
         * @param prizeIds 待定
         * @param redIds 待定
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "tradePrePayOrder",
        value: function tradePrePayOrder(orderId, payType, prizeIds, redIds) {
            var inType = JNetwork_1.default.inType;
            if (inType === 'DPIOS' || inType === 'DPANDROID') {
                return this.prefixPromise(JUrlList_1.tradeUrl.jbzAppPrepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds });
            }
            if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
                return this.prefixPromise(JUrlList_1.tradeUrl.jbzWebPrepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds });
            }
            return JNetwork_1.default.wrongInType();
        }
    }], [{
        key: "tradeLockSeat",
        value: function tradeLockSeat(type, paras) {
            return this.instance().tradeLockSeatNeedLogin(type, paras);
        }
    }, {
        key: "tradeCancelLockSeat",
        value: function tradeCancelLockSeat(orderId) {
            return this.instance().cancelLockSeatNeedLogin(orderId);
        }
    }, {
        key: "tradeApplyOrder",
        value: function tradeApplyOrder(type, paras) {
            return this.instance().tradeApplyOrderNeedLogin(type, paras);
        }
    }, {
        key: "tradePrePayOrder",
        value: function tradePrePayOrder(orderId, payType, prizeIds, redIds) {
            return this.instance().tradePrePayOrderNeedLoginInType(orderId, payType, prizeIds, redIds);
        }
    }]);
    return JNetworkTrade;
}(JNetworkRoot_1.default);

exports.default = JNetworkTrade;
//# sourceMappingURL=JNetworkTrade.js.map
