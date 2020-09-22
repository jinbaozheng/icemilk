/**
 * 对象工具类
 */
class ObjectTool {
    /**
     * 删除对象某个属性
     * @param target 对象
     * @param propertyKey 属性
     * @returns 是否删除成功
     */
    static deleteProperty(target: object, propertyKey: string): boolean {
        if (target) {
            return Reflect.deleteProperty(target, propertyKey);
        }
        return true;
    }

    /**
     * 安全的获取链式属性 eg: a.b.c.d
     * @param target 目标对象
     * @param pChain 对象链式属性
     * @returns {*}
     */
    static safeGet(target: object, ...pChain: any[]) {
        if (!target || !pChain || pChain.length <= 0) {
            return undefined;
        }
        let property = target;
        let chainIndex = 0;
        do {
            property = property[pChain[chainIndex++]]
        } while (property && (chainIndex < pChain.length))
        return chainIndex === pChain.length ? property : undefined;
    }

    static isEmptyObject(obj: object): boolean{
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    /**
     * 如果未知参数是对象 f返回该对象 如果是方法 则返回方法该方法的运行结果
     * @param obj 未知参数
     * @param args 如果是方法，则为方法参数
     */
    static getObjOrFuncResult(obj: object | Function, ...args: any): object{
        let o: object = null;
        if (obj){
            if (typeof obj == "function"){
                o = obj(...args);
            }
            if (typeof obj == "object"){
                o = obj;
            }
        }
        return o || {};
    }
}

export default ObjectTool;
