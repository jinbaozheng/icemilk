/**
 * Created by cuppi on 2016/12/14.
 */

class UrlTool {
  /**
   * 合成URL完整地址
   * @param baseUrl 基础地址
   * @param subUrl 相对地址
   * @param parameters 参数
   * @returns {*}
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
}

export default UrlTool;
