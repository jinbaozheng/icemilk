/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';
import _ from '../unify/JDataUnify';
import JNetwork from './JNetwork.ts';
import {mineUrl} from '../unify/JUrlList';
import JNetworkRoot from './JNetworkRoot';

/**
 * 个人中心接口
 * @memberOf module:network
 */
class JNetworkMine extends JNetworkRoot{

  /**
   * 我的订单
   * @private
   * @returns {*}
   */
  mineOrder() {
    return JNetwork.POST(mineUrl.userorders).useParas(...this.otherParas).useHeaders(...this.otherHeaders);
  }

  /***
   * 我的收藏(影院)
   */
  mineFavoriteCinema() {
    return new Promise((resolve, reject) => {
      JNetwork.POST(mineUrl.jbzMineCinema).useParas(...this.otherParas).useHeaders(...this.otherHeaders).then(data => {
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
  mineFavorite() {
    return JNetwork.POST(mineUrl.collectedcinemalist).useParas(...this.otherParas).useHeaders(...this.otherHeaders);
  }

  /***/
  static mineOrder() {
    return this.instance().mineOrder();
  }

  static mineFavoriteCinema() {
    return this.instance().mineFavoriteCinema();
  }

  static mineFavorite() {
    return this.instance().mineFavorite();
  }
}

export default JNetworkMine;
