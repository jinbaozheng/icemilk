/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkFilmViewManager = function () {
  function NetworkFilmViewManager() {
    _classCallCheck(this, NetworkFilmViewManager);
  }

  _createClass(NetworkFilmViewManager, null, [{
    key: 'filmviewFilmview',

    /**
     * 获取指定影院基础数据(如影院电影排片和影院电话及地址)
     * @param cinemaId 影院Id
     * @returns {{terminate, then}|*}
     */
    value: function filmviewFilmview(cinemaId) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.POST(_JUrlList.filmViewUrl.filmview, {
        cinemaId: cinemaId
      }, loginParas.hasAccount ? {
        openId: loginParas.openId
      } : {});
    }

    /**
     * 获取指定影院排片日期安排
     * @param cinemaId 影院Id
     * @param filmId 影片Id
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'filmviewDate',
    value: function filmviewDate(cinemaId, filmId) {
      return _JNetwork2.default.POST(_JUrlList.filmViewUrl.foretelldates, { cinemaId: cinemaId, filmId: filmId });
    }

    /**
     * 获取指定影院排片放映厅安排
     * @param cinemaId 影院Id
     * @param filmId 影片Id
     * @param date 日期
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'filmviewItems',
    value: function filmviewItems(cinemaId, filmId, date) {
      return _JNetwork2.default.POST(_JUrlList.filmViewUrl.filmviewitems, { cinemaId: cinemaId, filmId: filmId, date: date });
    }
  }]);

  return NetworkFilmViewManager;
}();

exports.default = NetworkFilmViewManager;