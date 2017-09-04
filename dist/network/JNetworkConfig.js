"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cuppi on 2017/4/14.
 */
var JNetwork_1 = require("./JNetwork");
var JUrlList_1 = require("../unify/JUrlList");
var JDataUnify_1 = require("../unify/JDataUnify");
/**
 * 请求配置类
 * @memberOf module:network
 */
var JNetworkConfig = function () {
    function JNetworkConfig() {}
    JNetworkConfig.setConfig = function (config) {
        JNetwork_1.default.baseUrl = config.baseUrl;
        JNetwork_1.default.delegate = config.delegate;
        var urlMap = config.urlMap,
            dataMap = config.dataMap;
        if (!urlMap || !dataMap) {
            console.log('Didn\'t find out the urlMap value or dataMap, do you forget it?');
        } else {
            JUrlList_1.UseConfig(urlMap);
            JDataUnify_1.UseConfig(dataMap);
        }
    };
    return JNetworkConfig;
}();
exports.default = JNetworkConfig;
//# sourceMappingURL=JNetworkConfig.js.map
