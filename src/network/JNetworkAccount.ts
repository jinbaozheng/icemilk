/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';
import JNetwork from './JNetwork.ts';
import {accountUrl} from '../unify/JUrlList';
import JNetworkRoot from "./JNetworkRoot";

/**
 * 账户接口
 * @memberOf module:network
 */
class JNetworkAccount extends JNetworkRoot{
  /**
   * 用户登录
   * @param {string} mobile 登录需要的手机号码
   * @param {string} password 登录需要的密码
   * @returns {{terminate, then}|*}
   */
  accountLogin(mobile, password) {
    return JNetwork.POST(accountUrl.jbzLogin, {
      mobile: mobile,
      password: password
    }).useParas(...this.otherParas);
  }

  /**
   * 用户登出
   * @param sessionId 用户登录标识
   * @returns {{terminate, then}|*}
   */
  accountLogout(sessionId) {
    return JNetwork.POST(accountUrl.jbzLogout, {}, sessionId).useParas(...this.otherParas);
  }

  /**
   * 获取验证码
   * @param mobile 接收验证码的手机号码
   * @param type 验证码类型 （1：注册使用 2：忘记密码使用）
   * @returns {{terminate, then}|*}
   */
  accountVerifyCode(mobile, type) {
    return JNetwork.POST(accountUrl.jbzVerifycode, {
      mobile: mobile,
      codetype: type
    }).useParas(...this.otherParas);
  }

  /**
   * 注册用户
   * @param mobile 用户的手机号码
   * @param verifyCode 验证码
   * @param password 密码
   * @returns {{terminate, then}|*}
   */
  accountRegister(mobile, verifyCode, password) {
    return JNetwork.POST(accountUrl.jbzRegister, {
      mobile: mobile,
      verifyCode: verifyCode,
      password: password
    }).useParas(...this.otherParas);
  }

  /**
   * 忘记密码并且找回密码
   * @param mobile 手机号码
   * @param verfyCode 验证码
   * @param password 新密码
   * @returns {{terminate, then}|*}
   */
  accountUpdatepass(mobile, verfyCode, password) {
    return JNetwork.POST(accountUrl.jbzUpdatepass, {
      mobile: mobile,
      verifyCode: verfyCode,
      password: password
    }).useParas(...this.otherParas);
  }

  static accountLogin(mobile, password) {
    return this.instance().accountLogin(mobile, password);
  }

  static accountLogout(sessionId) {
    return this.instance().accountLogout(sessionId);
  }

  static accountVerifyCode(mobile, type) {
    return this.instance().accountVerifyCode(mobile, type);
  }

  static accountRegister(mobile, verifyCode, password) {
    return this.instance().accountRegister(mobile, verifyCode, password);
  }

  static accountUpdatepass(mobile, verfyCode, password) {
    return this.instance().accountUpdatepass(mobile, verfyCode, password);
  }
}

export default JNetworkAccount;
