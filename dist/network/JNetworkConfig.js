"use strict";

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cuppi on 2017/4/14.
 */
var JNetwork_1 = require("./JNetwork");
var JUrlList_1 = require("../unify/JUrlList");
var JDataUnify_1 = require("../unify/JDataUnify");
var NetworkDelegate_1 = require("../delegate/NetworkDelegate");
/**
 * 请求配置类
 * @memberOf module:network
 */

var JNetworkConfig = function () {
    function JNetworkConfig() {
        (0, _classCallCheck3.default)(this, JNetworkConfig);
    }

    (0, _createClass3.default)(JNetworkConfig, null, [{
        key: "setConfig",
        value: function setConfig(config) {
            JNetwork_1.default.baseUrl = config.baseUrl;
            JNetwork_1.default.delegate = (0, _assign2.default)({}, NetworkDelegate_1.defaultInterceptor, config.delegate);
            JNetwork_1.default.carryData = config.carryData;
            var urlMap = config.urlMap,
                dataMap = config.dataMap;

            if (!urlMap || !dataMap) {
                console.log('Didn\'t find out the urlMap value or dataMap, do you forget it?');
            } else {
                JUrlList_1.UseConfig(urlMap);
                JDataUnify_1.UseConfig(dataMap);
            }
        }
    }]);
    return JNetworkConfig;
}();

exports.default = JNetworkConfig;
//# sourceMappingURL=JNetworkConfig.js.map
