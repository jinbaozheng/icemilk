/**
 * Created by cuppi on 2016/12/7.
 */
'use strict';
import JNetwork from './JNetwork.ts';
import {tradeUrl} from '../unify/JUrlList';
import _ from '../unify/JDataUnify';
import JNetworkRoot from './JNetworkRoot';

/**
 * 交易接口
 * @memberOf module:network
 */
class JNetworkTrade extends JNetworkRoot{
  /**
   * 锁座
   * @param type 平台类型
   * @param paras 锁座参数
   * @returns {{terminate, then}|*}
   */
  tradeLockSeatNeedLogin(type, paras) {
    let loginParas = JNetwork.loginParas();
    return new Promise((resolve, reject) => {
      JNetwork.POST(tradeUrl.jbzLockSeat, {type, ...loginParas, ...paras}).then(data => {
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
  cancelLockSeatNeedLogin(orderId) {
    return JNetwork.POST(tradeUrl.jbzCancelOrder, {orderId})
  }

  /**
   * 下订单
   * @param type 平台类型
   * @param paras 下订单参数
   * @returns {{terminate, then}|*}
   */
  tradeApplyOrderNeedLogin(type, paras) {
    let loginParas = JNetwork.loginParas();
    let inType = JNetwork.inType;

    if (inType === 'ICBC-APP' || inType === 'SHANGHAI-APP') {
      return new Promise((resolve, reject) => {
        JNetwork.POST(tradeUrl.jbzWebAtAppApplyTicket, {type, ...loginParas, ...paras}).then(data => {
          resolve(_('tradeUrl.jbzWebAtAppApplyTicket', data));
        }, error => {
          reject(error);
        });
      });
    }
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
  tradePrePayOrderNeedLoginInType(orderId, payType, prizeIds, redIds) {
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

  static tradeLockSeatNeedLogin(type, paras) {
    return this.instance().tradeLockSeatNeedLogin(type, paras);
  }

  static cancelLockSeatNeedLogin(orderId) {
    return this.instance().cancelLockSeatNeedLogin(orderId);
  }

  static tradeApplyOrderNeedLogin(type, paras) {
    return this.instance().tradeApplyOrderNeedLogin(type, paras);
  }

  static tradePrePayOrderNeedLoginInType(orderId, payType, prizeIds, redIds) {
    return this.instance().tradePrePayOrderNeedLoginInType(orderId, payType, prizeIds, redIds);
  }

}

export default JNetworkTrade;
