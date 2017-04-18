/**
 * Created by cuppi on 2016/11/29.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {cinemaUrl} from '../constant/JUrlList';

class NetworkCinemaManager {
  /**
   * 获取影院详情
   * @param cinemaId 影院ID
   * @returns {*}
   */
  static cinemaDetail(cinemaId) {
    return NetworkManager.POST(cinemaUrl.detail, {cinemaId});
  }

  /**
   * 根据影片Id获取影院的列表（比价）
   * @param filmId  影片Id
   * @param regionName 地域名字
   * @param orderType 排序类型
   * @returns {*} 返回影院列表
   */
  static cinemaContrastNeedLocation(filmId, regionName, orderType) {
    return NetworkManager.POST(cinemaUrl.cinemasbyregion, {
      ...NetworkManager.locationParas(),
      filmId,
      regionName,
      orderType
    });
  }

  /**
   * 获取影院的列表（比价，不需要影院Id）
   * @param regionName
   * @param orderType
   * @returns {{terminate, then}|*}
   */
  static cinemaContrastNoFilmNeedLocation(regionName, orderType) {
    return NetworkManager.POST(cinemaUrl.cinemaspage, {
      ...NetworkManager.locationParas(),
      regionName,
      orderType
    });
  }

  /**
   * 指定影院的排片的电影列表及影院本身的信息
   * @param cinemaId 影院ID
   * @returns {*}
   */
  static cinemaScreenings(cinemaId) {
    return NetworkManager.POST(cinemaUrl.screenings, {cinemaId});
  }

  /**
   * 指定影院的排片的最近日期列表
   * @param cinemaId 影院ID
   * @param filmId 影片ID
   * @returns {*}
   */
  static cinemaScreeningsDate(cinemaId, filmId) {
    return NetworkManager.POST(cinemaUrl.screeningsdate, {cinemaId, filmId});
  }

  /**
   * 指定影院的某个影片的某天的排片的详细信息
   * @param cinemaId 影院ID
   * @param filmId 影片ID
   * @param date 日期
   * @returns {*}
   */
  static cinemaScreeningsItem(cinemaId, filmId, date) {
    return NetworkManager.POST(cinemaUrl.screeningsitem, {cinemaId, filmId, date});
  }

  /**
   * 实时座位图
   * @param type 平台类型 （必须）
   * @param paras （根据不同平台变化）
   * @returns {*}
   */
  static cinemaSeat(type, paras) {
    if (type === 'meituan' || type === 'dazhong') {
      type = 'maoyan';
    }
    return NetworkManager.POST(cinemaUrl.realtimeseat, {type, ...paras, uuid: Math.random()});
  }

  /**
   * 影院列表 （已弃用）（临时使用了）
   * @param filmId 影片id
   * @returns {{terminate, then}|*}
   */
  static cinemaListNeedLocation(filmId) {
    return NetworkManager.POST(cinemaUrl.cinemas, {
      ...NetworkManager.locationParas(),
      filmId
    });
  }

  /**
   * 整合后的影院列表
   * @param filmid 影片Id
   * @param region 市区
   * @param order 排序
   * @param feature 特色
   * @param inType 后台为了判断请求的类型 （CinemaBuyList：2，CinemaListView：1）
   * @param date 日期
   * @returns {{terminate, then}|*}
   */
  static newCinemaListNeedLocation(filmid, region, order, feature, inType, date) {
    return NetworkManager.POST(cinemaUrl.list,
      {
        ...NetworkManager.locationParas(),
        filmId: filmid,
        regionName: region,
        orderType: order,
        feature: feature,
        inType: inType,
        date: date
      })
  }

  /**
   * 收藏影院
   * @param cinemaId 影院Id
   * @param cinemaName 影院名字
   * @returns {{terminate, then}|*}
   */
  static cinemaFavoriteCinemaNeedLogin(cinemaId, cinemaName) {
    let loginParas = NetworkManager.locationParas();
    if (!loginParas.hasAccount) {
      return NetworkManager.failedAuthorizationNetwork();
    }
    return NetworkManager.POST(cinemaUrl.collectcinema, {
      openId: loginParas.openId,
      cinemaId: cinemaId,
      cinemaName: cinemaName
    }, {
      'sessionId': loginParas.sessionId
    });

  }

  /**
   * 取消收藏影院
   * @param cinemaId 影院Id
   * @returns {{terminate, then}|*}
   */
  static cinemaCancelFavoriteCinemaNeedLogin(cinemaId) {
    let loginParas = NetworkManager.locationParas();
    if (!loginParas.hasAccount) {
      return NetworkManager.failedAuthorizationNetwork();
    }
    return NetworkManager.POST(cinemaUrl.cancelcollectcinema, {
      openId: loginParas.openId,
      cinemaId: cinemaId
    }, {
      'sessionId': loginParas.sessionId
    });
  }
}

export default NetworkCinemaManager;
