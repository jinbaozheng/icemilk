'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.otherUrl = exports.tradeUrl = exports.accountUrl = exports.mineUrl = exports.filmUrl = exports.cinemaUrl = exports.cityUrl = undefined;

var _ownKeys = require('babel-runtime/core-js/reflect/own-keys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

exports.UseConfig = UseConfig;

var _icbcUrl = require('../differentiation/icbc.url.config');

var _icbcUrl2 = _interopRequireDefault(_icbcUrl);

var _shanghaiUrl = require('../differentiation/shanghai.url.config');

var _shanghaiUrl2 = _interopRequireDefault(_shanghaiUrl);

var _icmcUrl = require('../differentiation/icmc.url.config');

var _icmcUrl2 = _interopRequireDefault(_icmcUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _inType = '';
var _TYPE_OBJECT = { 'ICBC-APP': _icbcUrl2.default, 'SHANGHAI-APP': _shanghaiUrl2.default, 'ICMC-APP': _icmcUrl2.default };
var _VISIBLE_TYPE = (0, _ownKeys2.default)(_TYPE_OBJECT);

function UseConfig(inType) {
  if (_VISIBLE_TYPE.indexOf(inType) === -1) {
    console.log('ERROR: the inType value is non-existent, please look inType at config. \n the inType value is one of ( ' + _VISIBLE_TYPE.join(', ') + ' )');
    return;
  }
  _inType = inType;
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
    map[title] = _(chunk, title);
  }
  return map;
}

function _(chunk, title) {
  var map = {};
  var UseUrl = null;

  UseUrl = _TYPE_OBJECT[_inType];
  if (UseUrl && UseUrl.hasOwnProperty(chunk) && UseUrl[chunk].hasOwnProperty(title)) {
    return UseUrl[chunk][title];
  } else {
    console.log('Didn\'t find the method at ( ' + chunk + ',' + title + ' ), please contact the Author => cuppi');
  }
  return '';
}