/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';
import axios from 'axios';
import UrlTool from '../tool/JToolUrl.js';

class NetworkManager {
  static baseUrl = '';
  static timeout = 10 * 1000;
  static delegate = null;
  static inType = '';

  /**
   *  需要定位的请求的公共参数
   * @returns {{cityId: number, longitude: number, latitude: number}} 公共参数
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

  static loginParas() {
    if (this.delegate) {
      let loginParas = this.delegate.loginParas();
      if (loginParas && loginParas.hasAccount) {
        return {
          sessionId: loginParas.sessionId,
          openId: loginParas.mobile,
          mobile: loginParas.mobile,
          hasAccount: true
        };
      }
    }
    return {
      hasAccount: false
    };
  }

  // static inType(){
  //   return this.delegate.inType();
  // }

  // static inType() {
  //   let intype = '';
  //   // if (Platform.OS === 'android'){
  //   //     intype = 'DPANDROID';
  //   // }
  //   return intype;
  // }

  static failedAuthorizationNetwork(){
    return new Promise((resolve, reject) => {
      reject(new Error('authorization error'));
    });
  }

  static unrealizedMethod(){
    return new Promise((resolve, reject) => {
      reject(new Error('unrealized method'));
    });
  }

  static wrongInType(){
    return new Promise((resolve, reject) => {
      reject(new Error('the inType is not exist, please check your inType property in JBZConfig'));
    });
  }

  /**
   * 包裹可取消的请求 （使用fetch请求时使用，目前通过axios请求，无需使用）
   * @param promise 异步请求块
   * @returns {*} 被包裹后的异步请求块
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

  /**
   * post请求
   * @param url 相对地址
   * @param parameters 地址参数
   * @param headers 头参数
   * @returns {{terminate, then}|*} 异步请求块
   */
  static POST(url, parameters, headers) {
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
   * @param url 相对地址
   * @param parameters 地址参数
   * @param headers 头参数
   * @returns {{terminate, then}|*} 异步请求块
   */
  static GET(url, parameters, headers) {
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

export default NetworkManager;
