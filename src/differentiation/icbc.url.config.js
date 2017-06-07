/**
 * Created by cuppi on 2017/5/12.
 */

const cityUrl = {
  jbzCities: '/location/cities',
  jbzCityByCoordinate: '/location/city',
  jbzCityById: '/location/citybyid',
  jbzDistricts: '/location/districts',
  jbzHotCities: '/location/hotcities'
};

const cinemaUrl = {
  jbzList: '/cinema/cinemas',
  jbzDetail: '/cinema/cinemaDetail',
  jbzScreeningFilmList: '/cinema/films',
  jbzScreeningDateList: '/cinema/filmshowdates',
  jbzScreeningItems: '/cinema/filmshows',
  jbzRealtimeSeat: '/cinema/realtimeseats'
};

const filmUrl = {
  jbzHotFilms: '/film/hotFilms',
  jbzHotFilmsPage: '/film/hotFilmsPage',
  jbzHotFilmsSimple: '/film/hotFilmsSimple',
  jbzWaitFilms: '/film/upcomingFilms',
  jbzWaitFilmsPage: '/film/upcomingFilmsPage',
  jbzFilmDetailByPartner: '/film/filmByPartner',
  jbzFilmDetail: '/film/film',
  jbzFilmDate: '/film/filmDate'
};

const accountUrl = {
  jbzLogin: '/account/login',
  jbzLogout: '/account/logout',
  jbzVerifycode: '/account/verifycode',
  jbzRegister: '/account/register',
  jbzUpdatepass: '/account/updatepass'
};

const tradeUrl = {
  jbzLockSeat: '/order/lockseat',
  // jbzAppApplyTicket: '/appapi/applyticket',
  jbzWebAtAppApplyTicket: '/order/applyticket',
  // jbzCancelOrder: '/main/cancelOrder',
  // jbzAppPrepay: '/webapi/prepay',
  // jbzWebPrepay: '/appapi/prepay',
};

const mineUrl = {
  jbzMineCinema: '/mine/cinemacollectionlist'
};

const otherUrl = {
  jbzBanners: '/banner/banner',
  jbzSearch: '/main/search'
};

export default {cityUrl, cinemaUrl, filmUrl, accountUrl, tradeUrl, mineUrl, otherUrl};
