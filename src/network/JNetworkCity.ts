/**
 * Created by cuppi on 2016/11/30.
 */
'use strict';
import JNetwork from './JNetwork';
import {cityUrl} from '../unify/JUrlList';
import _ from '../unify/JDataUnify';
import JPromise from "../structure/JPromise";
import JNetworkRoot from "./JNetworkRoot";

/**
 * 城市及定位接口
 * @memberOf module:network
 * @hideconstructor
 */
class JNetworkCity extends JNetworkRoot{
  /**
   *  获取城市列表
   * @returns {*}
   */
  cityList() {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzCities).useParas(...this.otherParas).then(data => {
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
  cityByCoordinate(coordinate) {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzCityByCoordinate, coordinate).useParas(...this.otherParas).then(data => {
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
  cityNeedCoordinate() {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzCityByCoordinate, {...JNetwork.locationParas()}).useParas(...this.otherParas).then(data => {
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
  cityById(cityId) {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzCityById, {cityId}).useParas(...this.otherParas).then(data => {
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
  cityDistrictList(cityId) {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzDistricts, {cityId}).useParas(...this.otherParas).then(data => {
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
  cityHotList() {
    return new Promise((resolve, reject) => {
      JNetwork.POST(cityUrl.jbzHotCities).useParas(...this.otherParas).then(data => {
        resolve(_('cityUrl.jbzHotCities', data));
      }, error => {
        reject(error);
      });
    });
  }

  static cityList() {
    return this.instance().cityList();
  }

  static cityByCoordinate(coordinate) {
    return this.instance().cityByCoordinate(coordinate);
  }

  static cityNeedCoordinate() {
    return this.instance().cityNeedCoordinate();
  }

  static cityById(cityId) {
    return this.instance().cityById(cityId);
  }

  static cityDistrictList(cityId) {
    return this.instance().cityDistrictList(cityId);
  }

  static cityHotList() {
    return this.instance().cityHotList();
  }
}

export default JNetworkCity;
