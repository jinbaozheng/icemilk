'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberTool = function () {
    function NumberTool() {
        _classCallCheck(this, NumberTool);
    }

    _createClass(NumberTool, null, [{
        key: 'prefixInteger',

        /**
         * 整数补0
         * @param number 整数
         * @param length 需要补0后整数的长度
         * @returns {*|Blob|string|ArrayBuffer|Array.<T>}  整数字符串
         */
        value: function prefixInteger(number, length) {
            return (Array(length).join(0) + number).slice(-length);
        }

        /**
         * 小数部分有效数字保留
         * @param number 数字
         * @param fixed 小数保留位数
         * @returns {string} 数字的字符串
         */

    }, {
        key: 'fixNumberTo',
        value: function fixNumberTo(number, fixed) {
            return Number(number).toFixed(fixed);
        }
    }]);

    return NumberTool;
}();

module.exports = NumberTool;