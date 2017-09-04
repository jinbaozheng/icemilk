/**
 * Created by cuppi on 2016/12/7.
 */
'use strict';

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || _assign2.default || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var JNetwork_js_1 = require("./JNetwork.js");
var JUrlList_1 = require("../unify/JUrlList");
var JDataUnify_1 = require("../unify/JDataUnify");
/**
 * 交易接口
 * @memberOf module:network
 */
var JNetworkTrade = function () {
    function JNetworkTrade() {}
    /**
     * 锁座
     * @param type 平台类型
     * @param paras 锁座参数
     * @returns {{terminate, then}|*}
     */
    JNetworkTrade.tradeLockSeatNeedLogin = function (type, paras) {
        var loginParas = JNetwork_js_1.default.loginParas();
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.tradeUrl.jbzLockSeat, __assign({ type: type }, loginParas, paras)).then(function (data) {
                resolve(JDataUnify_1.default('tradeUrl.jbzLockSeat', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 取消锁座
     * @param orderId 订单Id
     * @returns {{terminate, then}|*}
     */
    JNetworkTrade.cancelLockSeatNeedLogin = function (orderId) {
        return JNetwork_js_1.default.POST(JUrlList_1.tradeUrl.jbzCancelOrder, { orderId: orderId });
    };
    /**
     * 下订单
     * @param type 平台类型
     * @param paras 下订单参数
     * @returns {{terminate, then}|*}
     */
    JNetworkTrade.tradeApplyOrderNeedLogin = function (type, paras) {
        var loginParas = JNetwork_js_1.default.loginParas();
        var inType = JNetwork_js_1.default.inType;
        if (inType === 'ICBC-APP' || inType === 'SHANGHAI-APP') {
            return new _promise2.default(function (resolve, reject) {
                JNetwork_js_1.default.POST(JUrlList_1.tradeUrl.jbzWebAtAppApplyTicket, __assign({ type: type }, loginParas, paras)).then(function (data) {
                    resolve(JDataUnify_1.default('tradeUrl.jbzWebAtAppApplyTicket', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        // if (inType === 'DPIOS' || inType === 'DPANDROID') {
        //   return JNetwork.POST(tradeUrl.jbzAppApplyTicket, {type, ...paras}, loginParas);
        // }
        //
        // if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
        //   return JNetwork.POST(tradeUrl.jbzWepApplyTicket, {type, ...paras}, loginParas);
        // }
        return JNetwork_js_1.default.wrongInType();
    };
    /**
     * 申请预订单
     * @param orderId 订单Id
     * @param payType 支付类型
     * @param prizeIds 待定
     * @param redIds 待定
     * @returns {{terminate, then}|*}
     */
    JNetworkTrade.tradePrePayOrderNeedLoginInType = function (orderId, payType, prizeIds, redIds) {
        var loginParas = JNetwork_js_1.default.loginParas();
        var inType = JNetwork_js_1.default.inType;
        if (inType === 'DPIOS' || inType === 'DPANDROID') {
            return JNetwork_js_1.default.POST(JUrlList_1.tradeUrl.jbzAppPrepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds }, loginParas);
        }
        if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
            return JNetwork_js_1.default.POST(JUrlList_1.tradeUrl.jbzWebPrepay, { orderId: orderId, payType: payType, prizeIds: prizeIds, redIds: redIds }, loginParas);
        }
        return JNetwork_js_1.default.wrongInType();
    };
    return JNetworkTrade;
}();
exports.default = JNetworkTrade;
//# sourceMappingURL=JNetworkTrade.js.map
