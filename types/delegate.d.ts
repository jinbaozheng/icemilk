import {AxiosRequestConfig, AxiosResponse} from "axios";

export abstract class JNetworkDelegate{
  globalParas: Function;
  globalHeaders: Function;
  abstract requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig;
  abstract requestInterceptorError(error: Error): Promise<never>;
  abstract responseInterceptor(response: AxiosResponse): AxiosResponse;
  abstract responseInterceptorError(error: Error): Promise<never>;
  abstract resolveInterceptor(response: AxiosResponse, data: any): boolean;
  abstract rejectInterceptor(response: AxiosResponse, error: Error): boolean;
}
