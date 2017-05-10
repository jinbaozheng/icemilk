/**
 * Created by cuppi on 2017/4/14.
 */
import NetworkManager from './JNetwork';
class NetworkConfig {
  static setConfig(config){
    NetworkManager.baseUrl = config.baseUrl;
    NetworkManager.inType = config.inType;
    NetworkManager.delegate = config.delegate;
  }
}

export default NetworkConfig;
