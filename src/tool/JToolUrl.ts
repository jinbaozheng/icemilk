/**
 * Created by cuppi on 2016/12/14.
 */

/**
 * 网络地址工具类
 * @memberOf module:tool
 */
class UrlTool {
  /**
   * 合成URL完整地址
   * @param {string} baseUrl 基础地址
   * @param {string} subUrl 相对地址
   * @param {string} parameters 参数
   * @returns {string} 返回拼接后的地址
   */
  static urlFromPortion(baseUrl, subUrl, parameters) {
    if (!parameters) {
      parameters = {};
    }
    let paras = [];
    for (let key in parameters) {
      if (!parameters.hasOwnProperty(key)) {
        continue;
      }
      if (parameters[key] !== undefined) {
        paras.push(key + '=' + parameters[key]);
      }
    }
    let iUrl = baseUrl + subUrl;
    if (paras.length > 0) {
      iUrl = iUrl + '?' + paras.join('&');
    }
    return iUrl;
  }

  /***********  待完善接口  **************/
  /**
   *
   * @param name
   * @returns {*}
   */
  // static getUrlQuery(name) {
  //   let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  //   let result = window.location.search.substr(1).match(reg);
  //   let inType = result ? decodeURIComponent(result[2]) : null;
  //   return inType;
  // }

  // static getNowUrl() {
  //   let nowUrl = window.location.href;
  //   nowUrl = nowUrl.substring(0, nowUrl.indexOf('#/'));
  //   return nowUrl
  // }
}

export default UrlTool;
