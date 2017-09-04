/**
 * Created by cuppi on 2016/12/7.
 */
'use strict';

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

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
var JNetworkTrade_js_1 = require("../network/JNetworkTrade.js");
var instance = null;
/**
 * 交易管理类
 * @memberOf module:manager
 */
var TradeManager = function () {
    function TradeManager() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    /**
     * 获取单例实例
     * @returns {TradeManager}
     */
    TradeManager.defaultManager = function () {
        return new TradeManager();
    };
    /**
     * 获取交易商务参数（与座位无关的）
     * @param platform 平台类型
     * @param platformData 平台数据
     * @param filmId 电影Id
     * @param filmName 电影名称
     * @param cinemaId 影院Id
     * @param cinemaName 影院名称
     * @returns {*} 商务参数
     */
    TradeManager.tradeParasFromPlatform = function (platform, platformData, filmId, filmName, cinemaId, cinemaName) {
        if (platform === 'wangpiao') {
            return {
                jbzFilmId: filmId,
                filmId: platformData.filmId,
                showId: platformData.showIndex,
                cinemaName: cinemaName,
                platformCinemaId: platformData.cinemaId,
                cinemaId: cinemaId
            };
        }
        if (platform === 'spider') {
            return {
                jbzFilmId: filmId,
                filmId: platformData.filmId,
                showId: platformData.showId,
                platformCinemaId: platformData.cinemaId,
                cinemaId: cinemaId
            };
        }
        if (platform === 'maizuo') {
            return {
                jbzFilmId: filmId,
                filmId: platformData.filmId,
                showId: platformData.foretellId,
                filmName: filmName,
                cinemaName: cinemaName,
                platformCinemaId: platformData.cinemaId,
                cinemaId: cinemaId
            };
        }
        if (platform === 'danche') {
            return {
                jbzFilmId: filmId,
                filmId: platformData.filmId,
                showId: platformData.id,
                platformCinemaId: platformData.cinemaId,
                cinemaId: cinemaId
            };
        }
        if (platform === 'maoyan' || platform === 'meituan' || platform === 'dazhong') {
            return {
                jbzFilmId: filmId,
                filmId: platformData.filmId,
                showId: platformData.showId,
                cinemaName: cinemaName,
                platformCinemaId: platformData.cinemaId,
                cinemaId: cinemaId
            };
        }
        if (platform === 'baidu') {
            return {
                showId: platformData.seqid,
                platformCinemaId: platformData.cinemaId,
                cinemaId: cinemaId
            };
        }
    };
    /**
     * 获取锁座处理者
     * @param type 平台类型
     * @param paras 参数
     * @returns {*} 返回请求promise
     */
    TradeManager.prototype.lockSeatHandlerFrom = function (type, paras) {
        return JNetworkTrade_js_1.default.tradeLockSeatNeedLogin(type, paras);
    };
    /**
     * 获取下订单处理者
     * @param type 平台类型
     * @param paras 参数
     * @returns {{terminate, then}|*} 返回请求promise
     */
    TradeManager.prototype.confirmOrderHandlerFrom = function (type, paras) {
        return JNetworkTrade_js_1.default.tradeConfirmOrderNeedLogin(type, paras);
    };
    /**
     * 获取锁座时需要的座位参数
     * @param type 平台类型
     * @param seatList 座位列表（需要购买的）
     * @param mobile 手机号码
     * @param openId 身份标识符（目前跟手机号码一样）
     * @returns {*} 返回参数对象
     */
    TradeManager.prototype.seatInforParas = function (type, seatList, mobile) {
        // 网票
        if (type === 'wangpiao') {
            var seatInfos = [];
            var seatNumberInfos = [];
            for (var _i = 0, seatList_1 = seatList; _i < seatList_1.length; _i++) {
                var seat = seatList_1[_i];
                seatInfos.push(seat.seatModel.SeatIndex);
                seatNumberInfos.push(seat.rowNumber + ':' + seat.colNumber);
            }
            return {
                seatIds: seatInfos.join('|'),
                count: seatInfos.length,
                seatNumberInfos: seatNumberInfos.join('|'),
                mobile: mobile,
                openId: openId
            };
        }
        // 蜘蛛
        if (type === 'spider') {
            var seatInfos = [];
            var seatNumberInfos = [];
            for (var _a = 0, seatList_2 = seatList; _a < seatList_2.length; _a++) {
                var seat = seatList_2[_a];
                seatInfos.push(seat.seatModel.rowId + ':' + seat.seatModel.columnId);
                seatNumberInfos.push(seat.rowNumber + ':' + seat.colNumber);
            }
            return {
                seatIds: seatInfos.join('|'),
                count: seatInfos.length,
                seatNumberInfos: seatNumberInfos.join('|'),
                mobile: mobile,
                openId: openId
            };
        }
        // 卖座
        if (type === 'maizuo') {
            var seatInfos = [];
            var seatNumberInfos = [];
            for (var _b = 0, seatList_3 = seatList; _b < seatList_3.length; _b++) {
                var seat = seatList_3[_b];
                seatInfos.push(seat.seatModel.rowId + ':' + seat.seatModel.columnId);
                seatNumberInfos.push(seat.rowNumber + ':' + seat.colNumber);
            }
            return {
                seatIds: seatInfos.join('|'),
                count: seatInfos.length,
                seatNumberInfos: seatNumberInfos.join('|'),
                mobile: mobile,
                openId: openId
            };
        }
        // 单车
        if (type === 'danche') {
            var seatInfos = [];
            var seatNumberInfos = [];
            for (var _c = 0, seatList_4 = seatList; _c < seatList_4.length; _c++) {
                var seat = seatList_4[_c];
                seatInfos.push(seat.seatModel.rowId + ':' + seat.seatModel.columnId);
                seatNumberInfos.push(seat.rowNumber + ':' + seat.colNumber);
            }
            return {
                seatIds: seatInfos.join('|'),
                count: seatInfos.length,
                seatNumberInfos: seatNumberInfos.join('|'),
                mobile: mobile,
                openId: openId
            };
        }
        // 猫眼
        if (type === 'maoyan' || type === 'meituan' || type === 'dazhong') {
            var seatInfos = [];
            var seatNumberInfos = [];
            for (var _d = 0, seatList_5 = seatList; _d < seatList_5.length; _d++) {
                var seat = seatList_5[_d];
                if (!seat.seatModel || true) {
                    console.log(seat);
                }
                console.log(seat.seatModel);
                seatInfos.push({
                    sectionId: seat.seatModel.sectionId,
                    columnId: seat.seatModel.columnId,
                    rowId: seat.seatModel.rowId,
                    seatNo: seat.seatModel.seatNo
                });
                seatNumberInfos.push(seat.rowNumber + ':' + seat.colNumber);
            }
            return {
                seatIds: (0, _stringify2.default)({
                    count: seatList.length,
                    list: seatInfos
                }),
                seatNumberInfos: seatNumberInfos.join('|'),
                mobile: mobile,
                openId: openId
            };
        }
        // 百度
        if (type === 'baidu') {
            var seatIds = [];
            var seatNumberInfos = [];
            for (var _e = 0, seatList_6 = seatList; _e < seatList_6.length; _e++) {
                var seat = seatList_6[_e];
                seatIds.push(seat.seatModel.seatNo);
                seatNumberInfos.push(seat.seatModel.rowId + ':' + seat.seatModel.columnId);
            }
            return {
                count: seatIds.length,
                //  后台设置特意反过来的
                seatIds: seatNumberInfos.join('|'),
                seatNumberInfos: seatIds.join('|'),
                mobile: mobile,
                openId: openId
            };
        }
    };
    /**
     * 购票（执行锁座 下订单 的事务）
     * @param type 平台类型
     * @param tradeParas 商务参数（与座位无关的参数集合）
     * @param seatList 座位列表
     * @param mobile 手机号码
     * @param openId 身份标识符（同上）
     * @returns {*} 返回请求promise
     */
    TradeManager.prototype.buyTicket = function (type, tradeParas, seatList, mobile) {
        var paras = __assign({}, tradeParas, this.seatInforParas(type, seatList, mobile));
        var bridgeSelf = this;
        return {
            next: function next(lockSeatCallback) {
                return {
                    next: function next(confirmOrderCallback) {
                        bridgeSelf.lockSeatHandlerFrom(type, __assign({}, paras, { cinemaId: paras.platformCinemaId })).then(function (data) {
                            lockSeatCallback(null, data);
                            var orderId = data.orderId;
                            var cinemaId = paras.cinemaId,
                                jbzFilmId = paras.jbzFilmId,
                                filmId = paras.filmId,
                                showId = paras.showId;
                            var cityId = store.getState().location.locationCity.id;
                            var cityName = store.getState().location.locationCity.name;
                            bridgeSelf.confirmOrderHandlerFrom(type, {
                                orderId: orderId,
                                cinemaId: cinemaId,
                                jbzFilmId: jbzFilmId,
                                filmId: filmId,
                                showId: showId,
                                cityId: cityId,
                                cityName: cityName
                            }).then(function (data) {
                                confirmOrderCallback(null, data);
                            }, function (error) {
                                confirmOrderCallback(error, null);
                            });
                        }, function (error) {
                            lockSeatCallback(error, null);
                        });
                    }
                };
            }
        };
    };
    /**
     * 锁座
     * @param type 平台类型
     * @param tradeParas 商务参数（与座位无关的参数集合）
     * @param seatList 座位列表
     * @param mobile 手机号码
     * @returns {Promise} 返回请求promise
     */
    TradeManager.prototype.lockSeat = function (type, tradeParas, seatList, mobile) {
        var _this = this;
        var paras = __assign({}, tradeParas, this.seatInforParas(type, seatList, mobile));
        return new _promise2.default(function (resolve, reject) {
            _this.lockSeatHandlerFrom(type, __assign({}, paras, { cinemaId: paras.platformCinemaId })).then(function (data) {
                var orderId = data.orderId;
                var amount = data.originalAmount;
                var cinemaId = paras.cinemaId,
                    jbzFilmId = paras.jbzFilmId,
                    filmId = paras.filmId,
                    showId = paras.showId;
                // 下面两个
                var cityId = store.getState().location.locationCity.id;
                var cityName = store.getState().location.locationCity.name;
                resolve({
                    orderId: orderId,
                    amount: amount,
                    cinemaId: cinemaId,
                    jbzFilmId: jbzFilmId,
                    filmId: filmId,
                    showId: showId,
                    cityId: cityId,
                    cityName: cityName
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 确认订单
     * @param type 平台类型
     * @param lockSeatResultData 锁座成功返回的数据
     * @returns {Promise}
     */
    TradeManager.prototype.applyOrder = function (type, lockSeatResultData) {
        var _this = this;
        return new _promise2.default(function (resolve, reject) {
            _this.confirmOrderHandlerFrom(type, lockSeatResultData).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    return TradeManager;
}();
exports.default = TradeManager;
//# sourceMappingURL=JManagerTrade.js.map
