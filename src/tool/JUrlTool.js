/**
 * Created by cuppi on 2016/12/14.
 */

class UrlTool {

  /**
   * 自合 URL
   * @param baseUrl
   * @param subUrl
   * @param parameters
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
