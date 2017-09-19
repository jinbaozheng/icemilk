"use strict";
/**
 * Created by cuppi on 2017/2/9.
 */

Object.defineProperty(exports, "__esModule", { value: true });
// import ICBCUrl from '../differentiation/icbc.url.config';
// import ShangHaiUrl from '../differentiation/shanghai.url.config';
// import ICMCUrl from '../differentiation/icmc.url.config';
exports.cityUrl = {};
exports.cinemaUrl = {};
exports.filmUrl = {};
exports.mineUrl = {};
exports.accountUrl = {};
exports.tradeUrl = {};
exports.otherUrl = {};
// SDK 用到的所有的网络请求请求都在这里
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
};
// let _inType = '';
// let _TYPE_OBJECT = {'ICBC-APP': ICBCUrl, 'SHANGHAI-APP': ShangHaiUrl, 'ICMC-APP': ICMCUrl};
// let _VISIBLE_TYPE = Reflect.ownKeys(_TYPE_OBJECT);
var _urlMap = {};
function UseConfig(urlMap) {
    _urlMap = urlMap;
    exports.cityUrl = _chunk('cityUrl');
    exports.cinemaUrl = _chunk('cinemaUrl');
    exports.filmUrl = _chunk('filmUrl');
    exports.mineUrl = _chunk('mineUrl');
    exports.accountUrl = _chunk('accountUrl');
    exports.tradeUrl = _chunk('tradeUrl');
    exports.otherUrl = _chunk('otherUrl');
}
exports.UseConfig = UseConfig;
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
//# sourceMappingURL=JUrlList.js.map
