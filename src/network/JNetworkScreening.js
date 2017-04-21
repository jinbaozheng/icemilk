/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {screeningUrl} from '../constant/JUrlList';

class NetworkScreeningManager {
  /**
   * 获取指定影院基础数据(如影院电影排片和影院电话及地址)
   * @param cinemaId 影院Id
   * @returns {{terminate, then}|*}
   */
  static screeningFilmList(cinemaId) {
    let loginParas = NetworkManager.loginParas();
    return NetworkManager.POST(screeningUrl.jbzFilmList, {
      cinemaId: cinemaId
    }, loginParas.hasAccount ? {
        openId: loginParas.openId
      } : {});
  }

  /**
   * 获取指定影院排片日期安排
   * @param cinemaId 影院Id
   * @param filmId 影片Id
   * @returns {{terminate, then}|*}
   */
  static screeningDateList(cinemaId, filmId) {
    return NetworkManager.POST(screeningUrl.jbzDateList, {cinemaId, filmId});
  }

  /**
   * 获取指定影院排片放映厅安排
   * @param cinemaId 影院Id
   * @param filmId 影片Id
   * @param date 日期
   * @returns {{terminate, then}|*}
   */
  static screeningItems(cinemaId, filmId, date) {
    return NetworkManager.POST(screeningUrl.jbzItems, {cinemaId, filmId, date});
  }
}

export default NetworkScreeningManager;
