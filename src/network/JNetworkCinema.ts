/**
 * Created by cuppi on 2016/11/29.
 */
'use strict';
import JNetwork from './JNetwork.ts';
import {cinemaUrl} from '../unify/JUrlList';
import DateTool from '../tool/JToolDate';
import _ from '../unify/JDataUnify';
import SeatManager from '../util/JManagerSeat';
import CinemaFilterModel from "../paras/CinemaFilterParas";
import JNetworkRoot from './JNetworkRoot';

/**
 * 影院接口
 * @memberOf module:network
 */
class JNetworkCinema extends JNetworkRoot{
  /**
   * 获取影院详情
   * @param {string} cinemaId 影院ID
   * @returns {Promise} promise
   */
  cinemaDetail(cinemaId) {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cinemaUrl.jbzDetail, {cinemaId}).useParas(...this.otherParas).useHeaders(...this.otherHeaders).then(data => {
        resolve(_('cinemaUrl.jbzDetail', data, 0));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * 影院列表
   * @param {} location
   * @param {cinemaFilter} CinemaFilterModel
   * @returns {Promise}
   */
  cinemaList(location: any, cinemaFilter: CinemaFilterModel);
  cinemaList(cinemaFilter: CinemaFilterModel);
  cinemaList(location: any, cinemaFilter?: any){
    if (cinemaFilter == undefined){
      cinemaFilter = location;
    }
    return new Promise((resolve, reject) => {
      let u = undefined;
      let {filmId, feature, region, sort, limit} = cinemaFilter ? cinemaFilter : {filmId: u, feature: u, region: u, sort: u, limit: u};
      JNetwork.POST(cinemaUrl.jbzList, {
        ...location,
        filmId,
        feature,
        regionName: region,
        orderType: sort,
        limit
      }).useParas(...this.otherParas).then(data => {
        resolve(_('cinemaUrl.jbzList', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * 获取指定影院排片
   * @param cinemaId 影院Id
   * @returns {{terminate, then}|*}
   */
  cinemaScreeningFilmList(cinemaId) {
    return new Promise((resolve, reject) => {
      return JNetwork.POST(cinemaUrl.jbzScreeningFilmList, {
        cinemaId
      }).useParas(...this.otherParas).useHeaders(...this.otherHeaders).then(data => {
        resolve(_('cinemaUrl.jbzScreeningFilmList', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * 获取指定影院排片日期安排
   * @param cinemaId 影院Id
   * @param filmId 影片Id
   * @returns {{terminate, then}|*}
   */
  cinemaScreeningDateList(cinemaId, filmId) {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cinemaUrl.jbzScreeningDateList, {cinemaId, filmId}).useParas(...this.otherParas).then(data => {
        resolve(_('cinemaUrl.jbzScreeningDateList', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * 获取指定影院排片放映厅安排
   * @param cinemaId 影院Id
   * @param filmId 影片Id
   * @param date 日期（时间戳标示）
   * @returns {{terminate, then}|*}
   */
  cinemaScreeningItems(cinemaId, filmId, date) {
    return new Promise((resolve, reject) => {
      date = DateTool.dateStringFromTimeInterval(date, 'yyyy-MM-dd');
      JNetwork.POST(cinemaUrl.jbzScreeningItems, {cinemaId, filmId, date}).useParas(...this.otherParas).then(data => {
        resolve(_('cinemaUrl.jbzScreeningItems', data));
      }, error => {
        reject(error);
      });
    });
  };

  /**
   * 实时座位图
   * @param type 平台类型 （必须）
   * @param paras （根据不同平台变化）
   * @returns {*}
   */
  cinemaSeats(type, paras) {
    if (type === 'meituan' || type === 'dazhong') {
      type = 'maoyan';
    }
    return new Promise((resolve, reject) => {
      JNetwork.POST(cinemaUrl.jbzRealtimeSeat, {type, ...paras}).useParas(...this.otherParas).then(data => {
        resolve(_('cinemaUrl.jbzRealtimeSeat', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * 智能实时座位图
   * @param type 平台类型 （必须）
   * @param paras （根据不同平台变化）
   * @returns {*}
   */
  cinemaSmartSeats(type, paras) {
    if (type === 'meituan' || type === 'dazhong') {
      type = 'maoyan';
    }
    return new Promise((resolve, reject) => {
      JNetwork.POST(cinemaUrl.jbzRealtimeSeat, {type, ...paras}).useParas(...this.otherParas).then(data => {
        resolve(SeatManager.defaultManager().smartSeatsFromSeats(type, _('cinemaUrl.jbzRealtimeSmartSeat', data)));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * 收藏影院
   * @param cinemaId 影院Id
   * @param cinemaName 影院名字
   * @returns {{terminate, then}|*}
   */
  cinemaFavoriteCinema(cinemaId, cinemaName) {
    return JNetwork.POST(cinemaUrl.jbzCollectcinema, {
      cinemaId: cinemaId,
      cinemaName: cinemaName
    }).useParas(...this.otherParas).useHeaders(...this.otherHeaders);
  }

  /**
   * 取消收藏影院
   * @param cinemaId 影院Id
   * @returns {{terminate, then}|*}
   */
  cinemaCancelFavoriteCinema(cinemaId) {
    return JNetwork.POST(cinemaUrl.jbzCancelcollectcinema, {
    }).useParas(...this.otherParas);
  }

  static cinemaDetail(cinemaId) {
    return this.instance().cinemaDetail(cinemaId);
  }

  static cinemaList(cinemaFilter: CinemaFilterModel);
  static cinemaList(location: any, cinemaFilter: CinemaFilterModel);
  static cinemaList(a: any, b?: any) {
    return this.instance().cinemaList(a, b);
  }

  static cinemaScreeningFilmList(cinemaId) {
    return this.instance().cinemaScreeningFilmList(cinemaId);
  }

  static cinemaScreeningDateList(cinemaId, filmId) {
    return this.instance().cinemaScreeningDateList(cinemaId, filmId);
  }

  static cinemaScreeningItems(cinemaId, filmId, date) {
    return this.instance().cinemaScreeningItems(cinemaId, filmId, date);
  };

  static cinemaSeats(type, paras) {
    return this.instance().cinemaSeats(type, paras);
  }

  static cinemaSmartSeats(type, paras) {
    return this.instance().cinemaSmartSeats(type, paras);
  }

  static cinemaFavoriteCinema(cinemaId, cinemaName) {
    return this.instance().cinemaFavoriteCinema(cinemaId, cinemaName);
  }

  static cinemaCancelFavoriteCinema(cinemaId) {
    return this.instance().cinemaCancelFavoriteCinema(cinemaId);
  }
}

export default JNetworkCinema;
