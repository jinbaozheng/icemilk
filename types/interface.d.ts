import {AxiosRequestConfig, AxiosResponse} from "axios";
import {JPromise} from "./structure";
import {JNetworkError} from "./network";
import {INetworkDelegate} from "./interface";

export type INetworkStandardPromiseType<T> = JPromise<T>;
export declare interface INetworkExtra {
    useParas(...paras: Array<string|object>): this;
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
    globalParas: Function;
    globalHeaders: Function;
    globalBodyData: Function;
    requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig;
    requestInterceptorError(error: Error): Promise<never>;
    responseInterceptor(response: AxiosResponse): AxiosResponse;
    responseInterceptorError(error: Error): Promise<never>;
    resolveInterceptor(response: AxiosResponse, data: any): boolean;
    rejectInterceptor(response: AxiosResponse, error: Error): boolean;
}