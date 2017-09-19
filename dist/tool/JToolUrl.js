"use strict";
/**
 * Created by cuppi on 2016/12/14.
 */

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 网络地址工具类
 * @memberOf module:tool
 */

var UrlTool = function () {
    function UrlTool() {
        (0, _classCallCheck3.default)(this, UrlTool);
    }

    (0, _createClass3.default)(UrlTool, null, [{
        key: "urlFromPortion",

        /**
         * 合成URL完整地址
         * @param {string} baseUrl 基础地址
         * @param {string} subUrl 相对地址
         * @param {string} parameters 参数
         * @returns {string} 返回拼接后的地址
         */
        value: function urlFromPortion(baseUrl, subUrl, parameters) {
            if (!parameters) {
                parameters = {};
            }
            var paras = [];
            for (var key in parameters) {
                if (!parameters.hasOwnProperty(key)) {
                    continue;
                }
                if (parameters[key] !== undefined) {
                    paras.push(key + '=' + parameters[key]);
                }
            }
            var iUrl = baseUrl + subUrl;
            if (paras.length > 0) {
                iUrl = iUrl + '?' + paras.join('&');
            }
            return iUrl;
        }
    }]);
    return UrlTool;
}();

exports.default = UrlTool;
//# sourceMappingURL=JToolUrl.js.map
