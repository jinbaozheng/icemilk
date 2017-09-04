/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || _assign2.default || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var JDataUnify_1 = require("../unify/JDataUnify");
var JNetwork_js_1 = require("./JNetwork.js");
var JUrlList_1 = require("../unify/JUrlList");
/**
 * 个人中心接口
 * @memberOf module:network
 */
var JNetworkMine = function () {
    function JNetworkMine() {}
    /**
     * 我的订单
     * @private
     * @returns {*}
     */
    JNetworkMine.mineOrderNeedLogin = function () {
        var loginParas = JNetwork_js_1.default.loginParas();
        if (!loginParas.hasAccount) {
            return JNetwork_js_1.default.failedAuthorizationNetwork();
        }
        var openId = loginParas.openId,
            sessionId = loginParas.sessionId;
        return JNetwork_js_1.default.POST(JUrlList_1.mineUrl.userorders, {
            openId: openId
        }, {
            openId: openId, sessionId: sessionId
        });
    };
    /***
     * 我的收藏(影院)
     */
    JNetworkMine.mineFavoriteCinemaNeedLogin = function () {
        var loginParas = JNetwork_js_1.default.loginParas();
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.mineUrl.jbzMineCinema, __assign({}, loginParas)).then(function (data) {
                resolve(JDataUnify_1.default('mineUrl.jbzMineCinema', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 我的收藏
     * @private
     * @returns {*}
     */
    JNetworkMine.mineFavoriteNeedLogin = function () {
        var loginParas = JNetwork_js_1.default.loginParas();
        if (!loginParas.hasAccount) {
            return JNetwork_js_1.default.failedAuthorizationNetwork();
        }
        var openId = loginParas.openId,
            sessionId = loginParas.sessionId;
        return JNetwork_js_1.default.POST(JUrlList_1.mineUrl.collectedcinemalist, {
            openId: openId
        }, {
            openId: openId, sessionId: sessionId
        });
    };
    return JNetworkMine;
}();
exports.default = JNetworkMine;
//# sourceMappingURL=JNetworkMine.js.map
