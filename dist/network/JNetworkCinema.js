
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkCinemaManager = function () {
  function NetworkCinemaManager() {
    (0, _classCallCheck3.default)(this, NetworkCinemaManager);
  }

  (0, _createClass3.default)(NetworkCinemaManager, null, [{
    key: 'cinemaDetail',
    value: function cinemaDetail(cinemaId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.detail, { cinemaId: cinemaId });
    }
  }, {
    key: 'cinemaContrastNeedLocation',
    value: function cinemaContrastNeedLocation(filmId, regionName, orderType) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.cinemasbyregion, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
        filmId: filmId,
        regionName: regionName,
        orderType: orderType
      }));
    }
  }, {
    key: 'cinemaContrastNoFilmNeedLocation',
    value: function cinemaContrastNoFilmNeedLocation(regionName, orderType) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.cinemaspage, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
        regionName: regionName,
        orderType: orderType
      }));
    }
  }, {
    key: 'cinemaScreenings',
    value: function cinemaScreenings(cinemaId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.screenings, { cinemaId: cinemaId });
    }
  }, {
    key: 'cinemaScreeningsDate',
    value: function cinemaScreeningsDate(cinemaId, filmId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.screeningsdate, { cinemaId: cinemaId, filmId: filmId });
    }
  }, {
    key: 'cinemaScreeningsItem',
    value: function cinemaScreeningsItem(cinemaId, filmId, date) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.screeningsitem, { cinemaId: cinemaId, filmId: filmId, date: date });
    }
  }, {
    key: 'cinemaSeat',
    value: function cinemaSeat(type, paras) {
      if (type === 'meituan' || type === 'dazhong') {
        type = 'maoyan';
      }
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.realtimeseat, (0, _extends3.default)({ type: type }, paras, { uuid: Math.random() }));
    }
  }, {
    key: 'cinemaListNeedLocation',
    value: function cinemaListNeedLocation(filmId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.cinemas, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
        filmId: filmId
      }));
    }
  }, {
    key: 'newCinemaListNeedLocation',
    value: function newCinemaListNeedLocation(filmid, region, order, feature, inType, date) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.list, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
        filmId: filmid,
        regionName: region,
        orderType: order,
        feature: feature,
        inType: inType,
        date: date
      }));
    }
  }, {
    key: 'cinemaFavoriteCinemaNeedLogin',
    value: function cinemaFavoriteCinemaNeedLogin(cinemaId, cinemaName) {
      var loginParas = _JNetwork2.default.loginParas();
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
  }, {
    key: 'cinemaCancelFavoriteCinemaNeedLogin',
    value: function cinemaCancelFavoriteCinemaNeedLogin(cinemaId) {
      var loginParas = _JNetwork2.default.loginParas();
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