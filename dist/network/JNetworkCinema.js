/**
 * Created by cuppi on 2016/11/29.
 */
'use strict';

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || _assign2.default || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var JNetwork_js_1 = require("./JNetwork.js");
var JUrlList_1 = require("../unify/JUrlList");
var JToolDate_1 = require("../tool/JToolDate");
var JDataUnify_1 = require("../unify/JDataUnify");
var JManagerSeat_1 = require("../util/JManagerSeat");
/**
 * 影院接口
 * @memberOf module:network
 */
var JNetworkCinema = function () {
    function JNetworkCinema() {}
    /**
     * 获取影院详情
     * @param {string} cinemaId 影院ID
     * @returns {Promise} promise
     */
    JNetworkCinema.cinemaDetail = function (cinemaId) {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzDetail, { cinemaId: cinemaId }).then(function (data) {
                resolve(JDataUnify_1.default('cinemaUrl.jbzDetail', data, 0));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 获取影院详情(使用登录属性判断是否影院被收藏)
     * @param {string} cinemaId 影院ID
     * @returns {Promise} promise
     */
    JNetworkCinema.cinemaDetailCanLogin = function (cinemaId) {
        var loginParas = JNetwork_js_1.default.loginParas();
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzDetail, __assign({ cinemaId: cinemaId }, loginParas)).then(function (data) {
                resolve(JDataUnify_1.default('cinemaUrl.jbzDetail', data, 1));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 影院列表
     * @param {CoordinateModel} location
     * @param {} cinemaFilter
     * @returns {Promise}
     */
    JNetworkCinema.cinemaList = function (location, cinemaFilter) {
        return new _promise2.default(function (resolve, reject) {
            var _a = cinemaFilter ? cinemaFilter : {},
                filmId = _a.filmId,
                feature = _a.feature,
                region = _a.region,
                sort = _a.sort,
                limit = _a.limit;
            JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzList, __assign({}, location, { filmId: filmId,
                feature: feature, regionName: region, orderType: sort, limit: limit })).then(function (data) {
                resolve(JDataUnify_1.default('cinemaUrl.jbzList', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 影院列表
     * @param cinemaFilter 影片筛选条件
     * @returns {{terminate, then}|*}
     */
    JNetworkCinema.cinemaListNeedLocation = function (cinemaFilter) {
        var location = JNetwork_js_1.default.locationParas();
        return JNetworkCinema.cinemaList(location, cinemaFilter);
    };
    /**
     * 获取指定影院排片
     * @param cinemaId 影院Id
     * @returns {{terminate, then}|*}
     */
    JNetworkCinema.cinemaScreeningFilmList = function (cinemaId) {
        var loginParas = JNetwork_js_1.default.loginParas();
        var account = {};
        if (loginParas.hasAccount) {
            account = { openId: loginParas.openId, sessionId: loginParas.sessionId };
        }
        return new _promise2.default(function (resolve, reject) {
            return JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzScreeningFilmList, {
                cinemaId: cinemaId
            }, account).then(function (data) {
                resolve(JDataUnify_1.default('cinemaUrl.jbzScreeningFilmList', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 获取指定影院排片日期安排
     * @param cinemaId 影院Id
     * @param filmId 影片Id
     * @returns {{terminate, then}|*}
     */
    JNetworkCinema.cinemaScreeningDateList = function (cinemaId, filmId) {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzScreeningDateList, { cinemaId: cinemaId, filmId: filmId }).then(function (data) {
                resolve(JDataUnify_1.default('cinemaUrl.jbzScreeningDateList', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 获取指定影院排片放映厅安排
     * @param cinemaId 影院Id
     * @param filmId 影片Id
     * @param date 日期（时间戳标示）
     * @returns {{terminate, then}|*}
     */
    JNetworkCinema.cinemaScreeningItems = function (cinemaId, filmId, date) {
        return new _promise2.default(function (resolve, reject) {
            date = JToolDate_1.default.dateStringFromTimeInterval(date, 'yyyy-MM-dd');
            JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzScreeningItems, { cinemaId: cinemaId, filmId: filmId, date: date }).then(function (data) {
                resolve(JDataUnify_1.default('cinemaUrl.jbzScreeningItems', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    /**
     * 实时座位图
     * @param type 平台类型 （必须）
     * @param paras （根据不同平台变化）
     * @returns {*}
     */
    JNetworkCinema.cinemaSeats = function (type, paras) {
        if (type === 'meituan' || type === 'dazhong') {
            type = 'maoyan';
        }
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzRealtimeSeat, __assign({ type: type }, paras)).then(function (data) {
                resolve(JDataUnify_1.default('cinemaUrl.jbzRealtimeSeat', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 智能实时座位图
     * @param type 平台类型 （必须）
     * @param paras （根据不同平台变化）
     * @returns {*}
     */
    JNetworkCinema.cinemaSmartSeats = function (type, paras) {
        if (type === 'meituan' || type === 'dazhong') {
            type = 'maoyan';
        }
        return new _promise2.default(function (resolve, reject) {
            JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzRealtimeSeat, __assign({ type: type }, paras)).then(function (data) {
                resolve(JManagerSeat_1.default.defaultManager().smartSeatsFromSeats(type, JDataUnify_1.default('cinemaUrl.jbzRealtimeSmartSeat', data)));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 收藏影院
     * @param cinemaId 影院Id
     * @param cinemaName 影院名字
     * @returns {{terminate, then}|*}
     */
    JNetworkCinema.cinemaFavoriteCinemaNeedLogin = function (cinemaId, cinemaName) {
        var loginParas = JNetwork_js_1.default.loginParas();
        if (!loginParas.hasAccount) {
            return JNetwork_js_1.default.failedAuthorizationNetwork();
        }
        return JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzCollectcinema, {
            openId: loginParas.openId,
            cinemaId: cinemaId,
            cinemaName: cinemaName
        }, {
            'sessionId': loginParas.sessionId
        });
    };
    /**
     * 取消收藏影院
     * @param cinemaId 影院Id
     * @returns {{terminate, then}|*}
     */
    JNetworkCinema.cinemaCancelFavoriteCinemaNeedLogin = function (cinemaId) {
        var loginParas = JNetwork_js_1.default.loginParas();
        if (!loginParas.hasAccount) {
            return JNetwork_js_1.default.failedAuthorizationNetwork();
        }
        return JNetwork_js_1.default.POST(JUrlList_1.cinemaUrl.jbzCancelcollectcinema, {
            openId: loginParas.openId,
            cinemaId: cinemaId
        }, {
            'sessionId': loginParas.sessionId
        });
    };
    return JNetworkCinema;
}();
exports.default = JNetworkCinema;
//# sourceMappingURL=JNetworkCinema.js.map
