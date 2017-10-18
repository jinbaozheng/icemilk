/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var JUrlList_1 = require("../unify/JUrlList");
var JNetworkRoot_1 = require("./JNetworkRoot");
/**
 * 账户接口
 * @memberOf module:network
 */

var JNetworkAccount = function (_JNetworkRoot_1$defau) {
    (0, _inherits3.default)(JNetworkAccount, _JNetworkRoot_1$defau);

    function JNetworkAccount() {
        (0, _classCallCheck3.default)(this, JNetworkAccount);
        return (0, _possibleConstructorReturn3.default)(this, (JNetworkAccount.__proto__ || (0, _getPrototypeOf2.default)(JNetworkAccount)).apply(this, arguments));
    }

    (0, _createClass3.default)(JNetworkAccount, [{
        key: "accountLogin",

        /**
         * 用户登录
         * @param {string} mobile 登录需要的手机号码
         * @param {string} password 登录需要的密码
         * @returns {{terminate, then}|*}
         */
        value: function accountLogin(mobile, password) {
            return this.prefixPromise(JUrlList_1.accountUrl.jbzLogin, {
                mobile: mobile,
                password: password
            });
        }
        /**
         * 用户登出
         * @param sessionId 用户登录标识
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "accountLogout",
        value: function accountLogout(sessionId) {
            return this.prefixPromise(JUrlList_1.accountUrl.jbzLogout, {}, sessionId);
        }
        /**
         * 获取验证码
         * @param mobile 接收验证码的手机号码
         * @param type 验证码类型 （1：注册使用 2：忘记密码使用）
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "accountVerifyCode",
        value: function accountVerifyCode(mobile, type) {
            return this.prefixPromise(JUrlList_1.accountUrl.jbzVerifycode, {
                mobile: mobile,
                codetype: type
            });
        }
        /**
         * 注册用户
         * @param mobile 用户的手机号码
         * @param verifyCode 验证码
         * @param password 密码
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "accountRegister",
        value: function accountRegister(mobile, verifyCode, password) {
            return this.prefixPromise(JUrlList_1.accountUrl.jbzRegister, {
                mobile: mobile,
                verifyCode: verifyCode,
                password: password
            });
        }
        /**
         * 忘记密码并且找回密码
         * @param mobile 手机号码
         * @param verfyCode 验证码
         * @param password 新密码
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "accountUpdatepass",
        value: function accountUpdatepass(mobile, verfyCode, password) {
            return this.prefixPromise(JUrlList_1.accountUrl.jbzUpdatepass, {
                mobile: mobile,
                verifyCode: verfyCode,
                password: password
            });
        }
    }], [{
        key: "accountLogin",
        value: function accountLogin(mobile, password) {
            return this.instance().accountLogin(mobile, password);
        }
    }, {
        key: "accountLogout",
        value: function accountLogout(sessionId) {
            return this.instance().accountLogout(sessionId);
        }
    }, {
        key: "accountVerifyCode",
        value: function accountVerifyCode(mobile, type) {
            return this.instance().accountVerifyCode(mobile, type);
        }
    }, {
        key: "accountRegister",
        value: function accountRegister(mobile, verifyCode, password) {
            return this.instance().accountRegister(mobile, verifyCode, password);
        }
    }, {
        key: "accountUpdatepass",
        value: function accountUpdatepass(mobile, verfyCode, password) {
            return this.instance().accountUpdatepass(mobile, verfyCode, password);
        }
    }]);
    return JNetworkAccount;
}(JNetworkRoot_1.default);

exports.default = JNetworkAccount;
//# sourceMappingURL=JNetworkAccount.js.map
