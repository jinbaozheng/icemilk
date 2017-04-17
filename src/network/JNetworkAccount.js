/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {accountUrl} from '../constant/JUrlList';

class NetworkAccountManager {
  /**
   * 用户登录
   * @param mobile 登录需要的手机号码
   * @param password 密码
   * @returns {{terminate, then}|*}
   */
  static accountLogin(mobile, password) {
    return NetworkManager.post(accountUrl.login, {
      mobile: mobile,
      password: password
    });
  }

  /**
   * 用户登出
   * @returns {{terminate, then}|*}
   */
  static accountLogout(sessionId) {
    return NetworkManager.post(accountUrl.logout, {}, sessionId);
  }

  /**
   * 获取验证码
   * @param mobile 接收验证码的手机号码
   * @param type 验证码类型 （1：注册使用 2：忘记密码使用）
   * @returns {{terminate, then}|*}
   */
  static accountGetVerifyCode(mobile, type) {
    return NetworkManager.post(accountUrl.verifycode, {
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
    return NetworkManager.post(accountUrl.register, {
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
    return NetworkManager.post(accountUrl.updatepass, {
      mobile: mobile,
      verifyCode: verfyCode,
      password: password
    });
  }
}

export default NetworkAccountManager;
