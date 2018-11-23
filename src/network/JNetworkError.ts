export default class JNetworkError extends Error{
    errorCode: number;
    constructor(errorMessage: string | Error, code?: number){
        if (typeof errorMessage === 'string'){
            super(errorMessage);
        } else if (errorMessage instanceof Error){
            super(errorMessage.message);
        } else {
            throw new Error('JNetworkError: 构造函数非法类型');
        }
        this.errorCode = code;
        // Reflect.defineProperty(this, 'errorCode', {value: code});
    }
}