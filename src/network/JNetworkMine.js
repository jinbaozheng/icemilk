/**
 * Created by cuppi on 2017/3/6.
 * @module network
 */
'use strict';
import _ from '../unify/JDataUnify';
import JNetwork from './JNetwork.js';
import {mineUrl} from '../unify/JUrlList';

/**
 * 个人中心接口
 */
class JNetworkMine {

  /**
   * 我的订单
   * @private
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

  /***
   * 我的收藏(影院)
   */
  static mineFavoriteCinemaNeedLogin() {
     let loginParas = JNetwork.loginParas();
     return new Promise((resolve, reject) => {
       JNetwork.POST(mineUrl.jbzMineCinema, {...loginParas}).then(data => {
         resolve(_('mineUrl.jbzMineCinema', data));
       }, error => {
         reject(error);
       });
     })
  }

  /**
   * 我的收藏
   * @private
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
