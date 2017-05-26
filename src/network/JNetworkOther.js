/**
 * Created by cuppi on 2016/12/1.
 */
'use strict';
import JNetwork from './JNetwork.js';
import {otherUrl} from '../unify/JUrlList';
import _ from '../unify/JDataUnify';

/**
 * 其他接口
 * @alias network/JNetworkOther
 */
class JNetworkOther {
  /**
   * 搜索
   * @param cityId 城市Id
   * @param key 关键字
   * @param lastKey 下一页的句柄
   * @returns {{terminate, then}|*}
   */
  static otherSearch(cityId, key, lastKey) {
    if (cityId) {
      // return JNetwork.POST(otherUrl.jbzSearch, {
      //   cityId,
      //   queryStr: key,
      //   lastKey: lastKey
      // });
    } else {
      return JNetwork.POST(otherUrl.jbzSearch, {
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
    return JNetwork.POST(otherUrl.hotquery);
  }

  /**
   * 广告接口
   * @returns {{terminate, then}|*}
   */
  static otherBanners(location, cityId) {
    return new Promise((resolve, reject) => {
      return JNetwork.POST(otherUrl.jbzBanners, {
        location, cityId
      }).then(data => {
        resolve(_('otherUrl.jbzBanners', data));
      }, error => {
        reject(error);
      });
    })
  }
}

export default JNetworkOther;
