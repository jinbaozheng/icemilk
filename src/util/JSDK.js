/**
 * Created by cuppi on 2017/4/19.
 */

import packageInfo from '../../package.json';

class JSDK {
  static version() {
    return packageInfo.version;
  }

  static readme(){
    return 'https://git.oschina.net/cuppi/jbzwebsdk/raw/master/JBZWebSDK%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-JNetwork.pdf';
  }

  static readmemd(){
    return 'https://git.oschina.net/cuppi/jbzwebsdk/blob/master/JBZWebSDK%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-JNetwork.md';
  }
}

export default JSDK;
