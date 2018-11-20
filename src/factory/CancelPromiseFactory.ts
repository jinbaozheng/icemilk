/**
 * Created by cuppi on 2017/9/4.
 */

export interface JPromise<T> extends Promise<T>{
    terminate: () => void;
}


export default class CancelPromiseFactory{
    constructor(args){
        return {
            ...new Promise(args),
            terminate: null
        } as CancelPromiseFactory
    }

    static createJPromise<T>(para: Promise<T> | ((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: T) => void) => void)): JPromise<T>{
        let promise:Promise<any> = null;
        if (typeof para == "function"){
            promise = new Promise(para);
        } else {
            promise = para as Promise<any>;
        }
        let hasCanceled_ = false;
        const wrappedPromise: JPromise<T> = new Promise((resolve, reject) => {
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
        }) as JPromise<T>;
        wrappedPromise.terminate = () => {
            hasCanceled_ = true;
        }
        return wrappedPromise;
    }
}
