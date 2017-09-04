/**
 * Created by cuppi on 2016/11/30.
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
var JNetwork_1 = require("./JNetwork");
var JUrlList_1 = require("../unify/JUrlList");
var JDataUnify_1 = require("../unify/JDataUnify");
/**
 * 城市及定位接口
 * @memberOf module:network
 * @hideconstructor
 */
var JNetworkCity = function () {
    function JNetworkCity() {}
    /**
     *  获取城市列表
     * @returns {*}
     */
    JNetworkCity.cityList = function () {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzCities).then(function (data) {
                resolve(JDataUnify_1.default('cityUrl.jbzCities', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     *  通过经纬度获取城市
     *  @param coordinate 位置信息
     * @returns {*}
     */
    JNetworkCity.cityByCoordinate = function (coordinate) {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzCityByCoordinate, coordinate).then(function (data) {
                resolve(JDataUnify_1.default('cityUrl.jbzCityByCoordinate', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**+
     * 通过经纬度获取城市（通过代理传递）
     * @returns {{terminate, then}|*}
     */
    JNetworkCity.cityNeedCoordinate = function () {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzCityByCoordinate, __assign({}, JNetwork_1.default.locationParas())).then(function (data) {
                resolve(JDataUnify_1.default('cityUrl.jbzCityByCoordinate', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 通过城市id获取城市
     * @param cityId
     * @returns {{terminate, then}|*}
     */
    JNetworkCity.cityById = function (cityId) {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzCityById, { cityId: cityId }).then(function (data) {
                resolve(JDataUnify_1.default('cityUrl.jbzCityById', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**+
     * 获取地区列表
     * @param cityId
     * @returns {{terminate, then}|*}
     */
    JNetworkCity.cityDistrictList = function (cityId) {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzDistricts, { cityId: cityId }).then(function (data) {
                resolve(JDataUnify_1.default('cityUrl.jbzDistricts', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * 获取热门城市列表
     * @returns {{terminate, then}|*}
     */
    JNetworkCity.cityHotList = function () {
        return new _promise2.default(function (resolve, reject) {
            JNetwork_1.default.POST(JUrlList_1.cityUrl.jbzHotCities).then(function (data) {
                resolve(JDataUnify_1.default('cityUrl.jbzHotCities', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    return JNetworkCity;
}();
exports.default = JNetworkCity;
//# sourceMappingURL=JNetworkCity.js.map
