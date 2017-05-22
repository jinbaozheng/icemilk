/**
 * Created by cuppi on 2016/12/1.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {otherUrl} from '../unify/JUrlList';
import _ from '../unify/JDataUnify';

class NetworkOtherManager {
  /**
   * 搜索
   * @param cityId 城市Id
   * @param key 关键字
   * @param lastKey 下一页的句柄
   * @returns {{terminate, then}|*}
   */
  static otherSearch(cityId, key, lastKey) {
    if (cityId) {
      // return NetworkManager.POST(otherUrl.jbzSearch, {
      //   cityId,
      //   queryStr: key,
      //   lastKey: lastKey
      // });
    } else {
      return NetworkManager.POST(otherUrl.jbzSearch, {
        queryStr: key,
        lastKey: lastKey
      });
    }
  }

  /**
   * 热搜词汇
   * @returns {{terminate, then}|*}
   */
  static hotQuery() {
    return NetworkManager.POST(otherUrl.hotquery);
  }

  /**
   * 广告接口
   * @returns {{terminate, then}|*}
   */
  static otherBanners(location, cityId) {
    return new Promise((resolve, reject) => {
      return NetworkManager.POST(otherUrl.jbzBanners, {
        location, cityId
      }).then(data => {
        resolve(_('otherUrl.jbzBanners', data));
      }, error => {
        reject(error);
      });
    })
  }
}

export default NetworkOtherManager;
