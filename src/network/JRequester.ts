import axios, {AxiosInstance} from "axios";
import INetworkDelegate, {DEFAULT_DELEGATE} from "../interface/INetworkDelegate";
import CancelPromiseFactory, {JPromise} from "../factory/CancelPromiseFactory";
import {AxiosResponse} from 'axios';
import JToolObject from '../tool/JToolObject';
import INetworkOtherOption from "../interface/INetworkOtherOption";
let REQUESTER_COUNT = 0;

export default class JRequester{
    readonly method: string;
    readonly baseUrl: string;
    readonly url: string;
    readonly parameters: object;
    readonly headers: object;
    readonly bodyData: object;
    readonly otherObject: any;
    readonly delegate: INetworkDelegate;
    readonly requesterId: number;
    jaxios: AxiosInstance;
    constructor(method: string, baseUrl: string, url: string, parameters: object, headers: object, bodyData: object, otherObject: any, delegate: INetworkDelegate){
        this.method = method;
        this.baseUrl = baseUrl;
        this.url = url;
        this.parameters = parameters;
        this.headers = headers;
        this.bodyData = bodyData;
        this.otherObject = otherObject;
        this.delegate = delegate;
        this.requesterId = ++REQUESTER_COUNT;
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
     * @param bodyData data参数
     * @param headers 头参数
     * @param otherObject 其他相关设置
     * @param delegate 网络请求代理
     * @returns {CancelPromiseFactory<any>}
     */
    static create(method: string, baseUrl: string, url: string, parameters: object, bodyData: object, headers: object, otherObject: INetworkOtherOption, delegate: INetworkDelegate): JRequester{
        let requester = new JRequester(method, baseUrl, url, parameters, headers, bodyData, otherObject, delegate);
        if (JToolObject.isEmptyObject(bodyData)){
            bodyData = null
        }
        const axiosProps = {
            method: method,
            params: parameters,
            baseURL: baseUrl,
            data: bodyData,
            headers,
            ...otherObject
        };

        /**
         * 只传指定的属性 或 忽略某些属性
         * 只传 a 参数 头参数正常
         * specific: {
         *     params: ['a']
         * }
         * 参数 a 将被忽略
         * ignore: {
         *  params: ['a']
         * }
         */
        if (otherObject.hasOwnProperty('specific') || otherObject.hasOwnProperty('ignore')){
            [{k: 'params', ak: 'params'}, {k: 'headers', ak: 'headers'}, {k: 'bodyData', ak: 'data'}].forEach((_) => {
                const specV = otherObject.specific ? otherObject.specific[_.k] : null;
                const ignoV = otherObject.ignore ? otherObject.ignore[_.k] : null;
                const apl = Object.keys(axiosProps[_.ak]) || [];
                specV && (axiosProps[_.ak] = apl
                    .filter(_ => specV.some(__ => _ === __))
                    .map(k => ({k, v: axiosProps[_.ak][k]}))
                    .reduce((_, {k, v}) => ({..._, [k]: v}), {}));
                ignoV && (axiosProps[_.ak] = apl
                    .filter(_ => ignoV.some(__ => _ !== __))
                    .map(k => ({k, v: axiosProps[_.ak][k]}))
                    .reduce((_, {k, v}) => ({..._, [k]: v}), {}));
            })
        }
        const jaxios = axios.create(axiosProps);
        delegate = {...DEFAULT_DELEGATE, ...(delegate || {})};
        requester.jaxios = jaxios;
        jaxios.interceptors.request.use(config => {
            config.params = {...parameters};
            config.headers = {...headers};
            return delegate.requestInterceptor(config);
        }, error => {
            return delegate.requestInterceptorError(error);
        });
        jaxios.interceptors.response.use(response => {
            return delegate.responseInterceptor(response);
        }, error => {
            return delegate.responseInterceptorError(error);
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

    repeat(): JPromise<AxiosResponse>{
        return CancelPromiseFactory.createJPromise((resolve, reject) => {
            this.jaxios.request({url: this.url}).then((response: AxiosResponse) => {
                resolve(response);
            }, error => {
                reject(error);
            })
        });
    }
}