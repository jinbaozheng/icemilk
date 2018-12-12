import INetworkDelegate, {DEFAULT_DELEGATE} from "../interface/INetworkDelegate";
import {AxiosRequestConfig} from "axios";

export default interface INetworkConfig {
    baseUrl: string;
    delegate: INetworkDelegate;
    carryData: object | Function;
    axiosConfig: AxiosRequestConfig;
}

export const DEFAULT_CONFIG: INetworkConfig = {
    baseUrl: '',
    delegate: DEFAULT_DELEGATE,
    carryData: {},
    axiosConfig: {
        timeout: 10 * 1000
    }
}
