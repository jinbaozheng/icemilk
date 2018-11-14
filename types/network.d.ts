import {JPromise} from "./structure";

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

export declare class JNetwork{
  otherParas: Array<string|object>;
  otherHeaders: Array<string|object>;
  static useParas(...paras: Array<string|object>)
  static useHeaders(...headers: Array<string|object>)
  useParas(...paras: Array<string|object>): JNetwork
  useHeaders(...headers: Array<string|object>): JNetwork
  static instance(): any
  static freedomPOST(baseUrl, url, parameters, headers, otherObject): JPromise<any>
  static freedomGET(baseUrl: string, url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  static POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  static GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<any>
  freedomPOST(baseUrl, url, parameters, headers, otherObject): JPromise<any>
  freedomGET(baseUrl: string, url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
}
export declare class JNetworkConfig extends JNetworkRoot{
  static setConfig(config: any)
}