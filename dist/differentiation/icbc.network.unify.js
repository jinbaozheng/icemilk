'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _JToolObject = require('../tool/JToolObject');

var _JToolObject2 = _interopRequireDefault(_JToolObject);

var _JToolDate = require('../tool/JToolDate');

var _JToolDate2 = _interopRequireDefault(_JToolDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _netCityToCity(city) {
  return { id: city.id, name: city.city_name, latin: city.city_en };
}

exports.default = {
  'cityUrl.jbzCities': function cityUrlJbzCities(data) {
    return data.cities.map(_netCityToCity);
  },
  'cityUrl.jbzCityByCoordinate': function cityUrlJbzCityByCoordinate(data) {
    var address = data.city.formatAddress;
    _JToolObject2.default.deleteProperty(data.city, 'formatAddress');
    return { city: _netCityToCity(data.city), address: address };
  },
  'cityUrl.jbzCityById': function cityUrlJbzCityById(data) {
    return _netCityToCity(data.city);
  },
  'cityUrl.jbzDistricts': function cityUrlJbzDistricts(data) {
    return data.districts.map(function (district) {
      return { id: district.id, name: district.tails.Name };
    });
  },
  'cityUrl.jbzHotCities': function cityUrlJbzHotCities(data) {
    return data.hotCities.map(_netCityToCity);
  },

  'filmUrl.jbzHotFilms': function filmUrlJbzHotFilms(data) {
    return data.hotFilms;
  },
  'filmUrl.jbzHotFilmsPage': function filmUrlJbzHotFilmsPage(data) {
    return data.hotFilms;
  },
  'filmUrl.jbzHotFilmsSimple': function filmUrlJbzHotFilmsSimple(data) {
    return data.hotFilms.map(function (film) {
      _JToolObject2.default.deleteProperty(film, 'tails');
      return film;
    });
  },
  'filmUrl.jbzWaitFilms': function filmUrlJbzWaitFilms(data) {
    return data.filmsList;
  },
  'filmUrl.jbzWaitFilmsPage': function filmUrlJbzWaitFilmsPage(data) {
    return data.filmsList;
  },
  'filmUrl.jbzFilmDetailByPartner': function filmUrlJbzFilmDetailByPartner(data) {
    _JToolObject2.default.deleteProperty(data.film, 'tails');
    return { film: data.film, filmVideo: data.filmVideo, comments: data.hotComments };
  },
  'filmUrl.jbzFilmDetail': function filmUrlJbzFilmDetail(data) {
    _JToolObject2.default.deleteProperty(data.film, 'tails');
    return { film: data.film, filmVideo: data.filmVideo, comments: data.hotComments };
  },
  'filmUrl.jbzFilmDate': function filmUrlJbzFilmDate(data) {
    return data.filmDate.map(function (dateString) {
      return _JToolDate2.default.timeIntervalFromDate(dateString);
    });
  },

  'cinemaUrl.jbzDetail': function cinemaUrlJbzDetail(data) {
    data.cinema.phone = data.phone;
    _JToolObject2.default.deleteProperty(data.cinema, 'tails');
    return data.cinema;
  },
  'cinemaUrl.jbzList': function cinemaUrlJbzList(data) {
    return data.cinemalist;
  },
  'cinemaUrl.jbzScreeningFilmList': function cinemaUrlJbzScreeningFilmList(data) {
    return data.films.map(function (film) {
      _JToolObject2.default.deleteProperty(film, 'tails');
      return film;
    });
  },
  'cinemaUrl.jbzScreeningDateList': function cinemaUrlJbzScreeningDateList(data) {
    return data.filmShowDates.map(function (date) {
      return _JToolDate2.default.timeIntervalFromDate(date);
    });
  },
  'cinemaUrl.jbzScreeningItems': function cinemaUrlJbzScreeningItems(data) {
    return data.filmShows;
  },
  'cinemaUrl.jbzRealtimeSeat': function cinemaUrlJbzRealtimeSeat(data) {
    return data.realTimeSeats;
  },
  'cinemaUrl.jbzRealtimeSmartSeat': function cinemaUrlJbzRealtimeSmartSeat(data) {
    return data.realTimeSeats;
  },

  'tradeUrl.jbzLockSeat': function tradeUrlJbzLockSeat(data) {
    return data.orderId;
  },
  'tradeUrl.jbzWebAtAppApplyTicket': function tradeUrlJbzWebAtAppApplyTicket(data) {
    return data.order;
  },

  'otherUrl.jbzBanners': function otherUrlJbzBanners(data) {
    return data.banner.map(function (banner) {
      _JToolObject2.default.deleteProperty(banner, 'tails');
      return banner;
    });
  }
};