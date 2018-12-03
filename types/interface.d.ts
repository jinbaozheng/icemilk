import {AxiosResponse} from "axios";
import {JPromise} from "./structure";
import {JNetworkError} from "./network";

export default interface JNetworkExtra {
    useParas(...paras: Array<string|object>);
    useHeaders(...headers: Array<string|object>);
    extraParas: Array<string|object>;
    extraHeaders: Array<string|object>;
}

export default interface JNetworkFetch {
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
}
