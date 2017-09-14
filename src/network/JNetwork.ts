/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';
import axios from 'axios'
import NetworkDelegate from "../delegate/NetworkDelegate";
import JPromise from '../structure/JPromise';

/** @module network*/

/**
 * 网络请求类
 * @hideconstructor
 */
class JNetwork {

  static baseUrl: string = '';
  static delegate: NetworkDelegate = null;
  static inType: string = '';
  static timeout: number = 10 * 1000;
  static _instance: any;

  otherParas: Array<string|object> = [];
  otherHeaders: Array<string|object> = [];

  static useParas(...paras: Array<string|object>) {
    let instance = this.instance();
    instance.otherParas = paras;
    return instance;
  }

  static useHeaders(...headers: Array<string|object>) {
    let instance = this.instance();
    instance.otherHeaders = headers;
    return instance;
  }

  static instance(): any {
    if (!this._instance) {
      this._instance = new this();
      this._instance.test = Math.random();
    }
    return this._instance;
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
   * 没有登录
   * @param code
   * @returns {any}
   */
  static notLoginError(code: number): Error {
    let error: Error = new Error('NotLogin');
    Reflect.defineProperty(error, 'errorCode', {value: code});
    return error;
  }

  /**
   * 错误类型
   * @private
   * @returns {Promise}
   */
  static wrongInType(): Promise<any> {
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
  static wrapCancelablePromise(promise: Promise<any>): JPromise<any> {
    return JPromise.create(promise);
  }

  /***
   * 检查是否配置SDK
   * @private
   */
  checkConfigBaseUrl() {
    if (!JNetwork.baseUrl || JNetwork.baseUrl === '') {
      console.log('please check if you have config baseUrl for SDK');
      // throw Error('Not Config');
    }
  }

  /**
   * 发送请求
   * @param method 方法类型
   * @param baseUrl 基地址
   * @param url 相对地址
   * @param parameters 参数
   * @param headers 头参数
   * @param otherObject 其他相关设置
   * @returns {JPromise<any>}
   */
  fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<any> {
    this.checkConfigBaseUrl();
    let isOk;
    let jpromise = JNetwork.wrapCancelablePromise(new Promise((resolve, reject) => {
      let iHeaders = Object.assign({
        'Accept': 'application/json',
        // TODO: 搞明白
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
      }, headers);
      let jaxios = axios.create({
        method: method,
        timeout: otherObject.timeout,
        params: parameters,
        baseURL: baseUrl,
        headers: iHeaders
      })
      jaxios.interceptors.request.use(config => {
        let otherParas = {};
        jpromise.otherParas.forEach(key => {
          if (typeof key == "object"){
            otherParas = {...otherParas, ...key};
            return;
          }
          let globalParaFunc = JNetwork.delegate.globalParas()[key];
          if (globalParaFunc){
            let globalPara = globalParaFunc();
            if (typeof globalPara == "object"){
              otherParas = {...otherParas, ...globalPara};
            } else if (typeof globalPara == "string" || typeof globalPara == "number"){
              otherParas[key] = globalPara;
            } else {
              console.log('全局变量类型不正确:' + key);
            }
          } else {
            console.log('不存在的全局变量:' + key);
          }
        });
        let otherHeaders = {};
        jpromise.otherHeaders.forEach(key => {
          if (typeof key == "object"){
            otherHeaders = {...otherHeaders, ...key};
            return;
          }
          let globalHeaderFunc = JNetwork.delegate.globalHeaders()[key];
          if (globalHeaderFunc){
            let globalHeader = globalHeaderFunc();
            if (typeof globalHeader == "object"){
              otherHeaders = {...otherHeaders, ...globalHeader};
            } else if (typeof globalHeader == "string" || typeof globalHeader == "number"){
              otherHeaders[key] = globalHeader;
            } else {
              console.log('全局变量类型不正确:' + key);
            }
          } else {
            console.log('不存在的全局变量:' + key);
          }
        });
        config.params = {...config.params, ...otherParas};
        config.headers = {...config.headers, ...otherHeaders};
        return JNetwork.delegate.requestInterceptor(config);
      }, error => {
        return JNetwork.delegate.requestInterceptorError(error);
      });
      jaxios.interceptors.response.use(response => {
        return JNetwork.delegate.responseInterceptor(response);
      }, error => {
        return JNetwork.delegate.responseInterceptorError(error);
      });
      jaxios.post(url).then((response) => {
        isOk = response.status === 200;
        return response.data;
      }).then((responseJson: { errorCode: number, data: any, message: string }) => {
        if (isOk) {
          if (!responseJson.errorCode) {
            resolve(responseJson.data);
          } else {
            let errorCode = responseJson.errorCode;
            if (responseJson.errorCode == 10022) {
              reject(JNetwork.notLoginError(100022));
            } else {
              reject(new Error(responseJson.message));
            }
          }
        } else {
          reject(responseJson);
        }
      }).catch(error => {
        // 请求超时
        if (error.message.indexOf('timeout') != -1) {
          reject(new Error('请求超时, 请稍后重试'));
        } else {
          reject(error);
        }
      });
    }));
    return jpromise;
  }

  /**
   * 高自由度POST方法
   * @param {string} baseUrl 基地址
   * @param {string} url 相对地址
   * @param {object} parameters 地址参数
   * @param {object} headers 头参数
   * @param {object} otherObject 其他可用配置
   * @returns {Promise} 异步请求块
   */
  static freedomPOST(baseUrl, url, parameters, headers, otherObject): JPromise<any> {
    return this.instance().freedomPOST(...arguments)
  }

  /**
   * 高自由度GET方法
   * @param {string} baseUrl
   * @param {string} url
   * @param {object} parameters
   * @param {object} headers
   * @param {object} otherObject
   * @returns {Promise} 异步请求块
   */
  static freedomGET(baseUrl: string, url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
    return this.instance().freedomGET(...arguments)
  }

  /**
   * post请求
   * @param {string} url 相对地址
   * @param {object} parameters 地址参数
   * @param {object} headers 头参数
   * @param {object} otherObject 其他参数
   * @returns {Promise} 异步请求块
   */
  static POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
    return this.instance().POST(...arguments)
  }

  /**
   * get请求
   * @param {string} url 相对地址
   * @param {object} parameters 地址参数
   * @param {object} headers 头参数
   * @param {object} otherObject 其他参数
   * @returns {Promise} 异步请求块
   */
  static GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
    return this.instance().GET(...arguments)
  }


  freedomPOST(baseUrl, url, parameters, headers, otherObject): JPromise<any> {
    return this.fetchRequest('post', baseUrl, url, parameters, headers, otherObject);
  }

  freedomGET(baseUrl: string, url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
    return this.fetchRequest('get', baseUrl, url, parameters, headers, otherObject);
  }

  POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
    return this.freedomPOST(JNetwork.baseUrl, url, {
      ...parameters,
      inType: JNetwork.inType
    }, headers, {timeout: JNetwork.timeout, ...otherObject})
  }

  GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
    return this.freedomGET(JNetwork.baseUrl, url, {
      ...parameters,
      inType: JNetwork.inType
    }, headers, {timeout: JNetwork.timeout, ...otherObject})
  }
}

export default JNetwork;
