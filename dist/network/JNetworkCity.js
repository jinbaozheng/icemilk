/**
 * Created by cuppi on 2016/11/30.
 */
'use strict';

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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
var JPromise_1 = require("../structure/JPromise");
var JNetworkRoot_1 = require("./JNetworkRoot");
/**
 * 城市及定位接口
 * @memberOf module:network
 * @hideconstructor
 */

var JNetworkCity = function (_JNetworkRoot_1$defau) {
    (0, _inherits3.default)(JNetworkCity, _JNetworkRoot_1$defau);

    function JNetworkCity() {
        (0, _classCallCheck3.default)(this, JNetworkCity);
        return (0, _possibleConstructorReturn3.default)(this, (JNetworkCity.__proto__ || (0, _getPrototypeOf2.default)(JNetworkCity)).apply(this, arguments));
    }

    (0, _createClass3.default)(JNetworkCity, [{
        key: "cityList",

        /**
         *  获取城市列表
         * @returns {*}
         */
        value: function cityList() {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                var _JNetwork_1$default$P;

                (_JNetwork_1$default$P = JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzCities)).useParas.apply(_JNetwork_1$default$P, (0, _toConsumableArray3.default)(_this2.otherParas)).then(function (data) {
                    resolve(JDataUnify_1.default('cityUrl.jbzCities', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         *  通过经纬度获取城市
         *  @param coordinate 位置信息
         * @returns {*}
         */

    }, {
        key: "cityByCoordinate",
        value: function cityByCoordinate(coordinate) {
            var _this3 = this;

            return new _promise2.default(function (resolve, reject) {
                var _JNetwork_1$default$P2;

                (_JNetwork_1$default$P2 = JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzCityByCoordinate, coordinate)).useParas.apply(_JNetwork_1$default$P2, (0, _toConsumableArray3.default)(_this3.otherParas)).then(function (data) {
                    resolve(JDataUnify_1.default('cityUrl.jbzCityByCoordinate', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**+
         * 通过经纬度获取城市（通过代理传递）
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cityNeedCoordinate",
        value: function cityNeedCoordinate() {
            var _this4 = this;

            return new _promise2.default(function (resolve, reject) {
                var _JNetwork_1$default$P3;

                (_JNetwork_1$default$P3 = JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzCityByCoordinate, (0, _assign2.default)({}, JNetwork_1.default.locationParas()))).useParas.apply(_JNetwork_1$default$P3, (0, _toConsumableArray3.default)(_this4.otherParas)).then(function (data) {
                    resolve(JDataUnify_1.default('cityUrl.jbzCityByCoordinate', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 通过城市id获取城市
         * @param cityId
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cityById",
        value: function cityById(cityId) {
            var _this5 = this;

            return JPromise_1.default.create(function (resolve, reject) {
                var _JNetwork_1$default$P4;

                (_JNetwork_1$default$P4 = JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzCityById, { cityId: cityId })).useParas.apply(_JNetwork_1$default$P4, (0, _toConsumableArray3.default)(_this5.otherParas)).then(function (data) {
                    resolve(JDataUnify_1.default('cityUrl.jbzCityById', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**+
         * 获取地区列表
         * @param cityId
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cityDistrictList",
        value: function cityDistrictList(cityId) {
            var _this6 = this;

            return new _promise2.default(function (resolve, reject) {
                var _JNetwork_1$default$P5;

                (_JNetwork_1$default$P5 = JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzDistricts, { cityId: cityId })).useParas.apply(_JNetwork_1$default$P5, (0, _toConsumableArray3.default)(_this6.otherParas)).then(function (data) {
                    resolve(JDataUnify_1.default('cityUrl.jbzDistricts', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 获取热门城市列表
         * @returns {{terminate, then}|*}
         */

    }, {
        key: "cityHotList",
        value: function cityHotList() {
            var _this7 = this;

            return new _promise2.default(function (resolve, reject) {
                var _JNetwork_1$default$P6;

                (_JNetwork_1$default$P6 = JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzHotCities)).useParas.apply(_JNetwork_1$default$P6, (0, _toConsumableArray3.default)(_this7.otherParas)).then(function (data) {
                    resolve(JDataUnify_1.default('cityUrl.jbzHotCities', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
    }], [{
        key: "cityList",
        value: function cityList() {
            return this.instance().cityList();
        }
    }, {
        key: "cityByCoordinate",
        value: function cityByCoordinate(coordinate) {
            return this.instance().cityByCoordinate(coordinate);
        }
    }, {
        key: "cityNeedCoordinate",
        value: function cityNeedCoordinate() {
            return this.instance().cityNeedCoordinate();
        }
    }, {
        key: "cityById",
        value: function cityById(cityId) {
            return this.instance().cityById(cityId);
        }
    }, {
        key: "cityDistrictList",
        value: function cityDistrictList(cityId) {
            return this.instance().cityDistrictList(cityId);
        }
    }, {
        key: "cityHotList",
        value: function cityHotList() {
            return this.instance().cityHotList();
        }
    }]);
    return JNetworkCity;
}(JNetworkRoot_1.default);

exports.default = JNetworkCity;
//# sourceMappingURL=JNetworkCity.js.map
