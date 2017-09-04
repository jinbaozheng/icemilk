'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var left_pad_1 = require("left-pad");
/**
 * 数字工具类
 * @memberOf module:tool
 */
var NumberTool = function () {
    function NumberTool() {}
    /**
     * 整数补0
     * @param {number} number 整数
     * @param {number} length 最终的长度
     * @returns {string}  整数字符串
     */
    NumberTool.zeroPad = function (number, length) {
        return left_pad_1.default(number, length);
    };
    /**
     * 小数部分有效数字保留
     * @param {number} number 数字
     * @param {number} digits 小数保留位数
     * @returns {string} 数字的字符串
     */
    NumberTool.fixDigits = function (number, digits) {
        return Number(number).toFixed(digits);
    };
    /**
     * 返回正整数的字符串（非正整数返回指定字符串或空字符串）
     * @param {number} number 数字
     * @param {string} text 非正整数的返回（可空）
     * @returns {string} 正整数字符串或者指定字符串
     */
    NumberTool.positiveText = function (number, text) {
        if (number <= 0) {
            return text ? text : '';
        } else {
            return number + '';
        }
    };
    return NumberTool;
}();
exports.default = NumberTool;
//# sourceMappingURL=JToolNumber.js.map
