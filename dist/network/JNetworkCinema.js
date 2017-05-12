
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

var _JToolObject = require('../tool/JToolObject');

var _JToolObject2 = _interopRequireDefault(_JToolObject);

var _JToolDate = require('../tool/JToolDate');

var _JToolDate2 = _interopRequireDefault(_JToolDate);

var _JManagerSeat = require('../util/JManagerSeat');

var _JManagerSeat2 = _interopRequireDefault(_JManagerSeat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkCinemaManager = function () {
  function NetworkCinemaManager() {
    (0, _classCallCheck3.default)(this, NetworkCinemaManager);
  }

  (0, _createClass3.default)(NetworkCinemaManager, null, [{
    key: 'cinemaDetail',
    value: function cinemaDetail(cinemaId) {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzDetail, { cinemaId: cinemaId }).then(function (data) {
          data.cinema.phone = data.phone;
          _JToolObject2.default.deleteProperty(data.cinema, 'tails');
          resolve(data.cinema);
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaList',
    value: function cinemaList(location, cinemaFilter) {
      return new _promise2.default(function (resolve, reject) {
        var _ref = cinemaFilter ? cinemaFilter : {},
            filmId = _ref.filmId,
            feature = _ref.feature,
            region = _ref.region,
            sort = _ref.sort,
            limit = _ref.limit;

        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzList, (0, _extends3.default)({}, location, {
          filmId: filmId,
          feature: feature,
          regionName: region,
          orderType: sort,
          limit: limit
        })).then(function (data) {
          resolve(data.cinemalist);
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaListNeedLocation',
    value: function cinemaListNeedLocation(cinemaFilter) {
      var location = _JNetwork2.default.locationParas();
      return NetworkCinemaManager.cinemaList(location, cinemaFilter);
    }
  }, {
    key: 'cinemaScreeningFilmList',
    value: function cinemaScreeningFilmList(cinemaId) {
      var loginParas = _JNetwork2.default.loginParas();
      var account = {};
      if (loginParas.hasAccount) {
        account = { openId: loginParas.openId, sessionId: loginParas.sessionId };
      }
      return new _promise2.default(function (resolve, reject) {
        return _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzScreeningFilmList, {
          cinemaId: cinemaId
        }, account).then(function (data) {
          resolve(data.films.map(function (film) {
            _JToolObject2.default.deleteProperty(film, 'tails');
            return film;
          }));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaScreeningDateList',
    value: function cinemaScreeningDateList(cinemaId, filmId) {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzScreeningDateList, { cinemaId: cinemaId, filmId: filmId }).then(function (data) {
          resolve(data.filmShowDates.map(function (date) {
            return _JToolDate2.default.timeIntervalFromDate(date);
          }));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaScreeningItems',
    value: function cinemaScreeningItems(cinemaId, filmId, date) {
      return new _promise2.default(function (resolve, reject) {
        date = _JToolDate2.default.dateFromTimeInterval(date, 'yyyy-MM-dd');
        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzScreeningItems, { cinemaId: cinemaId, filmId: filmId, date: date }).then(function (data) {
          resolve(data.filmShows);
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaSeats',
    value: function cinemaSeats(type, paras) {
      if (type === 'meituan' || type === 'dazhong') {
        type = 'maoyan';
      }
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzRealtimeSeat, (0, _extends3.default)({ type: type }, paras)).then(function (data) {
          resolve(data.realTimeSeats);
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaSmartSeats',
    value: function cinemaSmartSeats(type, paras) {
      if (type === 'meituan' || type === 'dazhong') {
        type = 'maoyan';
      }
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzRealtimeSeat, (0, _extends3.default)({ type: type }, paras)).then(function (data) {
          var smartSeatList = _JManagerSeat2.default.defaultManager().smartSeatsFromSeats(type, data.realTimeSeats);
          resolve(smartSeatList);
        }, function (error) {
          reject(error);
        });
      });
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