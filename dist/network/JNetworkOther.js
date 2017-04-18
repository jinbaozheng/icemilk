/**
 * Created by cuppi on 2016/12/1.
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

var NetworkOtherManager = function () {
  function NetworkOtherManager() {
    _classCallCheck(this, NetworkOtherManager);
  }

  _createClass(NetworkOtherManager, null, [{
    key: 'search',

    /**
     * 搜索
     * @param val 关键字
     * @param lastKey 目前无用
     * @returns {{terminate, then}|*}
     */
    value: function search(val, lastKey) {
      // if (GlobalConstant.store.state.rootStore.location.hasLocation) {
      return _JNetwork2.default.post(_JUrlList.otherUrl.search, _extends({}, _JNetwork2.default.locationParas(), {
        queryStr: val,
        lastKey: lastKey
      }));
      // } else {
      //   return NetworkManager.post(otherUrl.search, {
      //     cityId: GlobalConstant.store.state.rootStore.userLocationCity.id,
      //     queryStr: val,
      //     lastKey: lastKey
      //   });
      // }
    }
  }, {
    key: 'searchSearch',
    value: function searchSearch(cityId, query, lastKey) {
      return _JNetwork2.default.post(_JUrlList.otherUrl.search, {
        cityId: cityId,
        query: query,
        lastKey: lastKey
      });
    }

    /**
     * 热搜词汇
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'hotQuery',
    value: function hotQuery() {
      return _JNetwork2.default.post(_JUrlList.otherUrl.hotquery);
    }

    /**
     * 广告接口
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'bannersNeedCItyIdNeedLocation',
    value: function bannersNeedCItyIdNeedLocation() {
      return _JNetwork2.default.post(_JUrlList.otherUrl.banner, {
        cityId: _JNetwork2.default.loginParas().cityId
      });
    }
  }, {
    key: 'pageBanners',
    value: function pageBanners() {
      return _JNetwork2.default.post(_JUrlList.otherUrl.pagebanners, {});
    }
  }]);

  return NetworkOtherManager;
}();

exports.default = NetworkOtherManager;