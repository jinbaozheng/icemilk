/**
 * Created by cuppi on 2016/11/29.
 */
'use strict';

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var JUrlList_1 = require("../unify/JUrlList");
var JToolDate_1 = require("../tool/JToolDate");
var JDataUnify_1 = require("../unify/JDataUnify");
var JManagerSeat_1 = require("../util/JManagerSeat");
var JNetworkRoot_1 = require("./JNetworkRoot");
/**
 * 影院接口
 * @memberOf module:network
 */

var JNetworkCinema = function (_JNetworkRoot_1$defau) {
    (0, _inherits3.default)(JNetworkCinema, _JNetworkRoot_1$defau);

    function JNetworkCinema() {
        (0, _classCallCheck3.default)(this, JNetworkCinema);
        return (0, _possibleConstructorReturn3.default)(this, (JNetworkCinema.__proto__ || (0, _getPrototypeOf2.default)(JNetworkCinema)).apply(this, arguments));
    }

    (0, _createClass3.default)(JNetworkCinema, [{
        key: "cinemaDetail",

        /**
         * 获取影院详情
         * @param {string} cinemaId 影院ID
         * @returns {Promise} promise
         */
        value: function cinemaDetail(cinemaId) {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                _this2.prefixPromise(JUrlList_1.cinemaUrl.jbzDetail, { cinemaId: cinemaId }).then(function (data) {
                    resolve(JDataUnify_1.default('cinemaUrl.jbzDetail', data, 0));
                }, function (error) {
                    reject(error);
                });
            });
        }
    }, {
        key: "cinemaList",
        value: function cinemaList(location, cinemaFilter) {
            var _this3 = this;

            if (cinemaFilter == undefined) {
                cinemaFilter = location;
            }
            return new _promise2.default(function (resolve, reject) {
                var u = undefined;

                var _ref = cinemaFilter ? cinemaFilter : { filmId: u, feature: u, region: u, sort: u, limit: u },
                    filmId = _ref.filmId,
                    feature = _ref.feature,
                    region = _ref.region,
                    sort = _ref.sort,
                    limit = _ref.limit;

                _this3.prefixPromise(JUrlList_1.cinemaUrl.jbzList, (0, _assign2.default)({}, location, { filmId: filmId,
                    feature: feature, regionName: region, orderType: sort, limit: limit })).then(function (data) {
                    resolve(JDataUnify_1.default('cinemaUrl.jbzList', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 获取指定影院排片
         * @param cinemaId 影院Id
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cinemaScreeningFilmList",
        value: function cinemaScreeningFilmList(cinemaId) {
            var _this4 = this;

            return new _promise2.default(function (resolve, reject) {
                return _this4.prefixPromise(JUrlList_1.cinemaUrl.jbzScreeningFilmList, {
                    cinemaId: cinemaId
                }).then(function (data) {
                    resolve(JDataUnify_1.default('cinemaUrl.jbzScreeningFilmList', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 获取指定影院排片日期安排
         * @param cinemaId 影院Id
         * @param filmId 影片Id
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cinemaScreeningDateList",
        value: function cinemaScreeningDateList(cinemaId, filmId) {
            var _this5 = this;

            return new _promise2.default(function (resolve, reject) {
                _this5.prefixPromise(JUrlList_1.cinemaUrl.jbzScreeningDateList, { cinemaId: cinemaId, filmId: filmId }).then(function (data) {
                    resolve(JDataUnify_1.default('cinemaUrl.jbzScreeningDateList', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 获取指定影院排片放映厅安排
         * @param cinemaId 影院Id
         * @param filmId 影片Id
         * @param date 日期（时间戳标示）
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cinemaScreeningItems",
        value: function cinemaScreeningItems(cinemaId, filmId, date) {
            var _this6 = this;

            return new _promise2.default(function (resolve, reject) {
                date = JToolDate_1.default.dateStringFromTimeInterval(date, 'yyyy-MM-dd');
                _this6.prefixPromise(JUrlList_1.cinemaUrl.jbzScreeningItems, { cinemaId: cinemaId, filmId: filmId, date: date }).then(function (data) {
                    resolve(JDataUnify_1.default('cinemaUrl.jbzScreeningItems', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
    }, {
        key: "cinemaSeats",

        /**
         * 实时座位图
         * @param type 平台类型 （必须）
         * @param paras （根据不同平台变化）
         * @returns {*}
         */
        value: function cinemaSeats(type, paras) {
            var _this7 = this;

            if (type === 'meituan' || type === 'dazhong') {
                type = 'maoyan';
            }
            return new _promise2.default(function (resolve, reject) {
                _this7.prefixPromise(JUrlList_1.cinemaUrl.jbzRealtimeSeat, (0, _assign2.default)({ type: type }, paras)).then(function (data) {
                    resolve(JDataUnify_1.default('cinemaUrl.jbzRealtimeSeat', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 智能实时座位图
         * @param type 平台类型 （必须）
         * @param paras （根据不同平台变化）
         * @returns {*}
         */

    }, {
        key: "cinemaSmartSeats",
        value: function cinemaSmartSeats(type, paras) {
            var _this8 = this;

            if (type === 'meituan' || type === 'dazhong') {
                type = 'maoyan';
            }
            return new _promise2.default(function (resolve, reject) {
                _this8.prefixPromise(JUrlList_1.cinemaUrl.jbzRealtimeSeat, (0, _assign2.default)({ type: type }, paras)).then(function (data) {
                    resolve(JManagerSeat_1.default.defaultManager().smartSeatsFromSeats(type, JDataUnify_1.default('cinemaUrl.jbzRealtimeSmartSeat', data)));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 收藏影院
         * @param cinemaId 影院Id
         * @param cinemaName 影院名字
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cinemaFavoriteCinema",
        value: function cinemaFavoriteCinema(cinemaId, cinemaName) {
            return this.prefixPromise(JUrlList_1.cinemaUrl.jbzCollectcinema, {
                cinemaId: cinemaId,
                cinemaName: cinemaName
            });
        }
        /**
         * 取消收藏影院
         * @param cinemaId 影院Id
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cinemaCancelFavoriteCinema",
        value: function cinemaCancelFavoriteCinema(cinemaId) {
            return this.prefixPromise(JUrlList_1.cinemaUrl.jbzCancelcollectcinema, {});
        }
    }], [{
        key: "cinemaDetail",
        value: function cinemaDetail(cinemaId) {
            return this.instance().cinemaDetail(cinemaId);
        }
    }, {
        key: "cinemaList",
        value: function cinemaList(a, b) {
            return this.instance().cinemaList(a, b);
        }
    }, {
        key: "cinemaScreeningFilmList",
        value: function cinemaScreeningFilmList(cinemaId) {
            return this.instance().cinemaScreeningFilmList(cinemaId);
        }
    }, {
        key: "cinemaScreeningDateList",
        value: function cinemaScreeningDateList(cinemaId, filmId) {
            return this.instance().cinemaScreeningDateList(cinemaId, filmId);
        }
    }, {
        key: "cinemaScreeningItems",
        value: function cinemaScreeningItems(cinemaId, filmId, date) {
            return this.instance().cinemaScreeningItems(cinemaId, filmId, date);
        }
    }, {
        key: "cinemaSeats",
        value: function cinemaSeats(type, paras) {
            return this.instance().cinemaSeats(type, paras);
        }
    }, {
        key: "cinemaSmartSeats",
        value: function cinemaSmartSeats(type, paras) {
            return this.instance().cinemaSmartSeats(type, paras);
        }
    }, {
        key: "cinemaFavoriteCinema",
        value: function cinemaFavoriteCinema(cinemaId, cinemaName) {
            return this.instance().cinemaFavoriteCinema(cinemaId, cinemaName);
        }
    }, {
        key: "cinemaCancelFavoriteCinema",
        value: function cinemaCancelFavoriteCinema(cinemaId) {
            return this.instance().cinemaCancelFavoriteCinema(cinemaId);
        }
    }]);
    return JNetworkCinema;
}(JNetworkRoot_1.default);

exports.default = JNetworkCinema;
//# sourceMappingURL=JNetworkCinema.js.map
