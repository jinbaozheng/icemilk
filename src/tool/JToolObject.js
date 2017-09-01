/**
 * Created by cuppi on 2017/5/10.
 */

/**
 * 对象工具类
 * @memberOf module:tool
 */
class ObjectTool {
  /**
   * 删除对象某个属性
   * @param {object} target 对象
   * @param {string} propertyKey 属性
   * @returns {boolean} 是否删除成功
   */
  static deleteProperty(target, propertyKey) {
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
  static safeGet(target, ...pChain) {
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
}

export default ObjectTool;
