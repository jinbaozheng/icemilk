/**
 * Created by cuppi on 2017/4/14.
 */
import NetworkManager from './JNetwork';
import {UseConfig as UrlUseConfig} from '../unify/JUrlList'
import {UseConfig as DataUseConfig} from '../unify/JDataUnify'

/**
 * 请求配置类
 * @alias network/JNetworkConfig
 */
class JNetworkConfig {
  static setConfig(config){
    NetworkManager.baseUrl = config.baseUrl;
    NetworkManager.inType = config.inType;
    NetworkManager.delegate = config.delegate;
    if (config.inType){
      UrlUseConfig(config.inType);
      DataUseConfig(config.inType);
    } else {
        console.log('Didn\'t find out the inType value, do you forget the inType at config ?')
    }
  }
}

export default JNetworkConfig;
