import {JPromise} from "./structure";
import {INetworkFetch, INetworkExtra, INetworkConfig} from "./interface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {INetworkDelegate, INetworkStandardPromiseType} from "./interface";

export declare class JNetworkRoot extends JNetwork{
    otherParas: Array<string|object>;
    otherHeaders: Array<string|object>;
    static useParas(...paras: Array<string|object>): JNetworkRoot
    static useHeaders(...headers: Array<string|object>): JNetworkRoot
    static instance(): JNetwork
    static defaultInstance(): JNetwork
    prefixPromise(url, paras?: object, headers?: object, options?: object): Promise<any>
}

export declare class JNetwork implements INetworkFetch, INetworkExtra{
    readonly baseUrl: string;
    readonly carryData: object | Function;
    readonly axiosConfig: AxiosRequestConfig;
    readonly delegate: INetworkDelegate;
    readonly instanceId: number;
    extraParas: Array<string|object>;
    extraHeaders: Array<string|object>;
    constructor(config: INetworkConfig)
    static useParas(...paras: Array<string|object>)
    static useHeaders(...headers: Array<string|object>)
    useParas<T extends JNetwork>(...paras: Array<string|object>): T;
    useHeaders<T extends JNetwork>(...headers: Array<string|object>): T;
    static instance(): JNetwork
    static defaultInstance(): JNetwork
    static freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
    static freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}

export declare class JNetworkGroup implements INetworkFetch, INetworkExtra{
    readonly baseUrl: string;
    readonly carryData: object;
    readonly axiosConfig: AxiosRequestConfig;
    readonly delegate: INetworkDelegate;
    readonly groupId: number;
    readonly isSync: boolean;
    extraParas: Array<string|object>;
    extraHeaders: Array<string|object>;
    useParas<T extends JNetwork>(...paras: Array<string|object>): T;
    useHeaders<T extends JNetwork>(...headers: Array<string|object>): T;
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}

export declare class JNetworkError extends Error{
    errorCode: number;
    constructor(errorMessage: string | Error, code?: number);
}