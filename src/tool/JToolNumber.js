'use strict';
import leftPad from 'left-pad';

/**
 * 数字工具类
 * @alias tool/JToolNumber
 */
class NumberTool {
  /**
   * 整数补0
   * @param number 整数
   * @param length 最终的长度
   * @returns {*|Blob|string|ArrayBuffer|Array.<T>}  整数字符串
   */
  static zeroPad(number, length) {
    return leftPad(number, length);
  }

  /**
   * 小数部分有效数字保留
   * @param number 数字
   * @param digits 小数保留位数
   * @returns {string} 数字的字符串
   */
  static fixDigits(number, digits) {
    return Number(number).toFixed(digits);
  }

  /**
   * 返回正整数的字符串（非正整数返回指定字符串或空字符串）
   * @param number 数字
   * @param text 非正整数的返回（可空）
   * @returns {*}
   */
  static positiveText(number, text) {
    if (number <= 0) {
      return text ? text : '';
    } else {
      return number + '';
    }
  }
}

export default NumberTool;
