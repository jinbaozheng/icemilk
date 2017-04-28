'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var homeUrl = exports.homeUrl = {
  main: '/appapi/main' };

var cinemaUrl = exports.cinemaUrl = {
  comparepage: '/appapi/cinema/comparepage',

  jbzList: '/appapi/cinema/list',

  jbzCollectcinema: '/account/collectcinema',
  jbzCancelcollectcinema: '/account/cancelcollectcinema',
  jbzRealtimeSeat: '/main/realtimeseats',
  jbzCinemas: '/main/cinemas',
  jbzCinemaspage: '/main/cinemaspage',
  jbzCinemasbyregion: '/main/cinemasbyregion',
  jbzDetail: '/cinema/detail'
};

var cityUrl = exports.cityUrl = {
  citypage: '/appapi/main/citypage',

  jbzCurrentLocation: '/main/refreshlocation',
  jbzCities: '/main/cities'
};

var filmUrl = exports.filmUrl = {
  jbzHotFilms: '/main/hotfilms',
  jbzHotFilmsPage: '/main/hotfilmspage',
  jbzWaitFilmsPage: '/main/waitfilmspage',
  jbzFilmDetail: '/main/waitfilmspage',
  jbzFilm: '/main/film',
  jbzFilmList: ''
};

var screeningUrl = exports.screeningUrl = {
  jbzFilmList: '/main/filmview',
  jbzDateList: '/main/foretelldates',
  jbzItems: '/main/filmviewitems'
};

var mineUrl = exports.mineUrl = {
  userorders: '/appapi/userorders',
  collectedcinemalist: '/appapi/collectedcinemalist'
};

var seatUrl = exports.seatUrl = {
  wprealtimeseats: '/appapi/wprealtimeseats',
  sprealtimeseats: '/appapi/sprealtimeseats',
  mzrealtimeseats: '/appapi/mzrealtimeseats',
  dcrealtimeseats: '/appapi/dcrealtimeseats'
};

var accountUrl = exports.accountUrl = {
  jbzLogin: '/account/login',
  jbzLogout: '/account/logout',
  jbzVerifycode: '/account/verifycode',
  jbzRegister: '/account/register',
  jbzUpdatepass: '/account/updatepass'
};

var tradeUrl = exports.tradeUrl = {
  jbzLockSeat: '/main/lockseat',
  jbzAppApplyTicket: '/appapi/applyticket',
  jbzWepApplyTicket: '/webapi/applyticket',
  jbzCancelOrder: '/main/cancelOrder',
  jbzAppPrepay: '/webapi/prepay',
  jbzWebPrepay: '/appapi/prepay'
};

var otherUrl = exports.otherUrl = {
  hotquery: '/appapi/main/hotquery',
  jbzBanners: '/tip/banner',
  jbzSearch: '/main/search'
};