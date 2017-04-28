
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
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzDetail, { cinemaId: cinemaId });
    }
  }, {
    key: 'cinemaContrastListNeedLocation',
    value: function cinemaContrastListNeedLocation(filmId, regionName, orderType) {
      if (filmId) {
        return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzCinemasbyregion, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
          filmId: filmId,
          regionName: regionName,
          orderType: orderType
        }));
      } else {
        return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzCinemaspage, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
          regionName: regionName,
          orderType: orderType
        }));
      }
    }
  }, {
    key: 'cinemaListNeedLocation',
    value: function cinemaListNeedLocation(filmId) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzCinemas, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
        filmId: filmId
      }));
    }
  }, {
    key: 'cinemaSeat',
    value: function cinemaSeat(type, paras) {
      if (type === 'meituan' || type === 'dazhong') {
        type = 'maoyan';
      }
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzRealtimeSeat, (0, _extends3.default)({ type: type }, paras, { uuid: Math.random() }));
    }
  }, {
    key: 'newCinemaListNeedLocation',
    value: function newCinemaListNeedLocation(filmid, region, order, feature, inType, date) {
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzList, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
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
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzCollectcinema, {
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
      return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzCancelcollectcinema, {
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