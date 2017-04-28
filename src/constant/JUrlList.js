/**
 * Created by cuppi on 2017/2/9.
 */

export const homeUrl = {
  main: '/appapi/main' // older
};

export const cinemaUrl = {
  comparepage: '/appapi/cinema/comparepage',
  //  分割
  jbzList: '/appapi/cinema/list',

  jbzCollectcinema: '/account/collectcinema',
  jbzCancelcollectcinema: '/account/cancelcollectcinema',
  jbzRealtimeSeat: '/main/realtimeseats',
  jbzCinemas: '/main/cinemas',
  jbzCinemaspage: '/main/cinemaspage',
  jbzCinemasbyregion: '/main/cinemasbyregion',
  jbzDetail: '/cinema/detail'
};

export const cityUrl = {
  citypage: '/appapi/main/citypage',
  //  分割
  jbzCurrentLocation: '/main/refreshlocation',
  jbzCities: '/main/cities'
};

export const filmUrl = {
  jbzHotFilms: '/main/hotfilms',
  jbzHotFilmsPage: '/main/hotfilmspage',
  jbzWaitFilmsPage: '/main/waitfilmspage',
  jbzFilmDetail: '/main/waitfilmspage',
  jbzFilm: '/main/film',
  jbzFilmList: ''
};

export const screeningUrl = {
  jbzFilmList: '/main/filmview',
  jbzDateList: '/main/foretelldates',
  jbzItems: '/main/filmviewitems'
};

export const mineUrl = {
  userorders: '/appapi/userorders',
  collectedcinemalist: '/appapi/collectedcinemalist'
};

export const seatUrl = {
  wprealtimeseats: '/appapi/wprealtimeseats',
  sprealtimeseats: '/appapi/sprealtimeseats',
  mzrealtimeseats: '/appapi/mzrealtimeseats',
  dcrealtimeseats: '/appapi/dcrealtimeseats'
};

export const accountUrl = {
  jbzLogin: '/account/login',
  jbzLogout: '/account/logout',
  jbzVerifycode: '/account/verifycode',
  jbzRegister: '/account/register',
  jbzUpdatepass: '/account/updatepass'
};

export const tradeUrl = {
  jbzLockSeat: '/main/lockseat',
  jbzAppApplyTicket: '/appapi/applyticket',
  jbzWepApplyTicket: '/webapi/applyticket',
  jbzCancelOrder: '/main/cancelOrder',
  jbzAppPrepay: '/webapi/prepay',
  jbzWebPrepay: '/appapi/prepay',
};

export const otherUrl = {
  hotquery: '/appapi/main/hotquery',
  jbzBanners: '/tip/banner',
  jbzSearch: '/main/search'
};
