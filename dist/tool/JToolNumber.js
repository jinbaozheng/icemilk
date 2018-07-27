'use strict';

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var left_pad_1 = require("left-pad");
/**
 * 数字工具类
 * @memberOf module:tool
 */

var NumberTool = function () {
    function NumberTool() {
        (0, _classCallCheck3.default)(this, NumberTool);
    }

    (0, _createClass3.default)(NumberTool, null, [{
        key: "zeroPad",

        /**
         * 整数补0
         * @param {number} number 整数
         * @param {number} length 最终的长度
         * @returns {string}  整数字符串
         */
        value: function zeroPad(number, length) {
            return left_pad_1.default(number, length, 0);
        }
        /**
         * 字符补位
         * @param {number | string} pad 字符
         * @param {number} length 最终的长度
         * @param {number, string} placeholder 补全字符
         * @returns {string}  字符串
         */

    }, {
        key: "leftPad",
        value: function leftPad(pad, length) {
            var placeholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            return left_pad_1.default(pad, length, placeholder);
        }
        /**
         * 小数部分有效数字保留
         * @param {number} number 数字
         * @param {number} digits 小数保留位数
         * @returns {string} 数字的字符串
         */

    }, {
        key: "fixDigits",
        value: function fixDigits(number, digits) {
            return Number(number).toFixed(digits);
        }
        /**
         * 返回正整数的字符串（非正整数返回指定字符串或空字符串）
         * @param {number} number 数字
         * @param {string} text 非正整数的返回（可空）
         * @returns {string} 正整数字符串或者指定字符串
         */

    }, {
        key: "positiveText",
        value: function positiveText(number, text) {
            if (number <= 0) {
                return text || '';
            } else {
                return number + '';
            }
        }
    }]);
    return NumberTool;
}();

exports.default = NumberTool;
//# sourceMappingURL=JToolNumber.js.map
