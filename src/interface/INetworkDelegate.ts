import {AxiosRequestConfig, AxiosResponse} from "axios";
import UrlTool from "../tool/JToolUrl";
import {GlobalValueRegistry} from "../../types";

export default interface INetworkDelegate{
    globalParams: GlobalValueRegistry;
    globalHeaders: GlobalValueRegistry;
    globalBodyData: GlobalValueRegistry;
    requestInterceptor?(config: AxiosRequestConfig): AxiosRequestConfig;
    requestInterceptorError?(error: Error): Promise<never>;
    responseInterceptor?(response: AxiosResponse): AxiosResponse;
    responseInterceptorError?(error: Error): Promise<never>;
    resolveInterceptor?(response: AxiosResponse, data: any): boolean;
    rejectInterceptor?(response: AxiosResponse, error: Error): boolean;
    responseDataInterceptor?(data: any, response?: AxiosResponse): any;
    responseErrorInterceptor?(error: Error, response?: AxiosResponse): Error;
}

export const DEFAULT_DELEGATE: INetworkDelegate = {
    globalParams: () => {},
    globalHeaders: () => {},
    globalBodyData: () => {},
    requestInterceptor: (config: AxiosRequestConfig): AxiosRequestConfig => {
        // Do something before request is sent
        console.log(`${config.method}  ${UrlTool.urlFromPortion(config.url, '', config.params)}`);
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
    },
    responseDataInterceptor: (data: any, response?: AxiosResponse): any => {
        return data;
    },
    responseErrorInterceptor: (error: Error, response?: AxiosResponse): Error => {
        return error;
    }
};
