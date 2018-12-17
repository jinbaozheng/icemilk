import {AxiosRequestConfig, AxiosResponse} from "axios";
import JRequester from "./JRequester";
import CancelPromiseFactory from "../factory/CancelPromiseFactory";
import {jgetGlobalValue} from './JNetworkFunc';
import INetworkDelegate from "../interface/INetworkDelegate";
import JNetworkError from './JNetworkError';
import JRequestEngine from '../util/JRequestEngine';
import INetworkFetch from "../interface/INetworkFetch";
import INetworkExtra from "../interface/INetworkExtra";
import {INetworkStandardPromiseType} from "../../types";
let GROUP_COUNT = 0

/**
 * @private
 */
export default class JNetworkGroup implements INetworkFetch, INetworkExtra{
    readonly baseUrl: string;
    readonly carryData: object;
    readonly axiosConfig: AxiosRequestConfig;
    readonly delegate: INetworkDelegate;
    readonly groupId: number;
    readonly isSync: boolean;

    private readonly freezeParas:Array<string|object>;
    private readonly freezeHeaders:Array<string|object>;
    private readonly requestEngine:JRequestEngine = new JRequestEngine();
    extraParas: Array<string|object> = [];
    extraHeaders: Array<string|object> = [];

    useParas(...paras: Array<string|object>): this {
        this.extraParas = paras;
        return this;
    }

    useHeaders(...headers: Array<string|object>): this {
        this.extraHeaders = headers;
        return this;
    }

    constructor(baseUrl: string, carryData: object, axiosConfig: AxiosRequestConfig, delegate: INetworkDelegate, options?:any){
        this.baseUrl = baseUrl;
        this.carryData = carryData;
        this.axiosConfig = axiosConfig;
        this.delegate = delegate;
        this.groupId = ++GROUP_COUNT;
        if (options){
            this.freezeParas = options.freezeParas || {};
            this.freezeHeaders = options.freezeHeaders || {};
            this.isSync = options.isSync;
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
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        let extraParas = [...this.freezeParas, ...this.extraParas];
        let extraHeaders = [...this.freezeHeaders, ...this.extraHeaders];
        this.extraParas = [];
        this.extraHeaders = [];
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
            globalOtherParas = {...globalOtherParas, ...jgetGlobalValue(key, delegate.globalParas)}
        });
        let globalOtherHeaders = {};
        extraHeaders.forEach(key => {
            if (typeof key == "object"){
                globalOtherHeaders = {...globalOtherHeaders, ...key};
                return;
            }
            if (!delegate) return;
            globalOtherHeaders = {...globalOtherParas, ...jgetGlobalValue(key, delegate.globalHeaders)}
        });
        let request: JRequester = JRequester.create(
            method,
            baseUrl,
            url,
            {...parameters, ...globalOtherParas},
            {...headers, ...globalOtherHeaders},
            {axiosConfig: this.axiosConfig, ...otherObject},
            delegate
        );
        if (this.isSync){
            return this.requestEngine.addRequest(request);
        } else {
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
    }

    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.fetchRequest('post', baseUrl, url || '', parameters || {}, headers || {}, otherObject || {});
    }

    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.fetchRequest('get', baseUrl, url || '', parameters || {}, headers || {}, otherObject || {});
    }

    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.freedomPOST(this.baseUrl, url, {
            ...this.carryData,
            ...parameters
        }, headers, {...this.axiosConfig, ...otherObject})
    }

    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.freedomGET(this.baseUrl, url, {
            ...this.carryData,
            ...parameters
        }, headers, {...this.axiosConfig, ...otherObject})
    }
}