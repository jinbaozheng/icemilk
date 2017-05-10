/**
 * Created by cuppi on 2017/5/10.
 */

class ObjectTool{
  static deleteProperty(target, propertyKey){
    if (target){
      return Reflect.deleteProperty(target, propertyKey);
    }
    return true;
  }
}

export default ObjectTool;
