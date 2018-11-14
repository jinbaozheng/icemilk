"use strict";
/**
 * Created by cuppi on 2016/12/14.
 */

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var url_regex_1 = require("url-regex");
var url_pattern_1 = require("url-pattern");
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
        /** *********  待完善接口  ************ **/
        /**
         *
         * @param name
         * @returns {*}
         */
        // static getUrlQuery(name) {
        //   let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        //   let result = window.location.search.substr(1).match(reg);
        //   let inType = result ? decodeURIComponent(result[2]) : null;
        //   return inType;
        // }
        // static getNowUrl() {
        //   let nowUrl = window.location.href;
        //   nowUrl = nowUrl.substring(0, nowUrl.indexOf('#/'));
        //   return nowUrl
        // }
        /**
         * 分析Url并解析为对象结构
         * @param url 待分析Url
         * @param options 分析Url配置
         * @return Promise<object> 参数为解析后的结果，url无效时返回Null
         */

    }, {
        key: "portionFromUrl",
        value: function portionFromUrl(url, options) {
            return new _promise2.default(function (resolve, reject) {
                try {
                    var isUrl = url_regex_1.default().test(url);
                    if (isUrl) {
                        var portionData = new url_pattern_1.default(/^(http(s):\/\/)([\w.-]*)(:([0-9]*))?((\/[\w.-]*)+)?(\?([\w-=&]*))?#?\/?((([\w-]*(\/)?)+)?(\?(.*))?)?/, ['protocol', '', 'host', '', 'port', 'path', '', '', 'query', 'hash', 'hashpath', '', '', '', 'hashquery']).match(url);
                        if (options && options.complete) {
                            console.log(portionData.host);
                            var hrefPortion = new url_pattern_1.default("", {
                                segmentValueCharset: 'a-zA-Z0-9-_~ %/'
                            }).match(portionData.host);
                            portionData = (0, _assign2.default)({}, portionData, hrefPortion);
                        }
                        resolve(portionData);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    console.log(e);
                    reject(new Error('解析失败'));
                }
            });
        }
    }]);
    return UrlTool;
}();

exports.default = UrlTool;
//# sourceMappingURL=JToolUrl.js.map
