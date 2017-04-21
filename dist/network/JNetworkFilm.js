
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkFilmManager = function () {
  function NetworkFilmManager() {
    (0, _classCallCheck3.default)(this, NetworkFilmManager);
  }

  (0, _createClass3.default)(NetworkFilmManager, null, [{
    key: 'filmHotfilms',
    value: function filmHotfilms(cityId, page) {
      if (!page || page <= 0) {
        return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzHotFilms, { cityId: cityId });
      } else {
        return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzHotFilmsPage, { cityId: cityId, page: page });
      }
    }
  }, {
    key: 'filmWaitfilms',
    value: function filmWaitfilms(cityId) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzWaitFilmsPage, { cityId: cityId, page: page });
    }
  }, {
    key: 'filmDetail',
    value: function filmDetail(filmId, platform) {
      if (platform) {
        return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzFilmDetail, { filmId: filmId, platform: platform });
      } else {
        return _JNetwork2.default.POST(_JUrlList.filmUrl.jbzFilm, { id: filmId });
      }
    }
  }, {
    key: 'filmList',
    value: function filmList(cityId) {
      return NetworkFilmManager.unrealizedMethod();
    }
  }]);
  return NetworkFilmManager;
}();

exports.default = NetworkFilmManager;