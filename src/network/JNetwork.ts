/**
 * Created by cuppi on 2016/11/22.
 */


'use strict';
import INetworkDelegate from "../interface/INetworkDelegate";
import JRequester from './JRequester';
import CancelPromiseFactory, {JPromise} from '../factory/CancelPromiseFactory';
import INetworkConfig, {DEFAULT_CONFIG} from '../interface/INetworkConfig';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {jgetGlobalValue} from './JNetworkFunc';
import JNetworkGroup from './JNetworkGroup';
import JNetworkError from './JNetworkError';
import INetworkFetch from '../interface/INetworkFetch'
import INetworkExtra from '../interface/INetworkExtra'

let INSTANCE_COUNT = 0;

/** @module network*/

/**
 * 网络请求类
 * @hideconstructor
 */
class JNetwork implements INetworkFetch, INetworkExtra{
    static _instance: any;
    readonly config: INetworkConfig = DEFAULT_CONFIG;
    readonly baseUrl: string;
    readonly delegate: INetworkDelegate;
    readonly carryData: object | Function;
    readonly axiosConfig: AxiosRequestConfig;
    readonly instanceId: number;
    private readonly groupList: Array<JNetworkGroup> = [];
    extraParas: Array<string|object> = [];
    extraHeaders: Array<string|object> = [];

    constructor(config: INetworkConfig = DEFAULT_CONFIG){
        config = {...DEFAULT_CONFIG, ...config};
        this.baseUrl = config.baseUrl;
        this.delegate = config.delegate;
        this.carryData = config.carryData;
        this.axiosConfig = config.axiosConfig || {
            timeout: 10 * 1000
        };
        this.config = config;
        this.instanceId = ++INSTANCE_COUNT;
        return this;
    }

    static useParas(...paras: Array<string|object>): JNetwork{
        let instance = new this();
        instance.extraParas = paras;
        return instance;
    }

    static useHeaders(...headers: Array<string|object>): JNetwork{
        let instance = new this();
        instance.extraHeaders = headers;
        return instance;
    }

    useParas(...paras: Array<string|object>): JNetwork {
        this.extraParas = paras;
        return this;
    }

    useHeaders(...headers: Array<string|object>): JNetwork {
        this.extraHeaders = headers;
        return this;
    }

    static instance(): JNetwork {
        return new this();
    }

    static defaultInstance(): JNetwork {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    createGroup(options?){
        options = {
            ...{
                notClearExtraData: false,
                isSync: false
            },
            ...options
        };
        let group = new JNetworkGroup(this.baseUrl, this.getCarryData(), this.axiosConfig, this.delegate, {
            freezeParas: this.extraParas,
            freezeHeaders: this.extraHeaders,
            isSync: options.isSync
        });
        if (!options.notClearExtraData){
            this.clearExtraData();
        }
        this.groupList.push(group);
        return group;
    }

    clearGroup(){
        // TODO: 冻结每组活动
        this.groupList.splice(0);
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

    clearExtraData(){
        this.extraParas = [];
        this.extraHeaders = [];
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
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError> {
        let extraParas = this.extraParas;
        let extraHeaders = this.extraHeaders;
        this.clearExtraData();
        let isOk;
        const delegate = this.delegate;
        headers = Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }, headers);

        let globalOtherParas = {};
        extraParas.forEach(key => {
            if (typeof key == "object"){
                globalOtherParas = {...globalOtherParas, ...key};
                return;
            }
            if (!delegate) return;
            globalOtherParas = {...jgetGlobalValue(key, delegate.globalParas)}
        });
        let globalOtherHeaders = {};
        extraHeaders.forEach(key => {
            if (typeof key == "object"){
                globalOtherHeaders = {...globalOtherHeaders, ...key};
                return;
            }
            if (!delegate) return;
            globalOtherHeaders = {...jgetGlobalValue(key, delegate.globalHeaders)}
        });
        let request: JRequester = JRequester.create(
            method,
            baseUrl,
            url,
            {...parameters, ...globalOtherParas},
            {...headers, ...globalOtherHeaders},
            {...this.axiosConfig, ...otherObject},
            delegate
        );
        return CancelPromiseFactory.createJPromise((resolve, reject) => {
            request.request().then((response: AxiosResponse) => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(new JNetworkError(response.statusText, response.status));
                }
            }).catch(error => {
                reject(error);
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
    static freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError> {
        return this.instance().freedomPOST(baseUrl, url, parameters, headers, otherObject)
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
    static freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError> {
        return this.instance().freedomGET(baseUrl, url, parameters, headers, otherObject)
    }

    /**
     * post请求
     * @param {string} url 相对地址
     * @param {object} parameters 地址参数
     * @param {object} headers 头参数
     * @param {object} otherObject 其他参数
     * @returns {Promise} 异步请求块
     */
    static POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError> {
        return this.instance().POST(url, parameters, headers, otherObject)
    }

    /**
     * get请求
     * @param {string} url 相对地址
     * @param {object} parameters 地址参数
     * @param {object} headers 头参数
     * @param {object} otherObject 其他参数
     * @returns {Promise} 异步请求块
     */
    static GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError> {
        return this.instance().GET(url, parameters, headers, otherObject)
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

    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError> {
        return this.fetchRequest('post', baseUrl, url || '', parameters || {}, headers || {}, otherObject || {});
    }

    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError> {
        return this.fetchRequest('get', baseUrl, url || '', parameters || {}, headers || {}, otherObject || {});
    }

    POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError> {
        return this.freedomPOST(this.baseUrl, url, {
            ...this.getCarryData(),
            ...parameters
        }, headers, {...this.axiosConfig, ...otherObject})
    }

    GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError> {
        return this.freedomGET(this.baseUrl, url, {
            ...this.getCarryData(),
            ...parameters
        }, headers, {...this.axiosConfig, ...otherObject})
    }
}

export default JNetwork;
