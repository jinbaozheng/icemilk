/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {filmUrl} from '../constant/JUrlList';
import ObjectTool from '../tool/JToolObject';
import DateTool from '../tool/JToolDate';

class NetworkFilmManager {

  /**
   * 获取热门电影
   * @param page 分页模型
   * @returns {Promise}
   */
  static filmHotfilms(page) {
    if (!page) {
      return new Promise((resolve, reject) => {
        NetworkManager.POST(filmUrl.jbzHotFilms).then(data => {
          resolve(data.hotFilms);
        }, error => {
          reject(error);
        });
      })
    } else {
      return new Promise((resolve, reject) => {
        NetworkManager.POST(filmUrl.jbzHotFilmsPage, {page: page.index, size: page.size}).then(data => {
          resolve(data.hotFilms);
        }, error => {
          reject(error);
        });
      });
    }
  }

  /**
   * 获取热门电影
   * @returns {{terminate, then}|*}
   */
  static filmHotfilmsSimple() {
    return new Promise((resolve, reject) => {
      NetworkManager.POST(filmUrl.jbzHotFilmsSimple).then(data => {
        resolve(data.hotFilms.map(film => {
          ObjectTool.deleteProperty(film, 'tails');
          return film;
        }));
      }, error => {
        reject(error);
      });
    })
  }

  /**
   * 获取待映电影
   * @param page 页号
   * @returns {Promise}
   */
  static filmWaitfilms(page) {
    if (!page) {
      return new Promise((resolve, reject) => {
        NetworkManager.POST(filmUrl.jbzWaitFilms).then(data => {
          resolve(data.filmsList);
        }, error => {
          reject(error);
        });
      })
    } else {
      return new Promise((resolve, reject) => {
        NetworkManager.POST(filmUrl.jbzWaitFilmsPage, {page: page.index, size: page.size}).then(data => {
          resolve(data.filmsList);
        }, error => {
          reject(error);
        });
      });
    }
  }

  /**
   * 获取影片详情
   * @param filmId 影片Id
   * @param platform 平台类型(默认使用jbz平台)
   * @returns {Promise}
   */
  static filmDetail(filmId, platform = null) {
    if (platform && platform !== 'jbz') {
      return new Promise((resolve, reject) => {
        NetworkManager.POST(filmUrl.jbzFilmDetailByPartner, {platformFilmId: filmId, platform}).then(data => {
          ObjectTool.deleteProperty(data.film, 'tails');
          resolve(data.film);
        }, error => {
          reject(error);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        NetworkManager.POST(filmUrl.jbzFilmDetail, {filmId}).then(data => {
          ObjectTool.deleteProperty(data.film, 'tails');
          resolve(data.film);
        }, error => {
          reject(error);
        });
      });
    }
  }

  /**
   * 获取影片排片日期列表
   * @param filmId 影片Id
   * @param cityId 城市Id
   * @returns {Promise}
   */
  static filmDateList(filmId, cityId) {
    return new Promise((resolve, reject) => {
      NetworkManager.POST(filmUrl.jbzFilmDate, {filmId, cityId}).then(data => {
        resolve(data.filmDate.map(dateString => {
          return DateTool.timeIntervalFromDate(dateString);
        }));
      }, error => {
        reject(error);
      })
    })
  }

  static filmDateListNeedLocation(filmId){
    console.log(NetworkManager.locationParas().cityId);
   return JNetworkFilm.filmDateList(filmId, NetworkManager.locationParas().cityId)
  }

}

export default NetworkFilmManager;
