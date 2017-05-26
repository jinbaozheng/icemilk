/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';
import JNetwork from './JNetwork.js';
import {mineUrl} from '../unify/JUrlList';

/**
 * 个人中心接口
 * @alias network/JNetworkMine
 */
class JNetworkMine {

  /**
   * 我的订单
   * @returns {*}
   */
  static mineOrderNeedLogin() {
    let loginParas = JNetwork.loginParas();
    if (!loginParas.hasAccount) {
      return JNetwork.failedAuthorizationNetwork();
    }
    let {openId, sessionId} = loginParas;
    return JNetwork.POST(mineUrl.userorders, {
      openId
    }, {
      openId, sessionId
    });
  }

  /**
   * 我的收藏
   * @returns {*}
   */
  static mineFavoriteNeedLogin() {
    let loginParas = JNetwork.loginParas();
    if (!loginParas.hasAccount) {
      return JNetwork.failedAuthorizationNetwork();
    }
    let {openId, sessionId} = loginParas;
    return JNetwork.POST(mineUrl.collectedcinemalist, {
      openId: openId
    }, {
      openId: openId, sessionId
    });
  }
}

export default JNetworkMine;
