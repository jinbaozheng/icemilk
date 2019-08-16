'use strict';
import INetworkDelegate from "../interface/INetworkDelegate";
import JRequester from './JRequester';
import CancelPromiseFactory from '../factory/CancelPromiseFactory';
import INetworkConfig, {DEFAULT_CONFIG} from '../interface/INetworkConfig';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {jgetGlobalValue} from './JNetworkFunc';
import JNetworkGroup from './JNetworkGroup';
import JNetworkError from './JNetworkError';
import INetworkFetch from '../interface/INetworkFetch'
import INetworkExtra from '../interface/INetworkExtra'
import INetworkOtherOption from '../interface/INetworkOtherOption'
import INetworkGroupOption from '../interface/INetworkGroupOption'
import {INetworkStandardPromiseType} from "../../types";
import JNetworkRoot from "./JNetworkRoot";
import JToolObject from '../tool/JToolObject';

const DEFAULT_NETWORK_OTHER_OPTION = {
    notTransformData: false
} as INetworkOtherOption;

const DEFAULT_NETWORK_GROUP_OPTION = {
    notClearExtraData: false,
    isSync: false,
    groupClass: JNetworkGroup
} as INetworkGroupOption<JNetworkGroup>;

let INSTANCE_COUNT = 0;

/**
 * 网络请求类
 */
class JNetwork extends JNetworkRoot implements INetworkFetch, INetworkExtra{
    static _instance: any;
    readonly config: INetworkConfig = DEFAULT_CONFIG;
    readonly baseUrl: string;
    readonly delegate: INetworkDelegate;
    readonly carryParams: object | Function;
    readonly carryHeaders: object | Function;
    readonly carryBodyData: object | Function;
    readonly axiosConfig: AxiosRequestConfig;
    readonly otherContent: object;
    readonly instanceId: number;
    private readonly groupList: Array<JNetworkGroup> = [];

    constructor(config: INetworkConfig = DEFAULT_CONFIG){
        super();
        config = {...DEFAULT_CONFIG, ...config};
        this.baseUrl = config.baseUrl;
        this.delegate = config.delegate || null;
        this.carryParams = config.carryParams || {};
        this.carryHeaders = config.carryHeaders || {};
        this.carryBodyData = config.carryBodyData || {};
        this.axiosConfig = config.axiosConfig || {
            timeout: 10 * 1000
        };
        this.otherContent = config.otherContent;
        this.config = config;
        this.instanceId = ++INSTANCE_COUNT;
        return this;
    }

    static useParams(...params: Array<string|object>): JNetwork{
        let instance = this.defaultInstance();
        instance.extraParams = params;
        return instance;
    }

    static useHeaders(...headers: Array<string|object>): JNetwork{
        let instance = this.defaultInstance();
        instance.extraHeaders = headers;
        return instance;
    }

    static useBodyData(...bodyData: Array<string|object>): JNetwork {
        let instance = this.defaultInstance();
        instance.extraBodyData = bodyData;
        return instance;
    }

    static instance(config: INetworkConfig = DEFAULT_CONFIG): JNetwork {
        return new JNetwork(config);
    }

    static defaultInstance(): JNetwork {
        if (!this._instance) {
            this._instance = new JNetwork();
        }
        return this._instance;
    }

    public pickInjectParams(): object{
        return {
            ...JToolObject.getObjOrFuncResult(this.carryParams),
            ...jgetGlobalValue(this.extraParams, this.delegate, _ => _.globalParams)
        }
    }

    public pickInjectHeaders(): object{
        return {
            ...JToolObject.getObjOrFuncResult(this.carryHeaders),
            ...jgetGlobalValue(this.extraHeaders, this.delegate, _ => _.globalHeaders)
        }
    }

    public pickInjectBodyData(): object{
        return {
            ...JToolObject.getObjOrFuncResult(this.carryBodyData),
            ...jgetGlobalValue(this.extraBodyData, this.delegate, _ => _.globalBodyData)
        }
    }

    public createGroup<T extends JNetworkGroup>(options?: INetworkGroupOption<T>): T{
        options = {
            ...DEFAULT_NETWORK_GROUP_OPTION,
            ...options
        };
        if (options.groupClass !== JNetworkGroup && !JNetworkGroup.isPrototypeOf(options.groupClass)){
            throw new Error(`${options.groupClass.name} is not extends of class JNetworkGroup, please extends class JNetworkGroup`);
        }
        let group = new (options.groupClass)(this.baseUrl, this.axiosConfig, this.delegate, {
            freezeParams: this.extraParams,
            freezeHeaders: this.extraHeaders,
            freezeBodyData: this.extraBodyData,
            freezeCarryParams: JToolObject.getObjOrFuncResult(this.carryParams),
            freezeCarryHeaders: JToolObject.getObjOrFuncResult(this.carryHeaders),
            freezeCarryBodyData: JToolObject.getObjOrFuncResult(this.carryBodyData),
            isSync: options.isSync
        }) as T;
        if (!options.notClearExtraData){
            this.clearExtraData();
        }
        this.groupList.push(group);
        return group;
    }

    public clearGroup(){
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
     * @param bodyData data参数
     * @param headers 头参数
     * @param otherObject 其他相关设置
     * @returns {CancelPromiseFactory<any>}
     */
    fetchRequest(method: string,
                 baseUrl: string,
                 url: string,
                 parameters: object,
                 bodyData: object,
                 headers: object,
                 otherObject: INetworkOtherOption = DEFAULT_NETWORK_OTHER_OPTION
    ): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        let carryParams: object = JToolObject.getObjOrFuncResult(this.carryParams);
        let carryHeaders: object = JToolObject.getObjOrFuncResult(this.carryHeaders);
        let carryBodyData: object = JToolObject.getObjOrFuncResult(this.carryBodyData);
        let isOk;
        const delegate = this.delegate;
        let globalOtherParams = this.pickInjectParams();
        let globalOtherHeaders = this.pickInjectHeaders();
        let globalOtherBodyData = this.pickInjectBodyData();
        this.clearExtraData();
        let request: JRequester = JRequester.create(
            method,
            baseUrl,
            url,
            {...carryParams, ...globalOtherParams, ...parameters},
            otherObject.notTransformData ? bodyData : {...carryBodyData,  ...globalOtherBodyData, ...bodyData},
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                ...carryHeaders,
                ...globalOtherHeaders,
                ...headers
            },
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
    static freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.defaultInstance().freedomPOST(baseUrl, url, parameters, headers, otherObject)
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
    static freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.defaultInstance().freedomGET(baseUrl, url, parameters, headers, otherObject)
    }

    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.fetchRequest('post', baseUrl, url || '', parameters || {}, {},headers || {}, otherObject || DEFAULT_NETWORK_OTHER_OPTION);
    }

    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.fetchRequest('get', baseUrl, url || '', parameters || {},{},headers || {}, otherObject || DEFAULT_NETWORK_OTHER_OPTION);
    }

    POST(url: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.freedomPOST(this.baseUrl, url, parameters, headers, {...this.axiosConfig, ...otherObject});
    }

    GET(url: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.freedomGET(this.baseUrl, url, parameters, headers, {...this.axiosConfig, ...otherObject})
    }

    freedomDataPOST(baseUrl: string, url?: string, bodyData?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>{
        return this.fetchRequest('post', baseUrl, url || '', {}, bodyData || {}, headers || {}, otherObject || DEFAULT_NETWORK_OTHER_OPTION);
    }

    freedomDataGET(baseUrl: string, url?: string, bodyData?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>{
        return this.fetchRequest('get', baseUrl, url || '', {}, bodyData || {}, headers || {}, otherObject || DEFAULT_NETWORK_OTHER_OPTION);
    }

    dataPOST( url?: string, bodyData?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>{
        return this.freedomDataPOST(this.baseUrl, url,  bodyData, headers, {...this.axiosConfig, ...otherObject});
    }

    dataGET(url?: string, bodyData?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>{
        return this.freedomDataGET(this.baseUrl, url,  bodyData, headers, {...this.axiosConfig, ...otherObject});
    }
}

export default JNetwork;
