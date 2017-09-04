/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var JNetwork_js_1 = require("./JNetwork.js");
var JUrlList_1 = require("../unify/JUrlList");
var JDataUnify_1 = require("../unify/JDataUnify");
/**
 * 影片接口
 * @memberOf module:network
 */
var JNetworkFilm = function () {
    function JNetworkFilm() {}
    /**
     * 获取热门电影
     * @param page PageModel 分页模型
     * @returns {Promise}
     */
    JNetworkFilm.filmHotfilms = function (page) {
        if (!page) {
            return new _promise2.default(function (resolve, reject) {
                JNetwork_js_1.default.POST(JUrlList_1.filmUrl.jbzHotFilms).then(function (data) {
                    resolve(JDataUnify_1.default('filmUrl.jbzHotFilms', data));
                }, function (error) {
                    reject(error);
                });
            });
        } else {
            return new _promise2.default(function (resolve, reject) {
                JNetwork_js_1.default.POST(JUrlList_1.filmUrl.jbzHotFilmsPage, { page: page.index, size: page.size }).then(function (data) {
                    resolve(JDataUnify_1.default('filmUrl.jbzHotFilmsPage', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
    };
    /**
     * 获取热门电影
     * @returns {{terminate, then}|*}
     */
    JNetworkFilm.filmHotfilmsSimple = function () {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.filmUrl.jbzHotFilmsSimple).then(function (data) {
                resolve(JDataUnify_1.default('filmUrl.jbzHotFilmsSimple', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 获取待映电影
     * @param page 页号
     * @returns {Promise}
     */
    JNetworkFilm.filmWaitfilms = function (page) {
        if (!page) {
            return new _promise2.default(function (resolve, reject) {
                JNetwork_js_1.default.POST(JUrlList_1.filmUrl.jbzWaitFilms).then(function (data) {
                    resolve(JDataUnify_1.default('filmUrl.jbzWaitFilms', data));
                }, function (error) {
                    reject(error);
                });
            });
        } else {
            return new _promise2.default(function (resolve, reject) {
                JNetwork_js_1.default.POST(JUrlList_1.filmUrl.jbzWaitFilmsPage, { page: page.index, size: page.size }).then(function (data) {
                    resolve(JDataUnify_1.default('filmUrl.jbzWaitFilmsPage', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
    };
    /**
     * 获取影片详情
     * @param filmId 影片Id
     * @param platform 平台类型(默认使用jbz平台)
     * @returns {Promise}
     */
    JNetworkFilm.filmDetail = function (filmId, platform) {
        if (platform === void 0) {
            platform = null;
        }
        if (platform && platform !== 'jbz') {
            return new _promise2.default(function (resolve, reject) {
                JNetwork_js_1.default.POST(JUrlList_1.filmUrl.jbzFilmDetailByPartner, { platformFilmId: filmId, platform: platform }).then(function (data) {
                    resolve(JDataUnify_1.default('filmUrl.jbzFilmDetailByPartner', data));
                }, function (error) {
                    reject(error);
                });
            });
        } else {
            return new _promise2.default(function (resolve, reject) {
                JNetwork_js_1.default.POST(JUrlList_1.filmUrl.jbzFilmDetail, { filmId: filmId }).then(function (data) {
                    resolve(JDataUnify_1.default('filmUrl.jbzFilmDetail', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
    };
    /**
     * 获取影片排片日期列表
     * @param filmId 影片Id
     * @param cityId 城市Id
     * @returns {Promise}
     */
    JNetworkFilm.filmDateList = function (filmId, cityId) {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.filmUrl.jbzFilmDate, { filmId: filmId, cityId: cityId }).then(function (data) {
                resolve(JDataUnify_1.default('filmUrl.jbzFilmDate', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    JNetworkFilm.filmDateListNeedCity = function (filmId) {
        console.log(JNetwork_js_1.default.locationParas().cityId);
        return JNetworkFilm.filmDateList(filmId, JNetwork_js_1.default.locationParas().cityId);
    };
    return JNetworkFilm;
}();
exports.default = JNetworkFilm;
//# sourceMappingURL=JNetworkFilm.js.map
