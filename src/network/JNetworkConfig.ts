/**
 * Created by cuppi on 2017/4/14.
 */
import NetworkManager from './JNetwork';
import {defaultInterceptor} from "../delegate/NetworkDelegate";

/**
 * 请求配置类
 * @memberOf module:network
 */
class JNetworkConfig {
  static setConfig(config){
    NetworkManager.baseUrl = config.baseUrl;
    NetworkManager.delegate = {...defaultInterceptor, ...config.delegate};
    NetworkManager.carryData = config.carryData;
    let {urlMap, dataMap} = config;
    if (!urlMap || !dataMap){
      console.log('Didn\'t find out the urlMap value or dataMap, do you forget it?')
    } else {
    }
  }
}

export default JNetworkConfig;
