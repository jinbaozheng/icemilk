/**
 * Created by cuppi on 2016/12/1.
 */
'use strict';
import JNetwork from './JNetwork.js';
import {otherUrl} from '../unify/JUrlList';
import _ from '../unify/JDataUnify';

/**
 * 其他接口
 * @memberOf module:network
 */
class JNetworkOther {
  /**
   * 搜索
   * @param cityId 城市Id
   * @param searchKey 关键字
   * @param nextPageFirstKey 下一页的句柄
   * @returns {Promise}
   */
  static search(cityId, searchKey, nextPageFirstKey) {
    if (cityId) {
      return JNetwork.POST(otherUrl.jbzSearch, {
        cityId,
        queryStr: searchKey,
        lastKey: nextPageFirstKey
      });
    } else {
      return JNetwork.POST(otherUrl.jbzSearch, {
        queryStr: searchKey,
        lastKey: nextPageFirstKey
      });
    }
  }

  /**
   * 热搜词汇
   * @returns {{terminate, then}|*}
   */
  static hotSearchKeyword() {
    return JNetwork.POST(otherUrl.jbzHotSearchKeyword);
  }

  /**
   * 广告接口
   * @param position 广告使用地点
   * @param cityId 当前城市
   * @returns {Promise}
   */
  static otherBanners(position, cityId) {
    return new Promise((resolve, reject) => {
      return JNetwork.POST(otherUrl.jbzBanners, {
        position, cityId
      }).then(data => {
        resolve(_('otherUrl.jbzBanners', data));
      }, error => {
        reject(error);
      });
    })
  }

  /**+
   * 广告接口
   * @param position 广告使用地点
   * @param cityId 当前城市
   * @returns {Promise}
   */
  static banners(position, cityId){
    return JNetworkOther.otherBanners(position, cityId);
  }
}

export default JNetworkOther;
