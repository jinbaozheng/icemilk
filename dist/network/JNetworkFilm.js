/**
 * Created by cuppi on 2016/11/22.
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

var NetworkFilmManager = function () {
  function NetworkFilmManager() {
    _classCallCheck(this, NetworkFilmManager);
  }

  _createClass(NetworkFilmManager, null, [{
    key: 'filmHotfilms',

    /**
     *  获取热门电影
     * @param cityId 城市Id
     * @param page 页号
     * @returns {*}
     */
    value: function filmHotfilms(cityId, page) {
      if (!page || page <= 0) {
        return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzHotFilms, { cityId: cityId });
      } else {
        return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzHotFilmsPage, { cityId: cityId, page: page });
      }
    }

    /**
     * 获取待映电影
     * @param cityId 城市Id
     * @param page 页号
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'filmWaitfilms',
    value: function filmWaitfilms(cityId) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzWaitFilmsPage, { cityId: cityId, page: page });
    }

    /**
     * 获取影片详情
     * @param platformFilmId 影片ID
     * * @param platformId 平台id
     * @returns {*}
     */

  }, {
    key: 'filmDetail',
    value: function filmDetail(filmId, platform) {
      if (platform) {
        return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzFilmDetail, { filmId: filmId, platform: platform });
      } else {
        return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzFilm, { id: filmId });
      }
    }

    /**
     * 获取所有电影列表
     * @returns {{terminate, then}|*}
     */

  }, {
    key: 'filmList',
    value: function filmList(cityId) {
      return NetworkFilmManager.unrealizedMethod();
      // return NetworkManager.POST(filmUrl.jbzFilmList);
    }
  }]);

  return NetworkFilmManager;
}();

exports.default = NetworkFilmManager;