/**
 * Created by cuppi on 2016/12/7.
 */
'use strict';
import JNetwork from './JNetwork.js';
import {tradeUrl} from '../unify/JUrlList';
import _ from '../unify/JDataUnify';

/**
 * 交易接口
 * @alias network/JNetworkTrade
 */
class JNetworkTrade {
  /**
   * 锁座
   * @param type 平台类型
   * @param paras 锁座参数
   * @returns {{terminate, then}|*}
   */
  static tradeLockSeatNeedLogin(type, paras) {
    let loginParas = JNetwork.loginParas();
    return new Promise((resolve, reject) => {
      JNetwork.POST(tradeUrl.jbzLockSeat, {type, ...paras}).then(data => {
        resolve(_('tradeUrl.jbzLockSeat', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * 取消锁座
   * @param orderId 订单Id
   * @returns {{terminate, then}|*}
   */
  static cancelLockSeatNeedLogin(orderId) {
    return JNetwork.POST(tradeUrl.jbzCancelOrder, {orderId})
  }

  /**
   * 下订单
   * @param type 平台类型
   * @param paras 下订单参数
   * @returns {{terminate, then}|*}
   */
  static tradeApplyOrderNeedLogin(type, paras) {
    let loginParas = JNetwork.loginParas();
    let inType = JNetwork.inType;

    if (inType === 'ICBC-APP' || inType === 'SHANGHAI-APP') {
      return new Promise((resolve, reject) => {
        JNetwork.POST(tradeUrl.jbzWebAtAppApplyTicket, {type, ...paras}).then(data => {
          resolve(_('tradeUrl.jbzWebAtAppApplyTicket', data));
        }, error => {
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

    return JNetwork.wrongInType();
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
    let loginParas = JNetwork.loginParas();
    let inType = JNetwork.inType;

    if (inType === 'DPIOS' || inType === 'DPANDROID') {
      return JNetwork.POST(tradeUrl.jbzAppPrepay, {orderId, payType, prizeIds, redIds}, loginParas);
    }


    if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
      return JNetwork.POST(tradeUrl.jbzWebPrepay, {orderId, payType, prizeIds, redIds}, loginParas);
    }

    return JNetwork.wrongInType();
  }
}

export default JNetworkTrade;
