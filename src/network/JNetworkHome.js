/**
 * Created by cuppi on 2016/11/25.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {homeUrl} from '../constant/JUrlList';

class NetworkHomeManager {
  /**
   * 获取主页 （需要定位）
   * @returns {*}
   */
  static homeMainPageNeedLocation() {
    return NetworkManager.post(homeUrl.main, {...NetworkManager.locationParas()});
  }
}

export default NetworkHomeManager;
