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
  jbzDetail: '/cinema/cinemadetail',
  jbzScreeningFilmList: '/cinema/films',
  jbzScreeningDateList: '/cinema/filmshowdates',
  jbzScreeningItems: '/cinema/filmshows',
  jbzRealtimeSeat: '/cinema/realtimeseats'
};

const filmUrl = {
  jbzHotFilms: '/film/hotfilms',
  jbzHotFilmsPage: '/film/hotfilmspage',
  jbzHotFilmsSimple: '/film/hotfilmssimple',
  jbzWaitFilms: '/film/upcomingfilms',
  jbzWaitFilmsPage: '/film/upcomingfilmspage',
  jbzFilmDetailByPartner: '/film/filmbypartner',
  jbzFilmDetail: '/film/filmpage', // 民生特有的 让卜浩合并的
  jbzFilmDate: '/film/filmdate'
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
  jbzBanners: '/banner/banners',
  jbzSearch: '/search',
  jbzHotSearchKeyword: '/hotquery'
};

export default {cityUrl, cinemaUrl, filmUrl, accountUrl, tradeUrl, mineUrl, otherUrl};
