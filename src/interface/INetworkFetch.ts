import {AxiosResponse} from "axios";
import JNetworkError from "../network/JNetworkError";
import {INetworkStandardPromiseType} from "../../types";

export default interface INetworkFetch {
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, data: object, headers: object, otherObject: any): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;

    freedomDataPOST(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    freedomDataGET(baseUrl: string, url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataPOST(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
    dataGET(url?: string, data?: object, headers?: object, otherObject?: object): INetworkStandardPromiseType<AxiosResponse|JNetworkError>;
}
