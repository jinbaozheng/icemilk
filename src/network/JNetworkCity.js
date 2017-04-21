/**
 * Created by cuppi on 2016/11/30.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {cityUrl} from '../constant/JUrlList';

class NetworkCityManager {
  /**
   *  获取城市列表（可以选择用定位）
   * @returns {*}
   */
  static cityListShouldLocation() {
    return NetworkManager.POST(cityUrl.jbzCities, {...NetworkManager.locationParas()});
  }

  /**
   *  获取当前城市（需要定位）
   *  @param location 定位信息（可空）
   * @returns {*}
   */
  static cityCurrentCityNeedLocation(location) {
    if (location) {
      return NetworkManager.POST(cityUrl.jbzCurrentLocation, location);
    }
    return NetworkManager.POST(cityUrl.jbzCurrentLocation, {...NetworkManager.locationParas()});
  }
}

export default NetworkCityManager;
