import {JPromise} from "./structure";
import {JNetworkDelegate} from "./delegate";
import JNetworkFetch from "./interface";
import {AxiosResponse} from "axios";
import JNetworkExtra from "../src/interface/JNetworkExtra";

export declare class JNetworkRoot {
    otherParas: Array<string|object>;
    otherHeaders: Array<string|object>;
    static useParas(...paras: Array<string|object>): JNetworkRoot
    static useHeaders(...headers: Array<string|object>): JNetworkRoot
    static instance(): any
    useParas(...paras: Array<string|object>): JNetworkRoot
    useHeaders(...headers: Array<string|object>): JNetworkRoot
    prefixPromise(url, paras?: object, headers?: object, options?: object): Promise<any>
}

export declare class JNetworkConfig{
    baseUrl: string;
    delegate: JNetworkDelegate;
    carryData: object | Function;
    timeout: number;
    static readonly DEFAULT_CONFIG: JNetworkConfig;
}

export declare class JNetwork implements JNetworkFetch, JNetworkExtra{
    extraParas: Array<string|object>;
    extraHeaders: Array<string|object>;
    constructor(config: JNetworkConfig)
    static useParas(...paras: Array<string|object>)
    static useHeaders(...headers: Array<string|object>)
    useParas(...paras: Array<string|object>): JNetwork
    useHeaders(...headers: Array<string|object>): JNetwork
    static instance(): any
    static freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
    static freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
    static POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
    static GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
}

export declare class JNetworkGroup implements JNetworkFetch, JNetworkExtra{
    extraParas: Array<string|object>;
    extraHeaders: Array<string|object>;
    useParas(...paras: Array<string|object>): JNetwork
    useHeaders(...headers: Array<string|object>): JNetwork
    fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<AxiosResponse|JNetworkError>;
    freedomPOST(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    freedomGET(baseUrl: string, url?: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
    GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<AxiosResponse|JNetworkError>;
}

export declare class JNetworkError extends Error{
    errorCode: number;
    constructor(errorMessage: string | Error, code?: number);
}