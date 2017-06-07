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
  jbzFilmDetail: '/film/film',
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
  // jbzAppApplyTicket: '/order/confirmorder'
  jbzWebAtAppApplyTicket: '/order/confirmorder',
  // jbzCancelOrder: '/main/cancelOrder',
  // jbzAppPrepay: '/webapi/prepay',
  // jbzWebPrepay: '/appapi/prepay',
};

const otherUrl = {
  jbzBanners: '/banner/banners',
  jbzSearch: '/main/search'
};

export default {cityUrl, cinemaUrl, filmUrl, accountUrl, tradeUrl, otherUrl};
