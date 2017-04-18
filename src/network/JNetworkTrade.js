/**
 * Created by cuppi on 2016/12/7.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {tradeUrl} from '../constant/JUrlList';

class NetworkTradeManager {
  /**
   * 锁座
   * @param type 平台类型
   * @param paras 锁座参数
   * @returns {{terminate, then}|*}
   */
  static tradeLockSeatNeedLogin(type, paras) {
    let loginParas = NetworkManager.loginParas();
    return NetworkManager.POST(tradeUrl.lockseat, {type, ...paras}, loginParas);
  }

  /**
   * 取消锁座
   * @param orderId 订单Id
   * @returns {{terminate, then}|*}
   */
  static cancelLockSeatNeedLogin(orderId) {
    return NetworkManager.POST(tradeUrl.cancelOrder, {orderId})
  }

  /**
   * 下订单
   * @param type 平台类型
   * @param paras 下订单参数
   * @returns {{terminate, then}|*}
   */
  static tradeConfirmOrderNeedLogin(type, paras) {
    let loginParas = NetworkManager.loginParas();
    return NetworkManager.POST(tradeUrl.applyticket, {type, ...paras}, loginParas);
  }

  /**
   * 申请预订单
   * @param orderId 订单Id
   * @param payType 支付类型
   * @param prizeIds 待定
   * @param redIds 待定
   * @returns {{terminate, then}|*}
   */
  static tradePrePayOrderNeedLogin(orderId, payType, prizeIds, redIds) {
    let loginParas = NetworkManager.loginParas();
    return NetworkManager.POST(tradeUrl.prepay, {orderId, payType, prizeIds, redIds}, loginParas);
  }
}

export default NetworkTradeManager;
