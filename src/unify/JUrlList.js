/**
 * Created by cuppi on 2017/2/9.
 */

import ICBCUrl from '../differentiation/icbc.url.config';
import ShangHaiUrl from '../differentiation/shanghai.url.config';
import ICMCUrl from '../differentiation/icmc.url.config';
export var cityUrl = {};
export var cinemaUrl = {};
export var filmUrl = {};
export var mineUrl = {};
export var accountUrl = {};
export var tradeUrl = {};
export var otherUrl = {};
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

let _inType = '';
let _TYPE_OBJECT = {'ICBC-APP': ICBCUrl, 'SHANGHAI-APP': ShangHaiUrl, 'ICMC-APP': ICMCUrl};
let _VISIBLE_TYPE = Reflect.ownKeys(_TYPE_OBJECT);

export function UseConfig(inType) {
  if (_VISIBLE_TYPE.indexOf(inType) === -1) {
    console.log('ERROR: the inType value is non-existent, please look inType at config. \n the inType value is one of ( '
      + _VISIBLE_TYPE.join(', ')
      + ' )');
    return;
  }
  _inType = inType;
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
    map[title] = _(chunk, title);
  }
  return map;
}

function _(chunk, title) {
  let map = {};
  let UseUrl = null;

  UseUrl = _TYPE_OBJECT[_inType];
  if (UseUrl && UseUrl.hasOwnProperty(chunk) && UseUrl[chunk].hasOwnProperty(title)) {
    return UseUrl[chunk][title];
  } else {
    console.log('Didn\'t find the method at ( ' + chunk + ',' + title + ' ), please contact the Author => cuppi');
  }
  return '';
}

