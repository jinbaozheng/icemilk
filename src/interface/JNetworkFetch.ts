import {AxiosResponse} from "axios";
import {JPromise} from "../factory/CancelPromiseFactory";
import JNetworkError from "../network/JNetworkError";

export default interface JNetworkFetch {
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
}
