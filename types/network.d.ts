import {INetworkFetch, INetworkExtra, INetworkConfig} from "./interface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {INetworkDelegate, INetworkStandardPromiseType} from "./interface";
import {INetworkGroupOption, INetworkOtherOption} from "./interface";
import {JPromise} from "./structure";

export type BodyData = object | FormData | Blob | File;

/**
 * 请求基类
 */
export declare class JNetworkRoot implements INetworkExtra{
    extraParams: Array<string|object>;
    extraHeaders: Array<string|object>;
    extraBodyData: Array<string|object>;
    useParams(...params: Array<string|object>): this;
    useHeaders(...headers: Array<string|object>): this;
    useBodyData(...bodyData: Array<string|object>): this;
    /**
     * 清空所有外部数据
     */
    clearExtraData(): void;
}

/**
 * 网络请求类
 */
export declare class JNetwork extends JNetworkRoot implements INetworkFetch{
    /**
     * @readonly
     * 请求配置对象
     */
    readonly config: INetworkConfig;
    /**
     * @readonly
     * 请求基地址
     */
    readonly baseUrl: string;
    /**
     * @readonly
     * 请求代理实例
     */
    readonly delegate: INetworkDelegate;
    /**
     * @readonly
     * 可携带Url参数配置项
     */
    readonly carryParams: object | Function;
    /**
     * @readonly
     * 可携带头参数配置项
     */
    readonly carryHeaders: object | Function;
    /**
     * @readonly
     * 可携带请求体数据配置项
     */
    readonly carryBodyData: object | Function;
    /**
     * @readonly
     * axios配置项
     */
    readonly axiosConfig: AxiosRequestConfig;
    /**
     * @readonly
     * 当前实例Id
     */
    readonly instanceId: number;

    /**
     * 构造方法
     * @param config 请求配置项
     */
    constructor(config: INetworkConfig)

    /**
     * 注入额外Url参数键值对或额外参数键
     * @description 配置参数键请见构造方法
     * @param params 参数键值对或配置内的头参数键
     */
    static useParams(...params: Array<string|object>): JNetwork;
    /**
     * 注入额外头参数键值对或额外参数键
     * @description 配置参数键请见构造方法
     * @param headers 键值对或配置内的头参数键
     */
    static useHeaders(...headers: Array<string|object>): JNetwork;
    /**
     * 注入额外请求体数据键值对或额外参数键
     * @description 配置参数键请见构造方法
     * @param bodyData 键值对或配置内的头参数键
     */
    static useBodyData(...bodyData: Array<string|object>): JNetwork;

    /**
     * 创建实例
     * @param config 实例配置项
     */
    static instance(config?: INetworkConfig): JNetwork

    /**
     * 创建默认实例
     */
    static defaultInstance(): JNetwork

    /**
     * 高自由度Post请求
     * @param baseUrl 基地址
     * @param url 子地址
     * @param parameters url参数
     * @param headers 头参数
     * @param otherObject 其他配置
     */
    static freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>

    /**
     * 高自由度Get请求
     * @param baseUrl 基地址
     * @param url 子地址
     * @param parameters url参数
     * @param headers 头参数
     * @param otherObject 其他配置
     */
    static freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>

    /**
     * 获取当前通过carryParams及useParams注入的url参数
     */
    public pickInjectParams(): object;

    /**
     * 获取当前通过carryHeaders及useHeaders注入的url参数
     */
    public pickInjectHeaders(): object;

    /**
     * 获取当前通过carryBodyData及useBodyData注入的url参数
     */
    public pickInjectBodyData(): object;

    /**
     * 创建网络请求组
     * @description 谨慎使用
     * @typeparam T 继承JNetworkGroup的类
     * @param options 创建 JNetworkGroup 参数
     */
    public createGroup<T extends JNetworkGroup>(options?: INetworkGroupOption<T>): T;

    /**
     * 清空所有网络请求组
     * @hidden
     * 待开发
     */
    public clearGroup()
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, bodyData: BodyData, headers: object, otherObject: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomDataPOST(baseUrl: string, url?: string, bodyData?: BodyData, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomDataGET(baseUrl: string, url?: string, bodyData?: BodyData, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataPOST(url?: string, bodyData?: BodyData, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataGET(url?: string, bodyData?: BodyData, headers?: object, otherObject?: INetworkOtherOption): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}

/**
 * 网络请求组类
 */
export declare class JNetworkGroup extends JNetworkRoot implements INetworkFetch{
    /**
     * @readonly
     * 请求基地址
     */
    readonly baseUrl: string;
    /**
     * @readonly
     * 可携带Url参数配置项
     */
    readonly carryParams: object;
    /**
     * @readonly
     * 可携带头参数配置项
     */
    readonly carryHeaders: object;
    /**
     * @readonly
     * 可携带请求体数据
     */
    readonly carryBodyData: object;
    /**
     * @readonly
     * axios 配置项
     */
    readonly axiosConfig: AxiosRequestConfig;
    /**
     * @readonly
     * 请求代理实例
     */
    readonly delegate: INetworkDelegate;
    /**
     * @readonly
     * 请求组Id
     */
    readonly groupId: number;
    /**
     * @readonly
     * 是否为异步请求组
     */
    readonly isSync: boolean;

    /**
     * 构造方法
     * #### 不建议直接调用构造方法
     * @deprecated
     * @param baseUrl
     * @param axiosConfig
     * @param delegate
     * @param options
     */
    constructor(baseUrl: string, axiosConfig: AxiosRequestConfig, delegate: INetworkDelegate, options?:any);
    /**
     * 获取当前通过carryParams及useParams注入的url参数
     */
    public pickInjectParams(): object;
    /**
     * 获取当前通过carryHeaders及useHeaders注入的url参数
     */
    public pickInjectHeaders(): object;
    /**
     * 获取当前通过carryBodyData及useBodyData注入的url参数
     */
    public pickInjectBodyData(): object;
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, data: object, headers: object, otherObject: any): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>;
    freedomDataPOST(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomDataGET(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataPOST(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataGET(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}

/**
 * 网络请求异常类
 */
export declare class JNetworkError extends Error{
    /**
     * 异常码
     */
    errorCode: number;

    /**
     * 构造方法
     * @param errorMessage 请求信息或请求实例
     * @param code 异常码
     */
    constructor(errorMessage: string | Error, code?: number);
}