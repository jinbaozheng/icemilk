/**
 * Created by cuppi on 2017/2/9.
 */

// import ICBCUrl from '../differentiation/icbc.url.config';
// import ShangHaiUrl from '../differentiation/shanghai.url.config';
// import ICMCUrl from '../differentiation/icmc.url.config';
export let cityUrl: any = {};
export let cinemaUrl: any = {};
export let filmUrl: any = {};
export let mineUrl: any = {};
export let accountUrl: any = {};
export let tradeUrl: any = {};
export let otherUrl: any = {};
// SDK 用到的所有的网络请求请求都在这里
let sdkApi = {
  cityUrl: {
    jbzCities: '',
    jbzCityByCoordinate: '',
    jbzCityById: '',
    jbzDistricts: '',
    jbzHotCities: ''
  },
  cinemaUrl: {
    jbzList: '',
    jbzDetail: '',
    jbzScreeningFilmList: '',
    jbzScreeningDateList: '',
    jbzScreeningItems: '',
    jbzRealtimeSeat: ''
  },
  filmUrl: {
    jbzHotFilms: '',
    jbzHotFilmsPage: '',
    jbzHotFilmsSimple: '',
    jbzWaitFilms: '',
    jbzWaitFilmsPage: '',

    jbzFilmDetailByPartner: '',
    jbzFilmDetail: '',
    jbzFilmDate: ''

  },
  mineUrl: {
    jbzMineCinema: '',
  },
  accountUrl: {
    jbzLogin: '',
    jbzLogout: '',
    jbzVerifycode: '',
    jbzRegister: '',
    jbzUpdatepass: ''
  },
  tradeUrl: {
    jbzLockSeat: '',
    jbzWebAtAppApplyTicket: '',
    // jbzAppApplyTicket: '',
    // jbzWepApplyTicket: '',
    jbzCancelOrder: '',
    jbzAppPrepay: '',
    jbzWebPrepay: ''
  },
  otherUrl: {
    jbzBanners: '',
    jbzSearch: '',
    jbzHotSearchKeyword: ''
  }
}

// let _inType = '';
// let _TYPE_OBJECT = {'ICBC-APP': ICBCUrl, 'SHANGHAI-APP': ShangHaiUrl, 'ICMC-APP': ICMCUrl};
// let _VISIBLE_TYPE = Reflect.ownKeys(_TYPE_OBJECT);
let _urlMap = {};
export function UseConfig(urlMap) {
  _urlMap = urlMap;
  cityUrl = _chunk('cityUrl');
  cinemaUrl = _chunk('cinemaUrl');
  filmUrl = _chunk('filmUrl');
  mineUrl = _chunk('mineUrl');
  accountUrl = _chunk('accountUrl');
  tradeUrl = _chunk('tradeUrl');
  otherUrl = _chunk('otherUrl');
}

function _chunk(chunk) {
  let map = {};
  for (let title in sdkApi[chunk]) {
    if (sdkApi[chunk].hasOwnProperty(title)){
      map[title] = _(chunk, title);
    }
  }
  return map;
}

function _(chunk, title) {
  let map = {};
  if (_urlMap && _urlMap.hasOwnProperty(chunk) && _urlMap[chunk].hasOwnProperty(title)) {
    return _urlMap[chunk][title];
  } else {
    console.log('Didn\'t find the method at ( ' + chunk + ',' + title + ' ), please contact the Author => cuppi');
  }
  return '';
}

