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
    return NetworkManager.POST(tradeUrl.jbzLockSeat, {type, ...paras}, loginParas);
  }

  /**
   * 取消锁座
   * @param orderId 订单Id
   * @returns {{terminate, then}|*}
   */
  static cancelLockSeatNeedLogin(orderId) {
    return NetworkManager.POST(tradeUrl.jbzCancelOrder, {orderId})
  }

  /**
   * 下订单
   * @param type 平台类型
   * @param paras 下订单参数
   * @returns {{terminate, then}|*}
   */
  static tradeApplyOrderNeedLoginInType(type, paras) {
    let loginParas = NetworkManager.loginParas();
    let inType = NetworkManager.inType();
    if (inType === 'DPIOS' || inType === 'DPANDROID') {
      return NetworkManager.POST(tradeUrl.jbzAppApplyTicket, {type, ...paras}, loginParas);
    }

    if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
      return NetworkManager.POST(tradeUrl.jbzWepApplyTicket, {type, ...paras}, loginParas);
    }

    return NetworkManager.wrongInType();
  }

  /**
   * 申请预订单
   * @param orderId 订单Id
   * @param payType 支付类型
   * @param prizeIds 待定
   * @param redIds 待定
   * @returns {{terminate, then}|*}
   */
  static tradePrePayOrderNeedLoginInType(orderId, payType, prizeIds, redIds) {
    let loginParas = NetworkManager.loginParas();
    let inType = NetworkManager.inType();

    if (inType === 'DPIOS' || inType === 'DPANDROID') {
      return NetworkManager.POST(tradeUrl.jbzAppPrepay, {orderId, payType, prizeIds, redIds}, loginParas);
    }


    if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
      return NetworkManager.POST(tradeUrl.jbzWebPrepay, {orderId, payType, prizeIds, redIds}, loginParas);
    }

    return NetworkManager.wrongInType();
  }
}

export default NetworkTradeManager;
