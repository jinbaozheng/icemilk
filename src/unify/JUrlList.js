/**
 * Created by cuppi on 2017/2/9.
 */

import ICBCUrl from '../differentiation/icbc.url.config';
import ShangHaiUrl from '../differentiation/shanghai.url.config';
export var cityUrl = {};
export var cinemaUrl = {};
export var filmUrl = {};
export var mineUrl = {};
export var accountUrl = {};
export var tradeUrl = {};
export var otherUrl = {};

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
  mineUrl: {},
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
    jbzSearch: ''
  }
}

let _inType = '';
let _VISIBLE_TYPE = ['ICBC-APP', 'SHANGHAI-APP'];

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
  if (_inType === 'ICBC-APP') {
    UseUrl = ICBCUrl;
  }
  if (_inType === 'SHANGHAI-APP') {
    UseUrl = ShangHaiUrl;
  }
  if (UseUrl && UseUrl.hasOwnProperty(chunk) && UseUrl[chunk].hasOwnProperty(title)) {
    return UseUrl[chunk][title];
  } else {
    console.log('Didn\'t find the method at ( ' + chunk + ',' + title + ' ), please contact the Author , cuppi');
  }
  return '';
}

