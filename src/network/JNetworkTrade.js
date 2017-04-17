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
  static tradeLockSeat(type, paras) {
    return NetworkManager.post(tradeUrl.lockseat, {type, ...paras});
  }

  /**
   * 锁座
   * @param type 平台类型
   * @param paras 锁座参数
   * @returns {{terminate, then}|*}
   */
  static tradeLockSeatNeedLogin(type, paras) {
    let loginParas = NetworkManager.loginParas();
    return NetworkManager.post(tradeUrl.lockseat, {type, ...paras}, loginParas);
  }

  // 取消锁座
  // @param orderId 订单Id
  static cancelOrder(orderId) {
    console.log(orderId);
    return NetworkManager.post(tradeUrl.cancelOrder, {orderId})
  }

  /**
   * 下订单
   * @param type 平台类型
   * @param paras 下订单参数
   * @returns {{terminate, then}|*}
   */
  static tradeConfirmOrder(type, paras) {
    return NetworkManager.post(tradeUrl.applyticket, {type, ...paras});
  }

  /**
   * 下订单
   * @param type 平台类型
   * @param paras 下订单参数
   * @returns {{terminate, then}|*}
   */
  static tradeConfirmOrderNeedLogin(type, paras) {
    let loginParas = NetworkManager.loginParas();
    return NetworkManager.post(tradeUrl.applyticket, {type, ...paras}, loginParas);
  }

  static tradePrePayOrderNeedLogin(orderId, payType, prizeIds, redIds) {
    let loginParas = NetworkManager.loginParas();
    return NetworkManager.post(tradeUrl.prepay, {orderId, payType, prizeIds, redIds}, loginParas);
  }

}

export default NetworkTradeManager;
