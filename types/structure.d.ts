export declare interface JPromise<T> extends Promise<T>{
    terminate: () => void;
}

export declare class CancelPromiseFactory{
    static createJPromise<T>(para: Promise<T> | ((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: T) => void) => void)): JPromise<T>;
}