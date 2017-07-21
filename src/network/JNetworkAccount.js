/**
 * Created by cuppi on 2017/3/6.
 * @module network
 */
'use strict';
import JNetwork from './JNetwork.js';
import {accountUrl} from '../unify/JUrlList';

/**
 * 账户接口
 */
class JNetworkAccount{
  /**
   * 用户登录
   * @param {string} mobile 登录需要的手机号码
   * @param {string} password 登录需要的密码
   * @returns {{terminate, then}|*}
   */
  static accountLogin(mobile, password) {
    return JNetwork.POST(accountUrl.jbzLogin, {
      mobile: mobile,
      password: password
    });
  }

  /**
   * 用户登出
   * @param sessionId 用户登录标识
   * @returns {{terminate, then}|*}
   */
  static accountLogout(sessionId) {
    return JNetwork.POST(accountUrl.jbzLogout, {}, sessionId);
  }

  /**
   * 获取验证码
   * @param mobile 接收验证码的手机号码
   * @param type 验证码类型 （1：注册使用 2：忘记密码使用）
   * @returns {{terminate, then}|*}
   */
  static accountVerifyCode(mobile, type) {
    return JNetwork.POST(accountUrl.jbzVerifycode, {
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
  static accountRegister(mobile, verifyCode, password) {
    return JNetwork.POST(accountUrl.jbzRegister, {
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
  static accountUpdatepass(mobile, verfyCode, password) {
    return JNetwork.POST(accountUrl.jbzUpdatepass, {
      mobile: mobile,
      verifyCode: verfyCode,
      password: password
    });
  }
}

export default JNetworkAccount;
