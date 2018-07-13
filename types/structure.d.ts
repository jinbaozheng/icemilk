export declare class JPromise<T> extends Promise<T>{
  useParas: (...paras: Array<string|object>) => JPromise<T>;
  useHeaders: (...paras: Array<string|object>) => JPromise<T>;
  otherParas?: Array<string|object>;
  otherHeaders?: Array<string|object>;
  static create(para: Promise<any> | ((resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => void)): JPromise<any>
}
