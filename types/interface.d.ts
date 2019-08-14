import {AxiosRequestConfig, AxiosResponse} from "axios";
import {JPromise} from "./structure";
import {JNetworkError, JNetworkGroup} from "./network";
import {INetworkDelegate} from "./interface";
import {GlobalValueRegistry} from "./other";

export type INetworkStandardPromiseType<T> = JPromise<T>;
export declare interface INetworkExtra {
    useParams(...params: Array<string|object>): this;
    useHeaders(...headers: Array<string|object>): this;
    useBodyData(...bodyData: Array<string|object>): this;
    extraParams: Array<string|object>;
    extraHeaders: Array<string|object>;
    extraBodyData: Array<string|object>;
}

export declare interface INetworkFetch {
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


export declare interface INetworkConfig{
    baseUrl: string;
    delegate?: INetworkDelegate;
    carryParams?: object | Function;
    carryHeaders?: object | Function;
    carryBodyData?: object | Function;
    axiosConfig?: AxiosRequestConfig;
}


export declare interface INetworkDelegate{
    globalParams?: GlobalValueRegistry;
    globalHeaders?: GlobalValueRegistry;
    globalBodyData?: GlobalValueRegistry;
    requestInterceptor?(config: AxiosRequestConfig): AxiosRequestConfig;
    requestInterceptorError?(error: Error): Promise<never>;
    responseInterceptor?(response: AxiosResponse): AxiosResponse;
    responseInterceptorError?(error: Error): Promise<never>;
    resolveInterceptor?(response: AxiosResponse, data: any): boolean;
    rejectInterceptor?(response: AxiosResponse, error: Error): boolean;
    responseDataInterceptor?(data: any, response?: AxiosResponse): any;
    responseErrorInterceptor?(error: Error, response?: AxiosResponse): Error;
}

export declare interface INetworkGroupOption <T extends JNetworkGroup>{
    notClearExtraData: boolean,
    isSync: boolean,
    groupClass: new (...args: any[]) => T
}

export declare interface INetworkOtherOption extends AxiosRequestConfig{
    notTransformData: boolean;
    specific: any;
    ignore: any;
}