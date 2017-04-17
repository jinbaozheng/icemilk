/**
 * Created by cuppi on 2016/11/30.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {cityUrl} from '../constant/JUrlList';

class NetworkCityManager {
  /**
   *  获取城市列表（需要定位）
   * @returns {*}
   */
  static cityListNeedLocation() {
    return NetworkManager.post(cityUrl.citypage, {...NetworkManager.locationParas()});
  }

  /**
   *  获取当前城市（需要定位）
   * @returns {*}
   */
  static cityCurrentCityNeedLocation(location) {
    if (location) {
      return NetworkManager.post(cityUrl.refreshlocation, {longitude: location.longitude, latitude: location.latitude});
    }
    return NetworkManager.post(cityUrl.refreshlocation, {...NetworkManager.locationParas()});
  }

    /**
     * 获取城市列表
     * @returns {{terminate, then}|*}
     */
    static cityCities() {
        return NetworkManager.post(cityUrl.cities, {});
    }
}

export default NetworkCityManager;
