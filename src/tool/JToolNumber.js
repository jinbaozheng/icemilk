'use strict';

class NumberTool {
  /**
   * 整数补0
   * @param number 整数
   * @param length 需要补0后整数的长度
   * @returns {*|Blob|string|ArrayBuffer|Array.<T>}  整数字符串
   */
    static prefixInteger(number, length){
        return (Array(length).join(0) + number).slice(-length);
    }

  /**
   * 小数部分有效数字保留
   * @param number 数字
   * @param fixed 小数保留位数
   * @returns {string} 数字的字符串
   */
    static fixNumberTo(number, fixed){
        return Number(number).toFixed(fixed);
    }
}

export default NumberTool;
