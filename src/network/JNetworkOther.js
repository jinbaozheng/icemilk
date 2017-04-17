/**
 * Created by cuppi on 2016/12/1.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {otherUrl} from '../constant/JUrlList';

class NetworkOtherManager {
  /**
   * 搜索
   * @param val 关键字
   * @param lastKey 目前无用
   * @returns {{terminate, then}|*}
   */
  static search(val, lastKey) {
    // if (GlobalConstant.store.state.rootStore.location.hasLocation) {
    return NetworkManager.post(otherUrl.search, {
      ...NetworkManager.locationParas(),
      queryStr: val,
      lastKey: lastKey
    });
    // } else {
    //   return NetworkManager.post(otherUrl.search, {
    //     cityId: GlobalConstant.store.state.rootStore.userLocationCity.id,
    //     queryStr: val,
    //     lastKey: lastKey
    //   });
    // }
  }

  static searchSearch(cityId, query, lastKey) {
    return NetworkManager.post(otherUrl.search, {
      cityId: cityId,
      query: query,
      lastKey: lastKey
    });
  }

  /**
   * 热搜词汇
   * @returns {{terminate, then}|*}
   */
  static hotQuery() {
    return NetworkManager.post(otherUrl.hotquery);
  }

  /**
   * 广告接口
   * @returns {{terminate, then}|*}
   */
  static bannersNeedCItyIdNeedLocation() {
    return NetworkManager.post(otherUrl.banner, {
      cityId: NetworkManager.loginParas().cityId
    });
  }

  static pageBanners() {
    return NetworkManager.post(otherUrl.pagebanners, {})
  }
}

export default NetworkOtherManager;
