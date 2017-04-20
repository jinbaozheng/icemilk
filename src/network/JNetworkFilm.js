/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {filmUrl} from '../constant/JUrlList';

class NetworkFilmManager {
    /**
     *  获取热门电影
     * @param cityId 城市Id
     * @param page 页号
     * @returns {*}
     */
    static filmHotfilms(cityId, page) {
      if(!page || page <= 0){
        return NetworkManager.POST(filmUrl.jbzHotFilms, {cityId});
      } else {
        return NetworkManager.POST(filmUrl.jbzHotFilmsPage, {cityId, page});
      }
    }

    /**
     * 获取待映电影
     * @param cityId 城市Id
     * @param page 页号
     * @returns {{terminate, then}|*}
     */
    static filmWaitfilms(cityId, page = 1) {
        return NetworkManager.POST(filmUrl.jbzWaitFilmsPage, {cityId: cityId, page: page});
    }

    /**
     * 获取影片详情
     * @param platformFilmId 影片ID
     * * @param platformId 平台id
     * @returns {*}
     */
    static filmDetail(filmId, platform) {
      if(platform){
        return NetworkManager.POST(filmUrl.jbzFilmDetail, {filmId, platform});
      } else {
        return NetworkManager.POST(filmUrl.jbzFilm, {id: filmId});
      }
    }

    /**
     * 获取所有电影列表
     * @returns {{terminate, then}|*}
     */
    static filmList(cityId) {
      return NetworkFilmManager.unrealizedMethod();
        // return NetworkManager.POST(filmUrl.jbzFilmList);
    }


}

export default NetworkFilmManager;
