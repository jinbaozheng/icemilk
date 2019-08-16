import INetworkDelegate, {DEFAULT_DELEGATE} from "../interface/INetworkDelegate";
import {AxiosRequestConfig} from "axios";

export default interface INetworkConfig {
    baseUrl: string;
    delegate?: INetworkDelegate;
    carryParams?: object | Function;
    carryHeaders?: object | Function;
    carryBodyData?: object | Function;
    axiosConfig?: AxiosRequestConfig;
    otherContent?: object;
}

export const DEFAULT_CONFIG: INetworkConfig = {
    baseUrl: '',
    delegate: DEFAULT_DELEGATE,
    carryParams: {},
    carryHeaders: {},
    carryBodyData: {},
    axiosConfig: {
        timeout: 10 * 1000
    },
    otherContent: null
}
