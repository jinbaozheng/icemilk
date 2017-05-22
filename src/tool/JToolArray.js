/**
 * Created by cuppi on 2016/12/7.
 */

class ArrayTool {
  static isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
}

export default ArrayTool;
