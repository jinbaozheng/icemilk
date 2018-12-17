import {AxiosRequestConfig, AxiosResponse} from "axios";
import {JPromise} from "./structure";
import {JNetworkError} from "./network";
import {INetworkDelegate} from "./interface";

export type INetworkStandardPromiseType<T> = JPromise<T>;
export declare interface INetworkExtra {
    useParas(...paras: Array<string|object>);
    useHeaders(...headers: Array<string|object>);
    extraParas: Array<string|object>;
    extraHeaders: Array<string|object>;
}

export declare interface INetworkFetch {
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<any>;
}


export declare interface INetworkConfig{
    baseUrl: string;
    delegate: INetworkDelegate;
    carryData: object | Function;
    timeout: number;
}


export declare interface INetworkDelegate{
    globalParas: Function;
    globalHeaders: Function;
    requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig;
    requestInterceptorError(error: Error): Promise<never>;
    responseInterceptor(response: AxiosResponse): AxiosResponse;
    responseInterceptorError(error: Error): Promise<never>;
    resolveInterceptor(response: AxiosResponse, data: any): boolean;
    rejectInterceptor(response: AxiosResponse, error: Error): boolean;
}