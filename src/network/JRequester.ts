
import axios, {AxiosInstance} from "axios";
import JNetworkDelegate from "../delegate/JNetworkDelegate";
import CancelPromiseFactory, {JPromise} from "../factory/CancelPromiseFactory";
import {AxiosResponse} from 'axios';

export default class JRequester{
    readonly method: string;
    readonly baseUrl: string;
    readonly url: string;
    readonly parameters: object;
    readonly headers: object;
    readonly otherObject: any;
    readonly delegate: JNetworkDelegate;
    jaxios: AxiosInstance;
    constructor(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any, delegate: JNetworkDelegate){
        this.method = method;
        this.baseUrl = baseUrl;
        this.url = url;
        this.parameters = parameters;
        this.headers = headers;
        this.otherObject = otherObject;
        this.delegate = delegate;
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

    /**
     * 发送请求
     * @param method 方法类型
     * @param baseUrl 基地址
     * @param url 相对地址
     * @param parameters 参数
     * @param headers 头参数
     * @param otherObject 其他相关设置
     * @param delegate 网络请求代理
     * @returns {CancelPromiseFactory<any>}
     */
    static create(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any, delegate: JNetworkDelegate): JRequester{
        let requester = new JRequester(method, baseUrl, url, parameters, headers, otherObject, delegate);
        let jaxios = axios.create({
            method: method,
            params: parameters,
            baseURL: baseUrl,
            headers,
            ...otherObject
        })
        requester.jaxios = jaxios;
        jaxios.interceptors.request.use(config => {
            config.params = {...parameters};
            config.headers = {...headers};
            return delegate ? delegate.requestInterceptor(config) : config;
        }, error => {
            return delegate ? delegate.requestInterceptorError(error) : error;
        });
        jaxios.interceptors.response.use(response => {
            return delegate ? delegate.responseInterceptor(response) : response;
        }, error => {
            return delegate ? delegate.responseInterceptorError(error) : error;
        });
        return requester;

    }

    request(): JPromise<AxiosResponse>{
        return CancelPromiseFactory.createJPromise((resolve, reject) => {
            this.jaxios.request({url: this.url}).then((response: AxiosResponse) => {
                resolve(response);
            }, error => {
                reject(error);
            })
        });
    }

}