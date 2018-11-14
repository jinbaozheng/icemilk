/**
 * Created by cuppi on 2017/9/4.
 */

class JPromise<T> extends Promise<T>{

  useParas: (...paras: Array<string|object>) => JPromise<T>;
  useHeaders: (...paras: Array<string|object>) => JPromise<T>;
  otherParas?: Array<string|object>;
  otherHeaders?: Array<string|object>;

  static create(para: Promise<any> | ((resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => void)): JPromise<any>{
    let promise:Promise<any> = null;
    if (typeof para == "function"){
      promise = new Promise(para);
    } else {
      promise = para as Promise<any>;
    }
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then((val) => hasCanceled_
        ? () => {
        }
        : resolve(val), () => {
        // 不写会有警告
      });
      promise.catch((error) => hasCanceled_
        ? () => {
        }
        : reject(error));
    });
    let _promise: JPromise<any> = {
      ...wrappedPromise,
      terminate: () => {
        hasCanceled_ = true;
      },
      then: (resolve, reject) => {
        return wrappedPromise.then(resolve, reject);
      },
      otherParas: [],
      otherHeaders: [],
      useParas: (...paras) => {
        _promise.otherParas = paras;
        return _promise;
      },
      useHeaders: (...headers) => {
        _promise.otherHeaders = headers;
        return _promise;
      }
    } as JPromise<any>;
    return _promise;
  }
}

export default JPromise;
