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
  jbzDetail: '/cinema/cinemadetail',
  jbzScreeningFilmList: '/cinema/films',
  jbzScreeningDateList: '/cinema/filmshowdates',
  jbzScreeningItems: '/cinema/filmshows',
  jbzRealtimeSeat: '/cinema/realtimeseats'
};

var filmUrl = {
  jbzHotFilms: '/film/hotfilms',
  jbzHotFilmsPage: '/film/hotfilmspage',
  jbzHotFilmsSimple: '/film/hotfilmssimple',
  jbzWaitFilms: '/film/upcomingfilms',
  jbzWaitFilmsPage: '/film/upcomingfilmspage',
  jbzFilmDetailByPartner: '/film/filmbypartner',
  jbzFilmDetail: '/film/film',
  jbzFilmDate: '/film/filmdate'
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

  jbzWebAtAppApplyTicket: '/order/confirmorder'
};

var otherUrl = {
  jbzBanners: '/banner/banners',
  jbzSearch: '/main/search'
};

exports.default = { cityUrl: cityUrl, cinemaUrl: cinemaUrl, filmUrl: filmUrl, accountUrl: accountUrl, tradeUrl: tradeUrl, otherUrl: otherUrl };