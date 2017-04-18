/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {filmUrl} from '../constant/JUrlList';

class NetworkFilmManager {
    /**
     *  获取热门电影
     * @returns {*}
     */
    static filmHotfilms() {
        return NetworkManager.POST(filmUrl.hotfilms, {});
    }

    /**
     * 获取热门电影
     * @param cityId 城市Id
     * @param page 页号
     * @returns {{terminate, then}|*}
     */
    static filmHotfilmsWithPage(cityId, page = 1) {
        return NetworkManager.POST(filmUrl.hotfilmspage, {cityId: cityId, page: page});
    }

    /**
     * 获取待映电影
     * @param cityId
     * @param page
     * @returns {{terminate, then}|*}
     */
    static filmWaitfilmsWithPage(cityId, page = 1) {
        return NetworkManager.POST(filmUrl.waitfilmspage, {cityId: cityId, page: page});
    }

    /**
     * 获取影片详情
     * @param platformFilmId 影片ID
     * * @param platformId 平台id
     * @returns {*}
     */
    static filmDetail(platformFilmId, platformId) {
        return NetworkManager.POST(filmUrl.detailInfo, {platformFilmId, platformId});
    }

    /**
     * 获取所有电影列表
     * @param filmId 影院Id
     * @returns {{terminate, then}|*}
     */
    static filmList() {
        return NetworkManager.POST(filmUrl.list);
    }

    /**
     * 获取指定影片
     * @param filmId
     * @returns {{terminate, then}|*}
     */
    static filmWithFilmId(filmId) {
        return NetworkManager.POST(filmUrl.film, {id: filmId});
    }
}

export default NetworkFilmManager;
