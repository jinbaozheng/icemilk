import {JPromise} from "./structure";
import {INetworkFetch, INetworkExtra, INetworkConfig} from "./interface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {INetworkDelegate, INetworkStandardPromiseType} from "./interface";
import {DEFAULT_CONFIG} from "../src/interface/INetworkConfig";

export declare class JNetworkRoot{
    extraParams: Array<string|object>;
    extraHeaders: Array<string|object>;
    extraBodyData: Array<string|object>;
    useParas(...paras: Array<string|object>): this;
    useHeaders(...headers: Array<string|object>): this;
    useBodyData(...bodyData: Array<string|object>): this;
    clearExtraData(): void;
}

export declare class JNetwork extends JNetworkRoot implements INetworkFetch, INetworkExtra{
    readonly baseUrl: string;
    readonly carryParams: object | Function;
    readonly carryHeaders: object | Function;
    readonly carryBodyData: object | Function;
    readonly axiosConfig: AxiosRequestConfig;
    readonly delegate: INetworkDelegate;
    readonly instanceId: number;

    constructor(config: INetworkConfig)
    static useParas(...paras: Array<string|object>): JNetwork;
    static useHeaders(...headers: Array<string|object>): JNetwork;
    static instance(): JNetwork
    static defaultInstance(): JNetwork
    static freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
    static freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;

    freedomDataPOST(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomDataGET(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataPOST(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataGET(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}

export declare class JNetworkGroup extends JNetworkRoot implements INetworkFetch, INetworkExtra{
    readonly baseUrl: string;
    readonly carryParams: object;
    readonly carryHeaders: object;
    readonly carryBodyData: object;
    readonly axiosConfig: AxiosRequestConfig;
    readonly delegate: INetworkDelegate;
    readonly groupId: number;
    readonly isSync: boolean;

    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;

    freedomDataPOST(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomDataGET(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataPOST(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataGET(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}

export declare class JNetworkError extends Error{
    errorCode: number;
    constructor(errorMessage: string | Error, code?: number);
}