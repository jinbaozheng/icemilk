'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var homeUrl = exports.homeUrl = {
  main: '/appapi/main' };

var cinemaUrl = exports.cinemaUrl = {
  detail: '/appapi/cinema/detail',
  comparepage: '/appapi/cinema/comparepage',
  screenings: '/appapi/cinema/screenings',
  screeningsdate: '/appapi/cinema/screeningsdate',
  screeningsitem: '/appapi/cinema/screeningsitem',
  realtimeseat: '/appapi/realtimeseats',
  list: '/appapi/cinema/list',

  cinemas: '/appapi/cinemas',
  cinemasbyregion: '/appapi/cinemasbyregion',
  cinemaspage: '/appapi/cinemaspage',
  collectcinema: '/appapi/collectcinema',
  cancelcollectcinema: '/appapi/cancelcollectcinema'
};

var cityUrl = exports.cityUrl = {
  citypage: '/appapi/main/citypage',

  refreshlocation: '/appapi/refreshlocation',
  cities: '/appapi/cities'
};

var filmUrl = exports.filmUrl = {
  jbzHotFilms: '/main/hotfilms',
  jbzHotFilmsPage: '/main/hotfilmspage',
  jbzWaitFilmsPage: '/main/waitfilmspage',
  jbzFilmDetail: '/main/waitfilmspage',
  jbzFilm: '/appapi/film',
  jbzFilmList: ''
};

var filmViewUrl = exports.filmViewUrl = {
  filmview: '/appapi/filmview',
  foretelldates: '/appapi/foretelldates',
  filmviewitems: '/appapi/filmviewitems'
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
  login: '/appapi/login',
  logout: '/appapi/logout',
  verifycode: '/appapi/verifycode',
  register: '/appapi/register',
  updatepass: '/appapi/updatepass'
};

var tradeUrl = exports.tradeUrl = {
  lockseat: '/appapi/lockseat',
  applyticket: '/appapi/applyticket',
  prepay: '/appapi/prepay',

  wplockseat: '/appapi/wplockseat',
  splockseat: '/appapi/splockseat',
  mzlockseat: '/appapi/mzlockseat',
  dclockseat: '/appapi/dclockseat',
  wpapplyticket: '/appapi/wpapplyticket',
  spapplyticket: '/appapi/spapplyticket',
  mzapplyticket: '/appapi/mzapplyticket',
  dcapplyticket: '/appapi/dcapplyticket',
  cancelOrder: '/appapi/cancelOrder'
};

var otherUrl = exports.otherUrl = {
  hotquery: '/appapi/main/hotquery',
  banner: '/appapi/main/banner',
  pagebanners: '/tip/banner',

  wxMakePreOrder: '/appapi/wxMakePreOrder',
  search: '/appapi/search'
};