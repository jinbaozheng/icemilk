/**
 * Created by cuppi on 2016/11/29.
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

var NetworkCinemaManager = function () {
  function NetworkCinemaManager() {
    _classCallCheck(this, NetworkCinemaManager);
  }

  _createClass(NetworkCinemaManager, null, [{
    key: 'cinemaDetail',

    /**
     * 获取影院详情
     * @param cinemaId 影院ID
     * @returns {*}
     */
    value: function cinemaDetail(cinemaId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.detail, { cinemaId: cinemaId });
    }

    /**
     * 根据影片Id获取影院的列表（比价）
     * @param filmId  影片Id
     * @param regionName 地域名字
     * @param orderType 排序类型
     * @returns {*} 返回影院列表
     */

  }, {
    key: 'cinemaContrastNeedLocation',
    value: function cinemaContrastNeedLocation(filmId, regionName, orderType) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.cinemasbyregion, _extends({}, _JNetwork2.default.locationParas(), {
        filmId: filmId,
        regionName: regionName,
        orderType: orderType
      }));
    }

    /**
     * 获取影院的列表（比价，不需要影院Id）
     * @param regionName
     * @param orderType
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'cinemaContrastNoFilmNeedLocation',
    value: function cinemaContrastNoFilmNeedLocation(regionName, orderType) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.cinemaspage, _extends({}, _JNetwork2.default.locationParas(), {
        regionName: regionName,
        orderType: orderType
      }));
    }

    /**
     * 指定影院的排片的电影列表及影院本身的信息
     * @param cinemaId 影院ID
     * @returns {*}
     */

  }, {
    key: 'cinemaScreenings',
    value: function cinemaScreenings(cinemaId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.screenings, { cinemaId: cinemaId });
    }

    /**
     * 指定影院的排片的最近日期列表
     * @param cinemaId 影院ID
     * @param filmId 影片ID
     * @returns {*}
     */

  }, {
    key: 'cinemaScreeningsDate',
    value: function cinemaScreeningsDate(cinemaId, filmId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.screeningsdate, { cinemaId: cinemaId, filmId: filmId });
    }

    /**
     * 指定影院的某个影片的某天的排片的详细信息
     * @param cinemaId 影院ID
     * @param filmId 影片ID
     * @param date 日期
     * @returns {*}
     */

  }, {
    key: 'cinemaScreeningsItem',
    value: function cinemaScreeningsItem(cinemaId, filmId, date) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.screeningsitem, { cinemaId: cinemaId, filmId: filmId, date: date });
    }

    /**
     * 实时座位图
     * @param type 平台类型 （必须）
     * @param paras （根据不同平台变化）
     * @returns {*}
     */

  }, {
    key: 'cinemaSeat',
    value: function cinemaSeat(type, paras) {
      if (type === 'meituan' || type === 'dazhong') {
        type = 'maoyan';
      }
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.realtimeseat, _extends({ type: type }, paras, { uuid: Math.random() }));
    }

    /**
     * 影院列表 （已弃用）（临时使用了）
     * @param filmId 影片id
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'cinemaListNeedLocation',
    value: function cinemaListNeedLocation(filmId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.cinemas, _extends({}, _JNetwork2.default.locationParas(), {
        filmId: filmId
      }));
    }

    /**
     * 整合后的影院列表
     * @param filmid 影片Id
     * @param region 市区
     * @param order 排序
     * @param feature 特色
     * @param inType 后台为了判断请求的类型 （CinemaBuyList：2，CinemaListView：1）
     * @param date 日期
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'newCinemaListNeedLocation',
    value: function newCinemaListNeedLocation(filmid, region, order, feature, inType, date) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.list, _extends({}, _JNetwork2.default.locationParas(), {
        filmId: filmid,
        regionName: region,
        orderType: order,
        feature: feature,
        inType: inType,
        date: date
      }));
    }

    /**
     * 收藏影院
     * @param cinemaId 影院Id
     * @param cinemaName 影院名字
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'cinemaFavoriteCinemaNeedLogin',
    value: function cinemaFavoriteCinemaNeedLogin(cinemaId, cinemaName) {
      var loginParas = _JNetwork2.default.locationParas();
      if (!loginParas.hasAccount) {
        return _JNetwork2.default.failedAuthorizationNetwork();
      }
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.collectcinema, {
        openId: loginParas.openId,
        cinemaId: cinemaId,
        cinemaName: cinemaName
      }, {
        'sessionId': loginParas.sessionId
      });
    }

    /**
     * 取消收藏影院
     * @param cinemaId 影院Id
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'cinemaCancelFavoriteCinemaNeedLogin',
    value: function cinemaCancelFavoriteCinemaNeedLogin(cinemaId) {
      var loginParas = _JNetwork2.default.locationParas();
      if (!loginParas.hasAccount) {
        return _JNetwork2.default.failedAuthorizationNetwork();
      }
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.cancelcollectcinema, {
        openId: loginParas.openId,
        cinemaId: cinemaId
      }, {
        'sessionId': loginParas.sessionId
      });
    }
  }]);

  return NetworkCinemaManager;
}();

exports.default = NetworkCinemaManager;