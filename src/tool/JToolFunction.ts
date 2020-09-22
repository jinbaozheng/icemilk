class JToolFunction{
    static curry(func: Function, arity?: number): Function{

        function wrap(func: Function, arity?: number, cacheArgs: any[] = []) {
            arity = arity ?? func.length;
            return function(...args) {
                cacheArgs = [...cacheArgs, ...args];
                if (cacheArgs.length < arity){
                    return wrap(func, arity, cacheArgs);
                } else {
                    return func.call(this, ...cacheArgs)
                }
            }
        }

        return wrap(func, arity);
    }
}

export default JToolFunction;
