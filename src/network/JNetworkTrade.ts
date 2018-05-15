/**
 * Created by cuppi on 2016/12/7.
 */
'use strict';
import JNetwork from './JNetwork';
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
  tradeLockSeat(type, paras) {
    return new Promise((resolve, reject) => {
      this.prefixPromise(tradeUrl.jbzLockSeat, {type, ...paras}).then(data => {
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
  tradeCancelLockSeat(orderId) {
    return this.prefixPromise(tradeUrl.jbzCancelOrder, {orderId})
  }

  /**
   * 下订单
   * @param type 平台类型
   * @param paras 下订单参数
   * @returns {{terminate, then}|*}
   */
  tradeApplyOrder(type, paras) {
    let inType = JNetwork.inType;
    if (inType === 'ICBC-APP' || inType === 'SHANGHAI-APP') {
      return new Promise((resolve, reject) => {
        this.prefixPromise(tradeUrl.jbzWebAtAppApplyTicket, {type, ...paras}).then(data => {
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
  tradePrePayOrder(orderId, payType, prizeIds, redIds) {
    let inType = JNetwork.inType;
    if (inType === 'DPIOS' || inType === 'DPANDROID') {
      return this.prefixPromise(tradeUrl.jbzAppPrepay, {orderId, payType, prizeIds, redIds});
    }
    if (inType === 'DPWX' || inType === 'DPWEB' || inType === 'PC') {
      return this.prefixPromise(tradeUrl.jbzWebPrepay, {orderId, payType, prizeIds, redIds});
    }
    return JNetwork.wrongInType();
  }

  static tradeLockSeat(type, paras) {
    return this.instance().tradeLockSeat(type, paras);
  }

  static tradeCancelLockSeat(orderId) {
    return this.instance().tradeCancelLockSeat(orderId);
  }

  static tradeApplyOrder(type, paras) {
    return this.instance().tradeApplyOrder(type, paras);
  }

  static tradePrePayOrder(orderId, payType, prizeIds, redIds) {
    return this.instance().tradePrePayOrder(orderId, payType, prizeIds, redIds);
  }

}

export default JNetworkTrade;
