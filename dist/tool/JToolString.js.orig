'use strict';

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 字符串工具类
 * @memberOf module:tool
 */

var StringTool = function () {
    function StringTool() {
        (0, _classCallCheck3.default)(this, StringTool);
    }
<<<<<<< HEAD

    (0, _createClass3.default)(StringTool, null, [{
        key: 'isMobile',

        /**
         * 校验是否为手机号码
         * @param {string} mobile 手机号码
         * @returns {boolean} 结果
         */
        value: function isMobile(mobile) {
            return (/^1[34578]\d{9}$/.test(mobile)
            );
=======
  }, {
    key: 'isVerifyCode',
    value: function isVerifyCode(verifycode) {
      return (/^[0-9]{6}$/.test(verifycode)
      );
    }
  }, {
    key: 'isPassword',
    value: function isPassword(password, minLength, maxLength) {
      if (minLength !== undefined && maxLength !== undefined) {
        return new RegExp("^[a-zA-Z0-9]{" + minLength + "," + maxLength + "}$").test(password);
      }
      return (/^[a-zA-Z0-9]{6,14}$/.test(password)
      );
    }
  }, {
    key: 'numberRemoveLeftZero',
    value: function numberRemoveLeftZero(c) {
      if (/^[0-9]*$/.test(c)) {
        return (0, _parseInt2.default)(c) + '';
      }
      return c;
    }
  }, {
    key: 'numberFromASC',
    value: function numberFromASC(ascChar) {
      var asc = ascChar.charCodeAt(0);
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
  }, {
    key: 'numberFromString',
    value: function numberFromString(string, force, offset) {
      if (/^[0-9]*$/.test(string)) {
        return (0, _parseInt2.default)(string);
      }
      var sum = offset ? offset : 0;
      if (force) {
        for (var i = string.length - 1, radix = 1; i >= 0; i--, radix = radix * 26) {
          sum += StringTool.numberFromASC(string[i]) * radix;
>>>>>>> e13f47324e500524629d57d9d116ace213b0ff0b
        }
        /**
         * 校验是否为电话号码
         * @param {string} phone 电话号码
         * @returns {boolean} 结果
         */

    }, {
        key: 'isPhoneNumber',
        value: function isPhoneNumber(phone) {
            return (/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(phone)
            );
        }
        /**
         * 检验是否为邮箱
         * @param {string} email 邮箱
         * @returns {boolean} 结果
         */

    }, {
        key: 'isEmail',
        value: function isEmail(email) {
            return (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)
            );
        }
        /**
         * 校验是否为空字符串
         * @param {string} string 字符串
         * @returns {boolean} 结果
         */

    }, {
        key: 'isEmpty',
        value: function isEmpty(string) {
            return !(string && string !== '');
        }
        /**
         * 校验是否为验证码（即0~9 6位数字）
         * @param {string} verifycode 验证码
         * @returns {boolean} 结果
         */

    }, {
        key: 'isVerifyCode',
        value: function isVerifyCode(verifycode) {
            return (/^[0-9]{6}$/.test(verifycode)
            );
        }
        /**
         * 校验是否为密码
         * @param {string} password 密码
         * @param {number} minLength 最小长度
         * @param {number} maxLength 最大长度
         * @returns {boolean} 结果
         */

    }, {
        key: 'isPassword',
        value: function isPassword(password, minLength, maxLength) {
            if (minLength !== undefined && maxLength !== undefined) {
                return new RegExp("^[a-zA-Z0-9]{" + minLength + "," + maxLength + "}$").test(password);
            }
            return (/^[a-zA-Z0-9]{6,14}$/.test(password)
            );
        }
        /**
         * 通过asc得出字符数值
         * @param {string} ascChar asc字符
         * @returns {number} 数值 A=0; B=1;
         */

    }, {
        key: 'numberFromASC',
        value: function numberFromASC(ascChar) {
            var asc = ascChar.charCodeAt(0);
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
         * @param {string} string 字符串
         * @param {boolean} force 是否强制转换非数字字符 (即为26进制数字)
         * @param {number} offset 非数字时的初始值
         * @returns {number} 数值
         */

    }, {
        key: 'numberFromString',
        value: function numberFromString(string, force, offset) {
            if (/^[0-9]*$/.test(string)) {
                return (0, _parseInt2.default)(string);
            }
            var sum = offset ? offset : 0;
            if (force) {
                for (var i = string.length - 1, radix = 1; i >= 0; i--, radix = radix * 26) {
                    sum += StringTool.numberFromASC(string[i]) * radix;
                }
            }
            return sum;
        }
        /**
         * 清除所有空格字符
         * @param {string} string 字符串
         * @returns {string} 结果字符串
         */

    }, {
        key: 'clearSpace',
        value: function clearSpace(string) {
            // 过滤空格
            return string.replace(/\s+/g, '');
        }
        /**
         * 清除所有逗号
         * @param {string} string 字符串
         * @returns {string} 结果字符串
         */

    }, {
        key: 'clearComma',
        value: function clearComma(string) {
            // 过滤空格
            return string.replace(/\u002c+/g, '').replace(/，+/g, '');
        }
        /**
         * 清除所有竖线
         * @param {string} string 字符串
         * @returns {string} 结果字符串
         */

    }, {
        key: 'clearVertical',
        value: function clearVertical(string) {
            // 过滤空格
            return string.replace(/\|+/g, '');
        }
        /**
         * 清除所有特殊字符
         * @param {string} string 字符串
         * @returns {string} 结果字符串
         */

    }, {
        key: 'clearClutter',
        value: function clearClutter(string) {
            var clearString = StringTool.clearSpace(string);
            clearString = StringTool.clearComma(clearString);
            clearString = StringTool.clearVertical(clearString);
            return clearString;
        }
    }]);
    return StringTool;
}();

exports.default = StringTool;
//# sourceMappingURL=JToolString.js.map
