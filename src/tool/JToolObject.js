/**
 * Created by cuppi on 2017/5/10.
 */

/**
 * 对象工具类
 * @alias tool/JToolObject
 */
class ObjectTool{
  /**
   * 删除对象某个属性
   * @param target 对象
   * @param propertyKey 属性
   * @returns {boolean}
   */
  static deleteProperty(target, propertyKey){
    if (target){
      return Reflect.deleteProperty(target, propertyKey);
    }
    return true;
  }
}

export default ObjectTool;
