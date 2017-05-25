'use strict';

/**
 * 字符串工具类
 * @alias tool/JToolString
 */
class StringTool {

  /**
   * 校验是否为手机号码
   * @param mobile 手机号码
   * @returns {boolean}
   */
  static isMobile(mobile) {
    return (/^1[34578]\d{9}$/.test(mobile));
  }

  /**
   * 校验是否为电话号码
   * @param phone
   * @returns {boolean}
   */
  static isPhoneNumber(phone) {
    return /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(phone);
  }

  /**
   * 检验是否为邮箱
   * @param email
   */
  static isEmail(email) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email);
  }

  /**
   * 校验是否为空字符串
   * @param string
   * @returns {boolean}
   */
  static isEmpty(string) {
    return !(string && string !== '');
  }

  /**
   * 校验是否为验证码（即0~9 6位数字）
   * @param verifycode
   * @returns {boolean}
   */
  static isVerifyCode(verifycode) {
    return (/^[0-9]{6}$/.test(verifycode));
  }


  /**
   * 校验是否为密码
   * @param password 密码
   * @param minLength 最小长度
   * @param maxLength 最大长度
   * @returns {boolean}
   */
  static isPassword(password, minLength, maxLength) {
    if (minLength !== undefined && maxLength !== undefined) {
      return new RegExp("^[a-zA-Z0-9]{" +
        minLength + "," + maxLength +
        "}$").test(password);
    }
    return (/^[a-zA-Z0-9]{6,14}$/.test(password));
  }

  /**
   * 通过asc得出字符数值
   * @param ascChar
   * @returns {Number}
   */
  static numberFromASC(ascChar) {
    let asc = ascChar.charCodeAt(0);
    if (asc >= 65 && asc <= 90) {
      asc -= 65;
    } else if (asc >= 97 && asc <= 122) {
      asc -= 97;
    } else if (asc >= 48 && asc <= 57) {
      asc -= 48;
    } else {
      asc = 0;
    }
    return asc;
  }

  /**
   * 转换字符串到数字
   * @param string 字符串
   * @param force 是否强制转换非数字字符 (即为26进制数字)
   * @returns {number}
   */
  static numberFromString(string, force) {
    if (/^[0-9]*$/.test(string)) {
      return Number.parseInt(string);
    }
    let sum = 0;
    if (force) {
      for (let i = string.length - 1, radix = 1; i >= 0; i--, radix = radix * 26) {
        sum += StringTool.numberFromASC(string[i]) * radix;
      }
    }
    return sum;
  }

  /**
   * 清除所有空格字符
   * @param string 字符串
   */
  static clearSpace(string) {
    // 过滤空格
    let unSpaceString = string.replace(/\s+/g, '');
    return unSpaceString;
  }


  /**
   * 清除所有逗号
   * @param string 字符串
   */
  static clearComma(string) {
    // 过滤空格
    let unCommaString = string.replace(/\u002c+/g, '').replace(/，+/g, '');
    return unCommaString;
  }

  /**
   * 清除所有竖线
   * @param string 字符串
   */
  static clearVertical(string) {
    // 过滤空格
    let unVerticalString = string.replace(/\|+/g, '');
    return unVerticalString;
  }

  /**
   * 清除所有特殊字符
   * @param string 字符串
   * @returns {*}
   */
  static clearClutter(string) {
    let clearString = StringTool.clearSpace(string);
    clearString = StringTool.clearComma(clearString);
    clearString = StringTool.clearVertical(clearString);
    return clearString;
  }
}

export default StringTool;
