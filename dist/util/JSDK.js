"use strict";
/**
 * Created by cuppi on 2017/4/19.
 */

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var package_json_1 = require("../../package.json");

var JSDK = function () {
    function JSDK() {
        (0, _classCallCheck3.default)(this, JSDK);
    }

    (0, _createClass3.default)(JSDK, null, [{
        key: "version",
        value: function version() {
            return package_json_1.default.version;
        }
    }, {
        key: "readme",
        value: function readme() {
            return 'https://git.oschina.net/cuppi/jbzwebsdk/raw/master/JBZWebSDK%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-JNetwork.pdf';
        }
    }, {
        key: "readmemd",
        value: function readmemd() {
            return 'https://git.oschina.net/cuppi/jbzwebsdk/blob/master/JBZWebSDK%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-JNetwork.md';
        }
    }]);
    return JSDK;
}();

exports.default = JSDK;
//# sourceMappingURL=JSDK.js.map
