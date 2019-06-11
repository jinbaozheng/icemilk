import {INetworkFetch, INetworkExtra, INetworkConfig} from "./interface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {INetworkDelegate, INetworkStandardPromiseType} from "./interface";

export type BodyData = object | FormData | Blob | File;

export declare class JNetworkRoot{
    extraParams: Array<string|object>;
    extraHeaders: Array<string|object>;
    extraBodyData: Array<string|object>;
    useParams(...params: Array<string|object>): this;
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
    static useParams(...params: Array<string|object>): JNetwork;
    static useHeaders(...headers: Array<string|object>): JNetwork;
    static instance(): JNetwork
    static defaultInstance(): JNetwork
    static freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>
    static freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>
    public pickInjectParams(): object;
    public pickInjectHeaders(): object;
    public pickInjectBodyData(): object;
    public createGroup(options?): JNetworkGroup;
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, data: BodyData, headers: object, otherObject: any): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;

    freedomDataPOST(baseUrl: string, url?: string, data?: BodyData, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomDataGET(baseUrl: string, url?: string, data?: BodyData, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataPOST(url?: string, data?: BodyData, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataGET(url?: string, data?: BodyData, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
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
    public pickInjectParams(): object;
    public pickInjectHeaders(): object;
    public pickInjectBodyData(): object;
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, data: BodyData, headers: object, otherObject: any): INetworkStandardPromiseType<AxiosResponse|JNetworkError>
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;

    freedomDataPOST(baseUrl: string, url?: string, data?: BodyData, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomDataGET(baseUrl: string, url?: string, data?: BodyData, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataPOST(url?: string, data?: BodyData, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataGET(url?: string, data?: BodyData, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}

export declare class JNetworkError extends Error{
    errorCode: number;
    constructor(errorMessage: string | Error, code?: number);
}