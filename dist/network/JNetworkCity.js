/**
 * Created by cuppi on 2016/11/30.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkCityManager = function () {
  function NetworkCityManager() {
    _classCallCheck(this, NetworkCityManager);
  }

  _createClass(NetworkCityManager, null, [{
    key: 'cityListNeedLocation',

    /**
     *  获取城市列表（需要定位）
     * @returns {*}
     */
    value: function cityListNeedLocation() {
      return _JNetwork2.default.POST(_JUrlList.cityUrl.citypage, _extends({}, _JNetwork2.default.locationParas()));
    }

    /**
     *  获取当前城市（需要定位）
     *  @param location 定位信息（可空）
     * @returns {*}
     */

  }, {
    key: 'cityCurrentCityNeedLocation',
    value: function cityCurrentCityNeedLocation(location) {
      if (location) {
        return _JNetwork2.default.POST(_JUrlList.cityUrl.refreshlocation, { longitude: location.longitude, latitude: location.latitude });
      }
      return _JNetwork2.default.POST(_JUrlList.cityUrl.refreshlocation, _extends({}, _JNetwork2.default.locationParas()));
    }

    /**
     * 获取城市列表
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'cityCities',
    value: function cityCities() {
      return _JNetwork2.default.POST(_JUrlList.cityUrl.cities, {});
    }
  }]);

  return NetworkCityManager;
}();

exports.default = NetworkCityManager;