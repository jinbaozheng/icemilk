/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';
import axios from 'axios';
import UrlTool from '../tool/JToolUrl.js';

/**
 * 网络请求类
 * @alias network/JNetwork
 */
class JNetwork {

  static baseUrl = '';
  static timeout = 10 * 1000;
  static delegate = null;
  static inType = '';

  /**
   * 需要定位的请求的公共参数
   * @private
   * @returns {*}
   */
  static locationParas() {
    if (this.delegate) {
      let cityParas = this.delegate.cityParas();
      let coordinateParas = this.delegate.coordinateParas();
      return {
        cityId: cityParas.id,
        longitude: coordinateParas.longitude,
        latitude: coordinateParas.latitude
      };
    }
    return {};
  }

  /**
   * 需要登录的请求的公共参数
   * @private
   * @returns {*}
   */
  static loginParas() {
    if (this.delegate && this.delegate.loginParas) {
      return this.delegate.loginParas();
    }
    return {};
  }

  /**
   * 验证失败
   * @private
   * @returns {Promise}
   */
  static failedAuthorizationNetwork() {
    return new Promise((resolve, reject) => {
      reject(new Error('authorization error'));
    });
  }

  /**
   * 不存在的方法
   * @private
   * @returns {Promise}
   */
  static unrealizedMethod() {
    return new Promise((resolve, reject) => {
      reject(new Error('unrealized method'));
    });
  }

  /**
   * 错误类型
   * @private
   * @returns {Promise}
   */
  static wrongInType() {
    return new Promise((resolve, reject) => {
      reject(new Error('the inType is not exist, please check your inType property in JBZConfig'));
    });
  }

  /**
   * 包裹可取消的请求 （使用fetch请求时使用，目前通过axios请求，无需使用）
   * @private
   * @param promise 异步请求块
   * @returns {Promise} 被包裹后的异步请求块
   */
  static wrapCancelablePromise(promise) {
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then((val) => hasCanceled_
        ? () => {
        }
        : resolve(val), () => {
        // 不写会有警告
      });
      promise.catch((error) => hasCanceled_
        ? () => {
        }
        : reject(error));
    });
    return {
      terminate () {
        hasCanceled_ = true;
      },
      then (resolve, reject) {
        return wrappedPromise.then(resolve, reject);
      }
    };
  }

  /***
   * 检查是否配置SDK
   * @private
   */
  static checkConfigBaseUrl() {
    if (!this.baseUrl || this.baseUrl === '') {
      console.log('please check if you have config baseUrl for SDK');
      throw Error('Not Config');
    }
  }

  /**
   * post请求
   * @param {string} url 相对地址
   * @param {object} parameters 地址参数
   * @param {object} headers 头参数
   * @returns {Promise} 异步请求块
   */
  static POST(url, parameters, headers) {
    this.checkConfigBaseUrl();
    let isOk;
    return this.wrapCancelablePromise(new Promise((resolve, reject) => {
      let iHeaders = Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, headers);
      if (headers) {
        // console.log(iHeaders)
      }
      console.log('POST ' + UrlTool.urlFromPortion(this.baseUrl, url, parameters));
      axios(url, {
        timeout: this.timeout,
        method: 'post',
        baseURL: this.baseUrl,
        headers: iHeaders,
        params: {...parameters, inType: this.inType}
      }).then((response) => {
        isOk = response.status === 200;
        return response.data;
      }).then((responseJson) => {
        if (isOk) {
          if (!responseJson.errorCode) {
            resolve(responseJson.data);
          } else {
            let errorCode = responseJson.errorCode;
            if (responseJson.errorCode === 10022) {
              reject(new Error('NotLogin'));
            } else {
              reject(new Error(responseJson.message));
            }
          }
        } else {
          reject(responseJson);
        }
      }).catch(error => {
        // 请求超时
        if (error.message.indexOf('timeout' !== -1)) {
          reject(new Error('请求超时, 请稍后重试'));
        } else {
          reject(error);
        }
      });
    }));
  }

  /**
   * get请求
   * @param {string} url 相对地址
   * @param {string} parameters 地址参数
   * @param {string} headers 头参数
   * @returns {Promise} 异步请求块
   */
  static GET(url, parameters, headers) {
    this.checkConfigBaseUrl();
    let isOk;
    return this.wrapCancelablePromise(new Promise((resolve, reject) => {
      let iHeaders = Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, headers);
      if (headers) {
        // console.log(iHeaders)
      }
      console.log('GET ' + UrlTool.urlFromPortion(this.baseUrl, url, parameters));
      axios(url, {
        timeout: this.timeout,
        method: 'get',
        baseURL: this.baseUrl,
        headers: iHeaders,
        params: {...parameters, inType: this.inType}
      }).then((response) => {
        isOk = response.status === 200;
        return response.data;
      }).then((responseJson) => {
        if (isOk) {
          if (!responseJson.errorCode) {
            resolve(responseJson.data);
          } else {
            if (responseJson.errorCode === 10022) {
              reject(new Error('NotLogin'));
            } else {
              reject(new Error(responseJson.message));
            }
          }
        } else {
          reject(responseJson);
        }
      }).catch(error => {
        // 请求超时
        if (error.message.indexOf('timeout' !== -1)) {
          reject(new Error('请求超时, 请稍后重试'));
        } else {
          reject(error);
        }
      });
    }));
  }
}

export default JNetwork;
