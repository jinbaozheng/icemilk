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
import JNetworkRoot from "./JNetworkRoot";
import JToolObject from "../tool/JToolObject";
let GROUP_COUNT = 0


export default class JNetworkGroup extends JNetworkRoot implements INetworkFetch, INetworkExtra{
    readonly baseUrl: string;
    readonly freezeCarryParams: object;
    readonly freezeCarryHeaders: object;
    readonly freezeCarryBodyData: object;
    readonly axiosConfig: AxiosRequestConfig;
    readonly delegate: INetworkDelegate;
    readonly groupId: number;
    readonly isSync: boolean;

    private readonly freezeParas:Array<string|object>;
    private readonly freezeHeaders:Array<string|object>;
    private readonly freezeBodyData:Array<string|object>;
    private readonly requestEngine:JRequestEngine = new JRequestEngine();

    constructor(baseUrl: string, axiosConfig: AxiosRequestConfig, delegate: INetworkDelegate, options?:any){
        super();
        this.baseUrl = baseUrl;
        this.axiosConfig = axiosConfig || {};
        this.delegate = delegate || null;
        this.groupId = ++GROUP_COUNT;
        if (options){
            this.freezeParas = options.freezeParas || [];
            this.freezeHeaders = options.freezeHeaders || [];
            this.freezeBodyData = options.freezeBodyData || [];
            this.freezeCarryParams = options.freezeCarryParams || {};
            this.freezeCarryHeaders = options.freezeCarryHeaders || {};
            this.freezeCarryBodyData = options.freezeCarryBodyData || {};
            this.isSync = options.isSync;
        }
    }

    /**
     * 发送请求
     * @param method 方法类型
     * @param baseUrl 基地址
     * @param url 相对地址
     * @param parameters 参数
     * @param data data参数
     * @param headers 头参数
     * @param otherObject 其他相关设置
     * @returns {CancelPromiseFactory<any>}
     */
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, data: object, headers: object, otherObject: any): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        let extraParams = [...this.freezeParas, ...this.extraParams];
        let extraHeaders = [...this.freezeHeaders, ...this.extraHeaders];
        let extraBodyData = [...this.freezeBodyData, ...this.extraBodyData];
        let carryParams: object = JToolObject.getObjOrFuncResult(this.freezeCarryParams);
        let carryHeaders: object = JToolObject.getObjOrFuncResult(this.freezeHeaders);
        let carryBodyData: object = JToolObject.getObjOrFuncResult(this.freezeCarryBodyData);
        this.clearExtraData();
        const delegate = this.delegate;
        headers = Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }, headers);

        let globalOtherParas = {};
        extraParams.forEach(key => {
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
        let globalOtherBodyData = {};
        extraBodyData.forEach(key => {
            if (typeof key == "object"){
                globalOtherBodyData = {...globalOtherBodyData, ...key};
                return;
            }
            if (!delegate) return;
            globalOtherBodyData = {...globalOtherBodyData, ...jgetGlobalValue(key, delegate.globalBodyData)}
        });
        let request: JRequester = JRequester.create(
            method,
            baseUrl,
            url,
            {...carryParams, ...globalOtherParas, ...parameters},
            {...carryBodyData,  ...globalOtherBodyData, ...data},
            {...carryHeaders, ...globalOtherHeaders, ...headers},
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
        return this.fetchRequest('post', baseUrl, url || '', parameters || {}, {}, headers || {}, otherObject || {});
    }

    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.fetchRequest('get', baseUrl, url || '', parameters || {}, {},headers || {}, otherObject || {});
    }

    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.freedomPOST(this.baseUrl, url, parameters, headers, {...this.axiosConfig, ...otherObject})
    }

    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError> {
        return this.freedomGET(this.baseUrl, url, parameters, headers, {...this.axiosConfig, ...otherObject})
    }

    freedomDataPOST(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>{
        return this.fetchRequest('post', baseUrl, url || '', {}, data || {}, headers || {}, otherObject || {});
    }

    freedomDataGET(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>{
        return this.fetchRequest('get', baseUrl, url || '', {}, data || {}, headers || {}, otherObject || {});
    }

    dataPOST(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>{
        return this.freedomDataPOST(this.baseUrl, url,  data, headers, {...this.axiosConfig, ...otherObject});
    }

    dataGET(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>{
        return this.freedomDataGET(this.baseUrl, url,  data, headers, {...this.axiosConfig, ...otherObject});
    }
}