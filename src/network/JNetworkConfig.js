/**
 * Created by cuppi on 2017/4/14.
 */
import NetworkManager from './JNetwork';
class NetworkConfig {
  static setConfig(obj){
    NetworkManager.baseUrl = obj.baseUrl;
  }

  static setDelegate(delegate){
    NetworkManager.delegate = delegate;
  }
}

export default NetworkConfig;
