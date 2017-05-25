/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';
import NetworkManager from './JNetwork.js';
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
    let loginParas = NetworkManager.loginParas();
    if (!loginParas.hasAccount) {
      return NetworkManager.failedAuthorizationNetwork();
    }
    let {openId, sessionId} = loginParas;
    return NetworkManager.POST(mineUrl.userorders, {
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
    let loginParas = NetworkManager.loginParas();
    if (!loginParas.hasAccount) {
      return NetworkManager.failedAuthorizationNetwork();
    }
    let {openId, sessionId} = loginParas;
    return NetworkManager.POST(mineUrl.collectedcinemalist, {
      openId: openId
    }, {
      openId: openId, sessionId
    });
  }
}

export default JNetworkMine;
