'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _JToolObject = require('../tool/JToolObject');

var _JToolObject2 = _interopRequireDefault(_JToolObject);

var _JToolDate = require('../tool/JToolDate');

var _JToolDate2 = _interopRequireDefault(_JToolDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _netCityToCity(city) {
  return { id: _JToolObject2.default.safeGet(city, 'id'), name: _JToolObject2.default.safeGet(city, 'city_name'), latin: _JToolObject2.default.safeGet(city, 'city_en') };
}

exports.default = {
  'cityUrl.jbzCities': function cityUrlJbzCities(data) {
    return data.map(_netCityToCity);
  },
  'cityUrl.jbzCityByCoordinate': function cityUrlJbzCityByCoordinate(data) {
    console.log(data);
    var address = data.formatAddress;
    _JToolObject2.default.deleteProperty(data, 'formatAddress');
    return { city: _netCityToCity(data), address: address };
  },
  'cityUrl.jbzCityById': function cityUrlJbzCityById(data) {
    return _netCityToCity(data);
  },
  'cityUrl.jbzDistricts': function cityUrlJbzDistricts(data) {
    return data.map(function (district) {
      return { id: district.id, name: district.tails.Name };
    });
  },
  'cityUrl.jbzHotCities': function cityUrlJbzHotCities(data) {
    return data.map(_netCityToCity);
  },
  'filmUrl.jbzHotFilms': function filmUrlJbzHotFilms(data) {
    return data;
  },
  'filmUrl.jbzHotFilmsPage': function filmUrlJbzHotFilmsPage(data) {
    return data;
  },
  'filmUrl.jbzHotFilmsSimple': function filmUrlJbzHotFilmsSimple(data) {
    return data.map(function (film) {
      return film;
    });
  },
  'filmUrl.jbzWaitFilms': function filmUrlJbzWaitFilms(data) {
    return data;
  },
  'filmUrl.jbzWaitFilmsPage': function filmUrlJbzWaitFilmsPage(data) {
    return data;
  },
  'filmUrl.jbzFilmDetailByPartner': function filmUrlJbzFilmDetailByPartner(data) {
    return data;
  },
  'filmUrl.jbzFilmDetail': function filmUrlJbzFilmDetail(data) {
    console.log(data);
    return { film: data.film, filmVideo: data.filmVideo, comments: data.hotComments };
  },
  'filmUrl.jbzFilmDate': function filmUrlJbzFilmDate(data) {
    return data.map(function (dateString) {
      return _JToolDate2.default.timeIntervalFromDate(dateString);
    });
  },
  'cinemaUrl.jbzDetail': function cinemaUrlJbzDetail(data, mark) {
    var optional = {};
    if (mark === 0) {
      optional = { phone: data.cinemaPhone };
    }
    if (mark === 1) {
      optional = { phone: data.cinemaPhone, isCollected: _JToolObject2.default.safeGet(data, 'isCollected') };
    }
    data = (0, _extends3.default)({}, data, { optional: optional });
    _JToolObject2.default.deleteProperty(data, 'cinemaPhone');
    _JToolObject2.default.deleteProperty(data, 'tails');
    return data;
  },
  'cinemaUrl.jbzList': function cinemaUrlJbzList(data) {
    return data;
  },
  'cinemaUrl.jbzScreeningFilmList': function cinemaUrlJbzScreeningFilmList(data) {
    return data.map(function (film) {
      _JToolObject2.default.deleteProperty(film, 'tails');
      return film;
    });
  },
  'cinemaUrl.jbzScreeningDateList': function cinemaUrlJbzScreeningDateList(data) {
    return data.map(function (date) {
      return _JToolDate2.default.timeIntervalFromDate(date);
    });
  },
  'cinemaUrl.jbzScreeningItems': function cinemaUrlJbzScreeningItems(data) {
    return data;
  },
  'cinemaUrl.jbzRealtimeSeat': function cinemaUrlJbzRealtimeSeat(data) {
    return data;
  },
  'cinemaUrl.jbzRealtimeSmartSeat': function cinemaUrlJbzRealtimeSmartSeat(data) {
    return data;
  },
  'tradeUrl.jbzLockSeat': function tradeUrlJbzLockSeat(data) {
    return data.orderId;
  },
  'tradeUrl.jbzWebAtAppApplyTicket': function tradeUrlJbzWebAtAppApplyTicket(data) {
    return data.order;
  },
  'mineUrl.jbzMineCinema': function mineUrlJbzMineCinema(data) {
    return data.collection;
  },
  'otherUrl.jbzBanners': function otherUrlJbzBanners(data) {
    return data.map(function (banner) {
      _JToolObject2.default.deleteProperty(banner, 'tails');
      return banner;
    });
  },
  'otherUrl.jbzHotSearchKeyword': function otherUrlJbzHotSearchKeyword(data) {
    return data;
  }
};