/**
 * Created by cuppi on 2017/9/4.
 */

import CityParas from "../paras/CityParas";
import CoordinateParas from '../paras/CoordinateParas';
import {AxiosRequestConfig, AxiosResponse} from "axios";
import UrlTool from "../tool/JToolUrl";

abstract class NetworkDelegate{
  globalParas: Function;
  globalHeaders: Function;
  abstract requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig;
  abstract requestInterceptorError(error: Error): Promise<never>;
  abstract responseInterceptor(response: AxiosResponse): AxiosResponse;
  abstract responseInterceptorError(error: Error): Promise<never>;
}

export default NetworkDelegate;

export const defaultInterceptor = {
  requestInterceptor: (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Do something before request is sent
    console.log('POST ' + UrlTool.urlFromPortion(config.baseURL, '', config.params));
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
  }
}
