/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {mineUrl} from '../constant/JUrlList';

class NetworkMineManager {
  static mineOrder() {
    let loginParas = NetworkManager.locationParas();
    if (!loginParas.hasAccount) {
      return NetworkManager.failedAuthorizationNetwork();
    }
    let {openId, sessionId} = loginParas;
    return NetworkManager.post(mineUrl.userorders, {
      openId
    }, {
      openId, sessionId
    });
  }

  static mineFavorite() {
    let loginParas = NetworkManager.locationParas();
    if (!loginParas.hasAccount) {
      return NetworkManager.failedAuthorizationNetwork();
    }
    let {openId, sessionId} = loginParas;
    return NetworkManager.post(mineUrl.collectedcinemalist, {
      openId: openId
    }, {
      openId: openId, sessionId
    });
  }
}

export default NetworkMineManager;
