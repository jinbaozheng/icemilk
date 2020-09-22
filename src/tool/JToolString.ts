/**
 * 字符串工具类
 */
class StringTool {
  /**
   * 校验是否为手机号码
   * @param mobile 手机号码
   * @returns 结果
   */
  static isMobile(mobile: string): boolean {
    return (/^1[1234567890]\d{9}$/.test(mobile));
  }

  /**
   * 校验是否为电话号码
   * @param phone 电话号码
   * @returns 结果
   */
  static isPhoneNumber(phone: string): boolean {
    return /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(phone);
  }

  /**
   * 检验是否为邮箱
   * @param email 邮箱
   * @returns 结果
   */
  static isEmail(email: string): boolean {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email);
  }

  /**
   * 校验是否为空字符串
   * @param string 字符串
   * @returns 结果
   */
  static isEmpty(string: string): boolean {
    return !(string && string !== '');
  }

  /**
   * 校验是否为验证码
   * @description 0~9 6位数字
   * @param verifyCode 验证码
   * @returns 结果
   */
  static isVerifyCode(verifyCode: string): boolean {
    return (/^[0-9]{6}$/.test(verifyCode));
  }

  /**
   * 校验是否为密码
   * @param password 密码
   * @param minLength 最小长度
   * @param maxLength 最大长度
   * @returns 结果
   */
  static isPassword(password: string, minLength: number, maxLength: number): boolean {
    if (minLength !== undefined && maxLength !== undefined) {
      return new RegExp("^[a-zA-Z0-9]{" +
        minLength + "," + maxLength +
        "}$").test(password);
    }
    return (/^[a-zA-Z0-9]{6,14}$/.test(password));
  }

  /**
   * 去除数字字符串左边的补位0
   * @param c 数字字符串
   * @returns {*}
   */
  static numberRemoveLeftZero(c: string): string{
    if (/^[0-9]*$/.test(c)) {
      return Number.parseInt(c) + '';
    }
    return c;
  }

  /**
   * 通过asc得出字符数值
   * @param ascChar asc字符
   * @returns 数值 A=0; B=1;
   */
  static numberFromASC(ascChar: string): number {
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
   * @param offset 非数字时的初始值
   * @returns 数值
   */
  static numberFromString(string:string, force: boolean, offset: number = 0): number {
    if (/^[0-9]*$/.test(string)) {
      return Number.parseInt(string);
    }
    let sum = offset ? offset : 0;
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
   * @returns 结果字符串
   */
  static clearSpace(string: string): string {
    // 过滤空格
    return string.replace(/\s+/g, '');
  }

  /**
   * 清除所有逗号
   * @param string 字符串
   * @returns 结果字符串
   */
  static clearComma(string: string): string {
    // 过滤空格
    return string.replace(/\u002c+/g, '').replace(/，+/g, '');
  }

  /**
   * 清除所有竖线
   * @param string 字符串
   * @returns 结果字符串
   */
  static clearVertical(string: string): string {
    // 过滤空格
    return string.replace(/\|+/g, '');
  }

  /**
   * 清除所有特殊字符
   * @description 即空格 逗号 及竖线
   * @param string 字符串
   * @returns 结果字符串
   */
  static clearClutter(string: string): string {
    let clearString = StringTool.clearSpace(string);
    clearString = StringTool.clearComma(clearString);
    clearString = StringTool.clearVertical(clearString);
    return clearString;
  }
}

export default StringTool;





