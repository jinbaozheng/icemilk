'use strict';
import leftPad from 'left-pad';

/**
 * 数字工具类
 */
class NumberTool {
  /**
   * 整数补0
   * @param number 整数
   * @param length 最终的长度
   * @returns 整数字符串
   */
  static zeroPad(number: number, length: number): string {
    return leftPad(number, length, 0);
  }

  /**
   * 字符补位
   * @param pad 字符
   * @param length 最终的长度
   * @param placeholder 补全字符
   * @returns 字符串
   */
  static leftPad(pad: string | number, length: number, placeholder: string | number = 0): string {
    return leftPad(pad, length, placeholder);
  }

  /**
   * 小数部分有效数字保留
   * @param number 数字
   * @param digits 小数保留位数
   * @returns 数字的字符串
   */
  static fixDigits(number: number, digits: number): string {
    return Number(number).toFixed(digits);
  }

  /**
   * 返回正整数的字符串
   * @description 非正整数返回指定字符串或空字符串
   * @param number 数字
   * @param text 非正整数的返回（可空）
   * @returns 正整数字符串或者指定字符串
   */
  static positiveText(number: number, text: string): string {
    if (number <= 0) {
      return text || '';
    } else {
      return number + '';
    }
  }
}

export default NumberTool;
