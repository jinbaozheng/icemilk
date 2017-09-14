/**
 * Created by cuppi on 2016/11/22.
 */
'use strict';

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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
var JNetwork_1 = require("./JNetwork");
var JUrlList_1 = require("../unify/JUrlList");
var JDataUnify_1 = require("../unify/JDataUnify");
var JNetworkRoot_1 = require("./JNetworkRoot");
/**
 * 影片接口
 * @memberOf module:network
 */

var JNetworkFilm = function (_JNetworkRoot_1$defau) {
    (0, _inherits3.default)(JNetworkFilm, _JNetworkRoot_1$defau);

    function JNetworkFilm() {
        (0, _classCallCheck3.default)(this, JNetworkFilm);
        return (0, _possibleConstructorReturn3.default)(this, (JNetworkFilm.__proto__ || (0, _getPrototypeOf2.default)(JNetworkFilm)).apply(this, arguments));
    }

    (0, _createClass3.default)(JNetworkFilm, [{
        key: "filmHotfilms",

        /**
         * 获取热门电影
         * @param page PageModel 分页模型
         * @returns {Promise}
         */
        value: function filmHotfilms(page) {
            var _this2 = this;

            if (!page) {
                return new _promise2.default(function (resolve, reject) {
                    var _JNetwork_1$default$P;

                    (_JNetwork_1$default$P = JNetwork_1.default.POST(JUrlList_1.filmUrl.jbzHotFilms)).useParas.apply(_JNetwork_1$default$P, (0, _toConsumableArray3.default)(_this2.otherParas)).then(function (data) {
                        resolve(JDataUnify_1.default('filmUrl.jbzHotFilms', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            } else {
                return new _promise2.default(function (resolve, reject) {
                    var _JNetwork_1$default$P2;

                    (_JNetwork_1$default$P2 = JNetwork_1.default.POST(JUrlList_1.filmUrl.jbzHotFilmsPage, { page: page.index, size: page.size })).useParas.apply(_JNetwork_1$default$P2, (0, _toConsumableArray3.default)(_this2.otherParas)).then(function (data) {
                        resolve(JDataUnify_1.default('filmUrl.jbzHotFilmsPage', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            }
        }
        /**
         * 获取热门电影
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "filmHotfilmsSimple",
        value: function filmHotfilmsSimple() {
            var _this3 = this;

            return new _promise2.default(function (resolve, reject) {
                var _JNetwork_1$default$P3;

                (_JNetwork_1$default$P3 = JNetwork_1.default.POST(JUrlList_1.filmUrl.jbzHotFilmsSimple)).useParas.apply(_JNetwork_1$default$P3, (0, _toConsumableArray3.default)(_this3.otherParas)).then(function (data) {
                    resolve(JDataUnify_1.default('filmUrl.jbzHotFilmsSimple', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 获取待映电影
         * @param page 页号
         * @returns {Promise}
         */

    }, {
        key: "filmWaitfilms",
        value: function filmWaitfilms(page) {
            var _this4 = this;

            if (!page) {
                return new _promise2.default(function (resolve, reject) {
                    var _JNetwork_1$default$P4;

                    (_JNetwork_1$default$P4 = JNetwork_1.default.POST(JUrlList_1.filmUrl.jbzWaitFilms)).useParas.apply(_JNetwork_1$default$P4, (0, _toConsumableArray3.default)(_this4.otherParas)).then(function (data) {
                        resolve(JDataUnify_1.default('filmUrl.jbzWaitFilms', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            } else {
                return new _promise2.default(function (resolve, reject) {
                    var _JNetwork_1$default$P5;

                    (_JNetwork_1$default$P5 = JNetwork_1.default.POST(JUrlList_1.filmUrl.jbzWaitFilmsPage, { page: page.index, size: page.size })).useParas.apply(_JNetwork_1$default$P5, (0, _toConsumableArray3.default)(_this4.otherParas)).then(function (data) {
                        resolve(JDataUnify_1.default('filmUrl.jbzWaitFilmsPage', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            }
        }
        /**
         * 获取影片详情
         * @param filmId 影片Id
         * @param platform 平台类型(默认使用jbz平台)
         * @returns {Promise}
         */

    }, {
        key: "filmDetail",
        value: function filmDetail(filmId) {
            var _this5 = this;

            var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (platform && platform !== 'jbz') {
                return new _promise2.default(function (resolve, reject) {
                    var _JNetwork_1$default$P6;

                    (_JNetwork_1$default$P6 = JNetwork_1.default.POST(JUrlList_1.filmUrl.jbzFilmDetailByPartner, { platformFilmId: filmId, platform: platform })).useParas.apply(_JNetwork_1$default$P6, (0, _toConsumableArray3.default)(_this5.otherParas)).then(function (data) {
                        resolve(JDataUnify_1.default('filmUrl.jbzFilmDetailByPartner', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            } else {
                return new _promise2.default(function (resolve, reject) {
                    var _JNetwork_1$default$P7;

                    (_JNetwork_1$default$P7 = JNetwork_1.default.POST(JUrlList_1.filmUrl.jbzFilmDetail, { filmId: filmId })).useParas.apply(_JNetwork_1$default$P7, (0, _toConsumableArray3.default)(_this5.otherParas)).then(function (data) {
                        resolve(JDataUnify_1.default('filmUrl.jbzFilmDetail', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            }
        }
        /**
         * 获取影片排片日期列表
         * @param filmId 影片Id
         * @returns {Promise}
         */

    }, {
        key: "filmDateList",
        value: function filmDateList(filmId) {
            var _this6 = this;

            return new _promise2.default(function (resolve, reject) {
                var _JNetwork_1$default$P8;

                (_JNetwork_1$default$P8 = JNetwork_1.default.POST(JUrlList_1.filmUrl.jbzFilmDate, { filmId: filmId })).useParas.apply(_JNetwork_1$default$P8, (0, _toConsumableArray3.default)(_this6.otherParas)).then(function (data) {
                    resolve(JDataUnify_1.default('filmUrl.jbzFilmDate', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
    }], [{
        key: "filmHotfilms",
        value: function filmHotfilms(page) {
            return this.instance().filmHotfilms(page);
        }
    }, {
        key: "filmHotfilmsSimple",
        value: function filmHotfilmsSimple() {
            return this.instance().filmHotfilmsSimple();
        }
    }, {
        key: "filmWaitfilms",
        value: function filmWaitfilms(page) {
            return this.instance().filmWaitfilms(page);
        }
    }, {
        key: "filmDetail",
        value: function filmDetail(filmId) {
            var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.instance().filmDetail(filmId, platform);
        }
    }, {
        key: "filmDateList",
        value: function filmDateList(filmId) {
            return this.instance().filmDateList(filmId);
        }
    }]);
    return JNetworkFilm;
}(JNetworkRoot_1.default);

exports.default = JNetworkFilm;
//# sourceMappingURL=JNetworkFilm.js.map
