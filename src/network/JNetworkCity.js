/**
 * Created by cuppi on 2016/11/30.
 * @module network
 */
'use strict';
import JNetwork from './JNetwork';
import {cityUrl} from '../unify/JUrlList';
import _ from '../unify/JDataUnify';

/**
 * 城市及定位接口
 * @hideconstructor
 */
class JNetworkCity {

  /**
   *  获取城市列表
   * @returns {*}
   */
  static cityList() {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzCities).then(data => {
        resolve(_('cityUrl.jbzCities', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   *  通过经纬度获取城市
   *  @param coordinate 位置信息
   * @returns {*}
   */
  static cityByCoordinate(coordinate) {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzCityByCoordinate, coordinate).then(data => {
        resolve(_('cityUrl.jbzCityByCoordinate', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**+
   * 通过经纬度获取城市（通过代理传递）
   * @returns {{terminate, then}|*}
   */
  static cityNeedCoordinate() {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzCityByCoordinate, {...JNetwork.locationParas()}).then(data => {
        resolve(_('cityUrl.jbzCityByCoordinate', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * 通过城市id获取城市
   * @param cityId
   * @returns {{terminate, then}|*}
   */
  static cityById(cityId) {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzCityById, {cityId}).then(data => {
        resolve(_('cityUrl.jbzCityById', data));
      }, error => {
        reject(error);
      });
    });
  }

  /**+
   * 获取地区列表
   * @param cityId
   * @returns {{terminate, then}|*}
   */
  static cityDistrictList(cityId) {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzDistricts, {cityId}).then(data => {
        resolve(_('cityUrl.jbzDistricts', data));
      }, error => {
        reject(error);
      });
    })
  }

  /**
   * 获取热门城市列表
   * @returns {{terminate, then}|*}
   */
  static cityHotList() {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzHotCities).then(data => {
        resolve(_('cityUrl.jbzHotCities', data));
      }, error => {
        reject(error);
      });
    });
  }
}

export default JNetworkCity;
