/**
 * Created by cuppi on 2017/9/4.
 */

import {AxiosRequestConfig, AxiosResponse} from "axios";
import UrlTool from "../tool/JToolUrl";

export default interface INetworkDelegate{
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

export const DEFAULT_DELEGATE: INetworkDelegate = {
    globalParas: () => {},
    globalHeaders: () => {},
    globalBodyData: () => {},
    requestInterceptor: (config: AxiosRequestConfig): AxiosRequestConfig => {
        // Do something before request is sent
        console.log('POST ' + UrlTool.urlFromPortion(config.url, '', config.params));
        return config;
    },
    requestInterceptorError: (error: Error): Promise<never> => {
        // Do something with request error
        return Promise.reject(error);
    },
    responseInterceptor: (response: AxiosResponse): AxiosResponse => {
        // Do something with response data
        return response;
    },
    responseInterceptorError: (error: Error): Promise<never> => {
        // Do something with response error
        return Promise.reject(error);
    },
    resolveInterceptor: (response: AxiosResponse, data: any): boolean => {
        return true;
    },
    rejectInterceptor: (response: AxiosResponse, error: Error): boolean => {
        return true;
    }
}
