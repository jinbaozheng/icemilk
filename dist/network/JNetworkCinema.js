
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

var _JUrlList = require('../unify/JUrlList');

var _JToolDate = require('../tool/JToolDate');

var _JToolDate2 = _interopRequireDefault(_JToolDate);

var _JDataUnify = require('../unify/JDataUnify');

var _JDataUnify2 = _interopRequireDefault(_JDataUnify);

var _JManagerSeat = require('../util/JManagerSeat');

var _JManagerSeat2 = _interopRequireDefault(_JManagerSeat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JNetworkCinema = function () {
  function JNetworkCinema() {
    (0, _classCallCheck3.default)(this, JNetworkCinema);
  }

  (0, _createClass3.default)(JNetworkCinema, null, [{
    key: 'cinemaDetail',
    value: function cinemaDetail(cinemaId) {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzDetail, { cinemaId: cinemaId }).then(function (data) {
          resolve((0, _JDataUnify2.default)('cinemaUrl.jbzDetail', data, 0));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaDetailCanLogin',
    value: function cinemaDetailCanLogin(cinemaId) {
      var loginParas = _JNetwork2.default.loginParas();
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzDetail, (0, _extends3.default)({ cinemaId: cinemaId }, loginParas)).then(function (data) {
          resolve((0, _JDataUnify2.default)('cinemaUrl.jbzDetail', data, 1));
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
          resolve((0, _JDataUnify2.default)('cinemaUrl.jbzList', data));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaListNeedLocation',
    value: function cinemaListNeedLocation(cinemaFilter) {
      var location = _JNetwork2.default.locationParas();
      return JNetworkCinema.cinemaList(location, cinemaFilter);
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
          resolve((0, _JDataUnify2.default)('cinemaUrl.jbzScreeningFilmList', data));
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
          resolve((0, _JDataUnify2.default)('cinemaUrl.jbzScreeningDateList', data));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cinemaScreeningItems',
    value: function cinemaScreeningItems(cinemaId, filmId, date) {
      return new _promise2.default(function (resolve, reject) {
        date = _JToolDate2.default.dateStringFromTimeInterval(date, 'yyyy-MM-dd');
        _JNetwork2.default.POST(_JUrlList.cinemaUrl.jbzScreeningItems, { cinemaId: cinemaId, filmId: filmId, date: date }).then(function (data) {
          resolve((0, _JDataUnify2.default)('cinemaUrl.jbzScreeningItems', data));
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
          resolve((0, _JDataUnify2.default)('cinemaUrl.jbzRealtimeSeat', data));
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
          resolve(_JManagerSeat2.default.defaultManager().smartSeatsFromSeats(type, (0, _JDataUnify2.default)('cinemaUrl.jbzRealtimeSmartSeat', data)));
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
  return JNetworkCinema;
}();

exports.default = JNetworkCinema;