'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseConfig = UseConfig;
var cityUrl = exports.cityUrl = {};
var cinemaUrl = exports.cinemaUrl = {};
var filmUrl = exports.filmUrl = {};
var mineUrl = exports.mineUrl = {};
var accountUrl = exports.accountUrl = {};
var tradeUrl = exports.tradeUrl = {};
var otherUrl = exports.otherUrl = {};

var sdkApi = {
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
    jbzMineCinema: ''
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

    jbzCancelOrder: '',
    jbzAppPrepay: '',
    jbzWebPrepay: ''
  },
  otherUrl: {
    jbzBanners: '',
    jbzSearch: '',
    jbzHotSearchKeyword: ''
  }
};

var _urlMap = {};
function UseConfig(urlMap) {
  _urlMap = urlMap;
  exports.cityUrl = cityUrl = _chunk('cityUrl');
  exports.cinemaUrl = cinemaUrl = _chunk('cinemaUrl');
  exports.filmUrl = filmUrl = _chunk('filmUrl');
  exports.mineUrl = mineUrl = _chunk('mineUrl');
  exports.accountUrl = accountUrl = _chunk('accountUrl');
  exports.tradeUrl = tradeUrl = _chunk('tradeUrl');
  exports.otherUrl = otherUrl = _chunk('otherUrl');
}

function _chunk(chunk) {
  var map = {};
  for (var title in sdkApi[chunk]) {
    if (sdkApi[chunk].hasOwnProperty(title)) {
      map[title] = _(chunk, title);
    }
  }
  return map;
}

function _(chunk, title) {
  var map = {};
  if (_urlMap && _urlMap.hasOwnProperty(chunk) && _urlMap[chunk].hasOwnProperty(title)) {
    return _urlMap[chunk][title];
  } else {
    console.log('Didn\'t find the method at ( ' + chunk + ',' + title + ' ), please contact the Author => cuppi');
  }
  return '';
}