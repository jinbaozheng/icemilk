/**
 * Created by cuppi on 2016/12/1.
 */
'use strict';
import JNetwork from './JNetwork';
import {otherUrl} from '../unify/JUrlList';
import _ from '../unify/JDataUnify';
import JNetworkRoot from './JNetworkRoot'

/**
 * 其他接口
 * @memberOf module:network
 */
class JNetworkOther extends JNetworkRoot{
  /**
   * 搜索
   * @param cityId 城市Id
   * @param searchKey 关键字
   * @param nextPageFirstKey 下一页的句柄
   * @returns {Promise}
   */
  search(cityId, searchKey, nextPageFirstKey) {
    if (cityId) {
      return new Promise((resolve, reject) => {
        this.prefixPromise(otherUrl.jbzSearch, {
          cityId,
          queryStr: searchKey,
          lastKey: nextPageFirstKey
        }).then(data => {
          resolve(_('otherUrl.jbzSearch', data));
        }, error => {
          reject(error);
        });
      })
    } else {
      return new Promise((resolve, reject) => {
        this.prefixPromise(otherUrl.jbzSearch, {
          queryStr: searchKey,
          lastKey: nextPageFirstKey
        }).then(data => {
          resolve(_('otherUrl.jbzSearch', data));
        }, error => {
          reject(error);
        });
      })
    }
  }

  /**
   * 热搜词汇
   * @returns {{terminate, then}|*}
   */
  hotSearchKeyword() {
    return this.prefixPromise(otherUrl.jbzHotSearchKeyword);
  }

  /**
   * 广告接口
   * @param location 广告使用地点
   * @param cityId 当前城市
   * @returns {Promise}
   */
  otherBanners(location, cityId) {
    return new Promise((resolve, reject) => {
      return this.prefixPromise(otherUrl.jbzBanners, {
        location, cityId
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
  banners(position, cityId){
    return this.prefixPromise(position, cityId);
  }

  static search(cityId, searchKey, nextPageFirstKey) {
    return this.instance().search(cityId, searchKey, nextPageFirstKey);
  }

  static hotSearchKeyword() {
    return this.instance().hotSearchKeyword();
  }

  static otherBanners(location, cityId) {
    return this.instance().otherBanners(location, cityId);
  }

  static banners(position, cityId){
    return this.instance().banners(position, cityId);
  }
}

export default JNetworkOther;
