/**
 * Created by cuppi on 2016/11/22.
 */


'use strict';
import JNetworkDelegate from "../delegate/JNetworkDelegate";
import JRequester from './JRequester';
import CancelPromiseFactory, {JPromise} from '../factory/CancelPromiseFactory';
import JNetworkConfig from './JNetworkConfig';
import {AxiosResponse} from 'axios';

let INSTANCE_COUNT = 0

const GET_GLOBAL_VALUE = (key, globalValueRegistry) => {
    let otherParas = {};
    if (!globalValueRegistry){
        throw new Error('未找到全局参数，请确认是否设置globalParas');
    }
    let globalParaFunc = null;
    if (typeof globalValueRegistry == "function"){
        globalParaFunc = globalValueRegistry()[key];
    } else if (typeof globalValueRegistry == "object") {
        globalParaFunc = globalValueRegistry[key];
    }

    if (globalParaFunc){
        let globalPara:any|string|number = null;
        if (typeof globalParaFunc == "function"){
            globalPara = globalParaFunc();
        } else {
            globalPara = globalParaFunc;
        }
        if (typeof globalPara == "object"){
            otherParas = {...otherParas, ...globalPara};
        } else if (typeof globalPara === 'string' || typeof globalPara === 'number'){
            otherParas[key] = globalPara;
        } else {
            throw new Error(`全局变量类型不正确:${key}`);
        }
    } else {
        throw new Error(`不存在的全局变量:${key}`);
    }
    return otherParas;
}
/** @module network*/

/**
 * 网络请求类
 * @hideconstructor
 */
class JNetwork{
    static _instance: any;
    readonly config = JNetworkConfig.DEFAULT_CONFIG
    readonly baseUrl: string;
    readonly delegate: JNetworkDelegate;
    readonly carryData: object | Function;
    readonly timeout: number;
    readonly instance_id: number;

    otherParas: Array<string|object> = [];
    otherHeaders: Array<string|object> = [];

    constructor(config: JNetworkConfig = JNetworkConfig.DEFAULT_CONFIG){
        config = {...JNetworkConfig.DEFAULT_CONFIG, ...config};
        this.baseUrl = config.baseUrl;
        this.delegate = config.delegate;
        this.carryData = config.carryData;
        this.timeout = config.timeout;
        this.config = config;
        this.instance_id = ++INSTANCE_COUNT;
        return this;
    }

    static useParas(...paras: Array<string|object>){
        let instance = JNetwork.call(this);
        instance.otherParas = paras;
        return instance;
    }

    static useHeaders(...headers: Array<string|object>) {
        let instance = new this();
        instance.otherHeaders = headers;
        return instance;
    }

    useParas(...paras: Array<string|object>): JNetwork {
        this.otherParas = paras;
        return this;
    }

    useHeaders(...headers: Array<string|object>): JNetwork {
        this.otherHeaders = headers;
        return this;
    }

    static instance(): JNetwork {
        if (!this._instance) {
            this._instance = new this();
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
     * 普通异常
     * @param {error} errorMessage
     * @param {number} code
     * @returns {Error}
     */
    static generalError(errorMessage: string, code: number): Error {
        let resultError: Error = new Error(errorMessage);
        Reflect.defineProperty(resultError, 'errorCode', {value: code});
        return resultError;
    }

    /**
     * 没有登录异常
     * @param code
     * @returns {any}
     */
    static notLoginError(code: number): Error {
        let error: Error = new Error('NotLogin');
        Reflect.defineProperty(error, 'errorCode', {value: code});
        return error;
    }

    /**
     * 包裹可取消的请求 （使用fetch请求时使用，目前通过axios请求，无需使用）
     * @private
     * @param promise 异步请求块
     * @returns {Promise} 被包裹后的异步请求块
     */
    static wrapCancelablePromise(promise: Promise<any>): JPromise<any> {
        return CancelPromiseFactory.createJPromise(promise);
    }

    /***
     * 检查是否配置SDK
     * @private
     */
    checkConfigBaseUrl() {
        if (!this.baseUrl || this.baseUrl === '') {
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
     * @returns {CancelPromiseFactory<any>}
     */
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<any> {
        let otherParas = this.otherParas;
        let otherHeaders = this.otherHeaders;
        this.otherParas = [];
        this.otherHeaders = [];
        let isOk;
        const delegate = this.delegate;

        headers = Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }, headers);

        let globalOtherParas = {};
        otherParas.forEach(key => {
            if (typeof key == "object"){
                globalOtherParas = {...globalOtherParas, ...key};
                return;
            }
            if (!delegate) return;
            globalOtherParas = {...GET_GLOBAL_VALUE(key, delegate.globalParas)}
        });
        let globalOtherHeaders = {};
        otherHeaders.forEach(key => {
            if (typeof key == "object"){
                globalOtherHeaders = {...globalOtherHeaders, ...key};
                return;
            }
            if (!delegate) return;
            globalOtherHeaders = {...GET_GLOBAL_VALUE(key, delegate.globalHeaders)}
        });
        let request: JRequester = JRequester.create(
            method,
            baseUrl,
            url,
            {...parameters, ...globalOtherParas},
            {...headers, ...globalOtherHeaders},
            {timeout: this.timeout, ...otherObject},
            delegate
        );
        return CancelPromiseFactory.createJPromise((resolve, reject) => {
            let isOk = false;
            let _response = null;
            request.request().then((response: AxiosResponse) => {
                isOk = response.status === 200;
                _response = response;
                return response.data;
            }).then((responseJson: { errorCode: number, data: any, message: string }) => {
                if (isOk) {
                    if (!responseJson.errorCode) {
                        if (delegate && delegate.resolveInterceptor){
                            if (delegate.resolveInterceptor(_response, responseJson.data)){
                                resolve(responseJson.data);
                            }
                        } else {
                            resolve(responseJson.data);
                        }
                    } else {
                        if (delegate && delegate.rejectInterceptor){
                            if (delegate.rejectInterceptor(_response, JNetwork.generalError(responseJson.message, responseJson.errorCode))) {
                                reject(JNetwork.generalError(responseJson.message, responseJson.errorCode));
                            }
                        } else {
                            reject(JNetwork.generalError(responseJson.message, responseJson.errorCode));
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
        })
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
    static freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
        return this.instance().freedomPOST.apply(this._instance, Array.from(arguments))
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
    static freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
        return this.instance().freedomGET.apply(this._instance, Array.from(arguments))
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
        return this.instance().POST.apply(this._instance, Array.from(arguments))
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
        return this.instance().GET.apply(this._instance, Array.from(arguments))
    }

    getCarryData(): object{
        let carryData: object = null;
        if (this.carryData){
            if (typeof this.carryData == "function"){
                carryData = this.carryData();
            }
            if (typeof this.carryData == "object"){
                carryData = this.carryData;
            }
        }
        return carryData || {};
    }

    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
        return this.fetchRequest('post', baseUrl, url || '', parameters || {}, headers || {}, otherObject || {});
    }

    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
        return this.fetchRequest('get', baseUrl, url || '', parameters || {}, headers || {}, otherObject || {});
    }

    POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
        return this.freedomPOST(this.baseUrl, url, {
            ...this.getCarryData(),
            ...parameters
        }, headers, {timeout: this.timeout, ...otherObject})
    }

    GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any> {
        return this.freedomGET(this.baseUrl, url, {
            ...this.getCarryData(),
            ...parameters
        }, headers, {timeout: this.timeout, ...otherObject})
    }
}

export default JNetwork;
