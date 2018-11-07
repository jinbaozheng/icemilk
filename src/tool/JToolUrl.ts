/**
 * Created by cuppi on 2016/12/14.
 */

import UrlRefex from 'url-regex';
import UrlPattern from 'url-pattern';

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

  /** *********  待完善接口  ************ **/
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

  /**
   * 分析Url并解析为对象结构
   * @param url 待分析Url
   * @param options 分析Url配置
   * @return Promise<object> 参数为解析后的结果，url无效时返回Null
   */
  static portionFromUrl(url, options?){
    return new Promise((resolve, reject) => {
      try {
        let isUrl = UrlRefex().test(url);
        if (isUrl){
          let portionData = (new UrlPattern(/^(http(s):\/\/)([\w.-]*)(:([0-9]*))?((\/[\w.-]*)+)?(\?([\w-=&]*))?#?\/?((([\w-]*(\/)?)+)?(\?(.*))?)?/,
            ['protocol', '', 'host', '', 'port', 'path', '', '', 'query', 'hash', 'hashpath', '', '', '', 'hashquery'])).match(url);

          if (options && options.complete){
            console.log(portionData.host)
            let hrefPortion = (new UrlPattern(``, {
              segmentValueCharset: 'a-zA-Z0-9-_~ %/'
            })).match(portionData.host)
            portionData = {...portionData, ...hrefPortion};
          }
          resolve(portionData)
        } else {
          resolve(null)
        }
      } catch (e) {
        console.log(e);
        reject(new Error('解析失败'));
      }
    })
  }
}

export default UrlTool;
