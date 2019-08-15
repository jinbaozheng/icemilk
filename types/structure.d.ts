/**
 * @hidden
 */
export declare interface JPromise<T> extends Promise<T>{
    terminate: () => void;
}

/**
 * @hidden
 */
export declare class CancelPromiseFactory{
    static createJPromise<T>(para: Promise<T> | ((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: T) => void) => void)): JPromise<T>;
}

/**
 * 这是个预留的声明文件
 */
export declare type PlaceHolderTS = any
