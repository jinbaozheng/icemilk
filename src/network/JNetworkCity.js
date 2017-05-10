/**
 * Created by cuppi on 2016/11/30.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {cityUrl} from '../constant/JUrlList';

class NetworkCityManager {
  static _netCityToCity(city){
    return {id: city.id, name: city.city_name, latin: city.city_en};
  }
  /**
   *  获取城市列表
   * @returns {*}
   */
  static cityList() {
    return new Promise((reduce, reject) => {
      NetworkManager.POST(cityUrl.jbzCities).then(data => {
        reduce(data.cities.map(NetworkCityManager._netCityToCity));
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
    return new Promise((reduce, reject) => {
      NetworkManager.POST(cityUrl.jbzCityByCoordinate, coordinate).then(data => {
        let address = data.city.formatAddress;
        Reflect.deleteProperty(data.city, 'formatAddress');
        reduce({city: data.city.map(NetworkCityManager._netCityToCity), address});
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
    return new Promise((reduce, reject) => {
      NetworkManager.POST(cityUrl.jbzCityByCoordinate, {...NetworkManager.locationParas()}).then(data => {
        let address = data.city.formatAddress;
        Reflect.deleteProperty(data.city, 'formatAddress');
        reduce({city: NetworkCityManager._netCityToCity(data.city), address});
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
    return new Promise((reduce, reject) => {
      NetworkManager.POST(cityUrl.jbzCityById, {cityId}).then(data => {
        reduce(NetworkCityManager._netCityToCity(data.city));
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
    return new Promise((reduce, reject) => {
      NetworkManager.POST(cityUrl.jbzDistricts, {cityId}).then(data => {
        reduce(data.districts.map(district => {
          return {id: district.id, name: district.tails.Name};
        }));
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
    return new Promise((reduce, reject) => {
       NetworkManager.POST(cityUrl.jbzHotCities).then(data => {
         reduce(data.hotCities.map(NetworkCityManager._netCityToCity));
       }, error => {
         reject(error);
       });
    });
  }
}

export default NetworkCityManager;
