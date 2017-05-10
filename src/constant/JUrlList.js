/**
 * Created by cuppi on 2017/2/9.
 */

export const cinemaUrl = {
  jbzList: '/cinema/cinemas',


  // jbzList: '/appapi/cinema/list',
  jbzCollectcinema: '/account/collectcinema',
  jbzCancelcollectcinema: '/account/cancelcollectcinema',
  jbzRealtimeSeat: '/main/realtimeseats',
  jbzCinemas: '/main/cinemas',
  jbzCinemaspage: '/main/cinemaspage',
  jbzCinemasbyregion: '/main/cinemasbyregion',
  jbzDetail: '/cinema/detail'
};


/**
 * 有关城市及定位信息
 * @type {{jbzCurrentLocation: string, jbzCities: string}}
 */
export const cityUrl = {
  //  分割
  jbzCities: '/location/cities',
  jbzCityByCoordinate: '/location/city',
  jbzCityById: '/location/citybyid',
  jbzDistricts: '/location/districts',
  jbzHotCities: '/location/hotcities'
};

export const filmUrl = {
  jbzHotFilms: '/film/hotFilms',
  jbzHotFilmsPage: '/film/hotFilmsPage',
  jbzHotFilmsSimple: '/film/hotFilmsSimple',
  jbzWaitFilms: '/film/upcomingFilms',
  jbzWaitFilmsPage: '/film/upcomingFilmsPage',
  jbzFilmDetailByPartner: '/film/filmByPartner',
  jbzFilmDetail: '/film/film',
  jbzFilmDate: '/film/filmDate'
};

export const screeningUrl = {
  jbzFilmList: '/main/filmview',
  jbzDateList: '/main/foretelldates',
  jbzItems: '/main/filmviewitems'
};

export const mineUrl = {
  // userorders: '/appapi/userorders',
  // collectedcinemalist: '/appapi/collectedcinemalist'
};

// export const seatUrl = {
//   wprealtimeseats: '/appapi/wprealtimeseats',
//   sprealtimeseats: '/appapi/sprealtimeseats',
//   mzrealtimeseats: '/appapi/mzrealtimeseats',
//   dcrealtimeseats: '/appapi/dcrealtimeseats'
// };

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
  jbzBanners: '/tip/banner',
  jbzSearch: '/main/search'
};
