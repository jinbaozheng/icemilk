/**
 * Created by cuppi on 2016/12/1.
 */
'use strict';

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
var JDataUnify_1 = require("../unify/JDataUnify");
var JNetworkRoot_1 = require("./JNetworkRoot");
/**
 * 其他接口
 * @memberOf module:network
 */

var JNetworkOther = function (_JNetworkRoot_1$defau) {
    (0, _inherits3.default)(JNetworkOther, _JNetworkRoot_1$defau);

    function JNetworkOther() {
        (0, _classCallCheck3.default)(this, JNetworkOther);
        return (0, _possibleConstructorReturn3.default)(this, (JNetworkOther.__proto__ || (0, _getPrototypeOf2.default)(JNetworkOther)).apply(this, arguments));
    }

    (0, _createClass3.default)(JNetworkOther, [{
        key: "search",

        /**
         * 搜索
         * @param cityId 城市Id
         * @param searchKey 关键字
         * @param nextPageFirstKey 下一页的句柄
         * @returns {Promise}
         */
        value: function search(cityId, searchKey, nextPageFirstKey) {
            var _this2 = this;

            if (cityId) {
                return new _promise2.default(function (resolve, reject) {
                    _this2.prefixPromise(JUrlList_1.otherUrl.jbzSearch, {
                        cityId: cityId,
                        queryStr: searchKey,
                        lastKey: nextPageFirstKey
                    }).then(function (data) {
                        resolve(JDataUnify_1.default('otherUrl.jbzSearch', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            } else {
                return new _promise2.default(function (resolve, reject) {
                    _this2.prefixPromise(JUrlList_1.otherUrl.jbzSearch, {
                        queryStr: searchKey,
                        lastKey: nextPageFirstKey
                    }).then(function (data) {
                        resolve(JDataUnify_1.default('otherUrl.jbzSearch', data));
                    }, function (error) {
                        reject(error);
                    });
                });
            }
        }
        /**
         * 热搜词汇
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "hotSearchKeyword",
        value: function hotSearchKeyword() {
            return this.prefixPromise(JUrlList_1.otherUrl.jbzHotSearchKeyword);
        }
        /**
         * 广告接口
         * @param location 广告使用地点
         * @param cityId 当前城市
         * @returns {Promise}
         */

    }, {
        key: "otherBanners",
        value: function otherBanners(location, cityId) {
            var _this3 = this;

            return new _promise2.default(function (resolve, reject) {
                return _this3.prefixPromise(JUrlList_1.otherUrl.jbzBanners, {
                    location: location, cityId: cityId
                }).then(function (data) {
                    resolve(JDataUnify_1.default('otherUrl.jbzBanners', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**+
         * 广告接口
         * @param position 广告使用地点
         * @param cityId 当前城市
         * @returns {Promise}
         */

    }, {
        key: "banners",
        value: function banners(position, cityId) {
            return this.prefixPromise(position, cityId);
        }
    }], [{
        key: "search",
        value: function search(cityId, searchKey, nextPageFirstKey) {
            return this.instance().search(cityId, searchKey, nextPageFirstKey);
        }
    }, {
        key: "hotSearchKeyword",
        value: function hotSearchKeyword() {
            return this.instance().hotSearchKeyword();
        }
    }, {
        key: "otherBanners",
        value: function otherBanners(location, cityId) {
            return this.instance().otherBanners(location, cityId);
        }
    }, {
        key: "banners",
        value: function banners(position, cityId) {
            return this.instance().banners(position, cityId);
        }
    }]);
    return JNetworkOther;
}(JNetworkRoot_1.default);

exports.default = JNetworkOther;
//# sourceMappingURL=JNetworkOther.js.map
