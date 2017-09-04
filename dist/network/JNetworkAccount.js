/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var JNetwork_js_1 = require("./JNetwork.js");
var JUrlList_1 = require("../unify/JUrlList");
/**
 * 账户接口
 * @memberOf module:network
 */
var JNetworkAccount = function () {
    function JNetworkAccount() {}
    /**
     * 用户登录
     * @param {string} mobile 登录需要的手机号码
     * @param {string} password 登录需要的密码
     * @returns {{terminate, then}|*}
     */
    JNetworkAccount.accountLogin = function (mobile, password) {
        return JNetwork_js_1.default.POST(JUrlList_1.accountUrl.jbzLogin, {
            mobile: mobile,
            password: password
        });
    };
    /**
     * 用户登出
     * @param sessionId 用户登录标识
     * @returns {{terminate, then}|*}
     */
    JNetworkAccount.accountLogout = function (sessionId) {
        return JNetwork_js_1.default.POST(JUrlList_1.accountUrl.jbzLogout, {}, sessionId);
    };
    /**
     * 获取验证码
     * @param mobile 接收验证码的手机号码
     * @param type 验证码类型 （1：注册使用 2：忘记密码使用）
     * @returns {{terminate, then}|*}
     */
    JNetworkAccount.accountVerifyCode = function (mobile, type) {
        return JNetwork_js_1.default.POST(JUrlList_1.accountUrl.jbzVerifycode, {
            mobile: mobile,
            codetype: type
        });
    };
    /**
     * 注册用户
     * @param mobile 用户的手机号码
     * @param verifyCode 验证码
     * @param password 密码
     * @returns {{terminate, then}|*}
     */
    JNetworkAccount.accountRegister = function (mobile, verifyCode, password) {
        return JNetwork_js_1.default.POST(JUrlList_1.accountUrl.jbzRegister, {
            mobile: mobile,
            verifyCode: verifyCode,
            password: password
        });
    };
    /**
     * 忘记密码并且找回密码
     * @param mobile 手机号码
     * @param verfyCode 验证码
     * @param password 新密码
     * @returns {{terminate, then}|*}
     */
    JNetworkAccount.accountUpdatepass = function (mobile, verfyCode, password) {
        return JNetwork_js_1.default.POST(JUrlList_1.accountUrl.jbzUpdatepass, {
            mobile: mobile,
            verifyCode: verfyCode,
            password: password
        });
    };
    return JNetworkAccount;
}();
exports.default = JNetworkAccount;
//# sourceMappingURL=JNetworkAccount.js.map
