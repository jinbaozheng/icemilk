import {AxiosRequestConfig, AxiosResponse} from "axios";
import {JPromise} from "./structure";
import {JNetworkError, JNetworkGroup} from "./network";
import {INetworkDelegate} from "./interface";
import {GlobalValueRegistry} from "./other";

/**
 * 标准网络请求异步返回
 */
export type INetworkStandardPromiseType<T> = JPromise<T>;

/**
 * 网络请求初始化配置
 */
export declare interface INetworkConfig{
    /**
     * 基地址
     */
    baseUrl: string;
    /**
     * 代理
     */
    delegate?: INetworkDelegate;
    /**
     * 可携带url参数
     */
    carryParams?: object | Function;
    /**
     * 可携带头参数
     */
    carryHeaders?: object | Function;
    /**
     * 可携带请求体数据
     */
    carryBodyData?: object | Function;
    /**
     * axios库配置
     */
    axiosConfig?: AxiosRequestConfig;
    /**
     * 额外信息
     */
    otherContent?: object;
}

/**
 * 网络请求可注入性接口
 */
export declare interface INetworkExtra {
    /**
     * 注入额外Url参数键值对或额外参数键
     * @description 配置参数键请见构造方法
     * @param params 键值对或配置内的参数键
     */
    useParams(...params: Array<string|object>): this;

    /**
     * 注入额外头参数键值对或额外参数键
     * @description 配置参数键请见构造方法
     * @param headers 键值对或配置内的参数键
     */
    useHeaders(...headers: Array<string|object>): this;

    /**
     * 注入额外请求体数据键值对或额外参数键
     * @description 配置参数键请见构造方法
     * @param bodyData 键值对或配置内的参数键
     */
    useBodyData(...bodyData: Array<string|object>): this;

    /**
     *  已注入的外部Url参数
     *  - 通过carryParams或useParams传入的参数
     */
    extraParams: Array<string|object>;
    /**
     *  已注入的外部头参数
     *  - 通过carryHeaders或useHeaders传入的参数
     */
    extraHeaders: Array<string|object>;
    /**
     *  已经注入的外部的请求体数据
     *  - 通过carryBodyData或useBodyData传入的参数
     */
    extraBodyData: Array<string|object>;
}

/**
 * 网络请求可请求性接口
 */
export declare interface INetworkFetch {
    /**
     * 发送网络请求
     * @param method 请求类型
     * @param baseUrl 基地址
     * @param url 子地址
     * @param parameters url参数
     * @param bodyData 请求体数据
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, bodyData: object, headers: object, otherObject: any): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    /**
     * 高自由度POST请求
     * @param baseUrl 基地址
     * @param url 子地址
     * @param parameters url参数
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    /**
     * 高自由度GET请求
     * @param baseUrl 基地址
     * @param url 子地址
     * @param parameters url参数
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    /**
     * 基于基地址的POST请求
     * @param url 子地址
     * @param parameters url参数
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>;
    /**
     * 基于基地址的GET请求
     * @param url 子地址
     * @param parameters url参数
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>;
    /**
     * 携带请求体的高自由度POST请求
     * @param baseUrl 基地址
     * @param url 子地址
     * @param bodyData 请求体数据
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    freedomDataPOST(baseUrl: string, url?: string, bodyData?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    /**
     * 携带请求体的高自由度GET请求
     * @param baseUrl 基地址
     * @param url 子地址
     * @param bodyData 请求体数据
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    freedomDataGET(baseUrl: string, url?: string, bodyData?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    /**
     * 携带请求体的基于基地址的POST请求
     * @param url 子地址
     * @param bodyData 请求体数据
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    dataPOST(url?: string, bodyData?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    /**
     * 携带请求体的基于基地址的GET请求
     * @param url 子地址
     * @param bodyData 请求体数据
     * @param headers 头参数
     * @param otherObject axios及其他相关配置项
     */
    dataGET(url?: string, bodyData?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}

/**
 * 网络请求代理接口
 */
export declare interface INetworkDelegate{
    /**
     * 全局可携带的url参数
     */
    globalParams?: GlobalValueRegistry;
    /**
     * 全局可携带的头参数
     */
    globalHeaders?: GlobalValueRegistry;
    /**
     * 全局可携带的请求体数据
     */
    globalBodyData?: GlobalValueRegistry;

    /**
     * 请求拦截处理方法
     * @param config axios配置项
     */
    requestInterceptor?(config: AxiosRequestConfig): AxiosRequestConfig;

    /**
     * 请求异常拦截处理方法
     * @param error 异常信息
     */
    requestInterceptorError?(error: Error): Promise<never>;

    /**
     * 请求响应拦截处理方法
     * @param response
     */
    responseInterceptor?(response: AxiosResponse): AxiosResponse;

    /**
     * 请求响应异常拦截处理方法
     * @param error 异常信息
     */
    responseInterceptorError?(error: Error): Promise<never>;

    /**
     * @hidden
     * @param response
     * @param data
     */
    resolveInterceptor?(response: AxiosResponse, data: any): boolean;
    /**
     * @hidden
     * @param response
     * @param error
     */
    rejectInterceptor?(response: AxiosResponse, error: Error): boolean;

    /**
     * @hidden
     * @param data
     * @param response
     */
    responseDataInterceptor?(data: any, response?: AxiosResponse): any;

    /**
     * @hidden
     * @param error
     * @param response
     */
    responseErrorInterceptor?(error: Error, response?: AxiosResponse): Error;
}

/**
 * 网络请求组初始化接口
 */
export declare interface INetworkGroupOption <T extends JNetworkGroup>{
    /**
     * 是否清除当前所有注入数据
     */
    notClearExtraData?: boolean,
    /**
     * 是否为异步请求组
     * - 请求将在上个请求完成后发出
     */
    isSync?: boolean,
    /**
     * 网络请求组自定义类
     * @param args
     */
    groupClass?: new (...args: any[]) => T
}

/**+
 * 网络请求额外的配置项接口
 */
export declare interface INetworkOtherOption extends AxiosRequestConfig{
    /**
     * @hidden
     * 是否进行数据转换
     */
    notTransformData: boolean;
    /**
     * 定义只传指定参数
     * - {params: {...}, bodyData: {...}, header: {...}}
     */
    specific: any;
    /**
     * 定义忽略指定参数
     * - {params: {...}, bodyData: {...}, header: {...}}
     */
    ignore: any;
}

export declare interface IToolUrlOption {
    complete: boolean
}

export declare interface IToolCommonUrlObj {
    host: string
    href:string
    pathname: string
    protocol: string
    query: any
    hashpath: string
    hashquery: any
}

export declare interface IToolComplexUrlObj extends IToolCommonUrlObj{
    origin: string,
    hostname: string,
    port: string,
    search: string,
    username: string,
    password: string,
    hashsearch: string,
    hash: string
}
