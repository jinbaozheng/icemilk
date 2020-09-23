class JToolFunction{
    static curry(func: Function, arity?: number): Function{
        function wrap(func: Function, arity?: number, cacheArgs: any[] = []) {
            arity = arity ?? func.length;
            return function(...args) {
                if (cacheArgs.length + args.length < arity){
                    return wrap(func, arity, [...cacheArgs, ...args]);
                } else {
                    return func.call(this, ...cacheArgs, ...args)
                }
            }
        }
        return wrap(func, arity);
    }
}

export default JToolFunction;
