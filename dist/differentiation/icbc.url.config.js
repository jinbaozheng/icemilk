'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var cityUrl = {
  jbzCities: '/location/cities',
  jbzCityByCoordinate: '/location/city',
  jbzCityById: '/location/citybyid',
  jbzDistricts: '/location/districts',
  jbzHotCities: '/location/hotcities'
};

var cinemaUrl = {
  jbzList: '/cinema/cinemas',
  jbzDetail: '/cinema/cinemaDetail',
  jbzScreeningFilmList: '/cinema/films',
  jbzScreeningDateList: '/cinema/filmshowdates',
  jbzScreeningItems: '/cinema/filmshows',
  jbzRealtimeSeat: '/cinema/realtimeseats'
};

var filmUrl = {
  jbzHotFilms: '/film/hotFilms',
  jbzHotFilmsPage: '/film/hotFilmsPage',
  jbzHotFilmsSimple: '/film/hotFilmsSimple',
  jbzWaitFilms: '/film/upcomingFilms',
  jbzWaitFilmsPage: '/film/upcomingFilmsPage',
  jbzFilmDetailByPartner: '/film/filmByPartner',
  jbzFilmDetail: '/film/film',
  jbzFilmDate: '/film/filmDate'
};

var accountUrl = {
  jbzLogin: '/account/login',
  jbzLogout: '/account/logout',
  jbzVerifycode: '/account/verifycode',
  jbzRegister: '/account/register',
  jbzUpdatepass: '/account/updatepass'
};

var tradeUrl = {
  jbzLockSeat: '/order/lockseat',

  jbzWebAtAppApplyTicket: '/order/applyticket'
};

var otherUrl = {
  jbzBanners: '/banner/banner',
  jbzSearch: '/main/search'
};

exports.default = { cityUrl: cityUrl, cinemaUrl: cinemaUrl, filmUrl: filmUrl, accountUrl: accountUrl, tradeUrl: tradeUrl, otherUrl: otherUrl };