"use strict";
/**
 * Created by cuppi on 2017/4/19.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var package_json_1 = require("../../package.json");
var JSDK = function () {
    function JSDK() {}
    JSDK.version = function () {
        return package_json_1.default.version;
    };
    JSDK.readme = function () {
        return 'https://git.oschina.net/cuppi/jbzwebsdk/raw/master/JBZWebSDK%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-JNetwork.pdf';
    };
    JSDK.readmemd = function () {
        return 'https://git.oschina.net/cuppi/jbzwebsdk/blob/master/JBZWebSDK%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-JNetwork.md';
    };
    return JSDK;
}();
exports.default = JSDK;
//# sourceMappingURL=JSDK.js.map
