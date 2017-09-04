/**
 * Created by cuppi on 2016/12/1.
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
 * 其他接口
 * @memberOf module:network
 */
var JNetworkOther = function () {
    function JNetworkOther() {}
    /**
     * 搜索
     * @param cityId 城市Id
     * @param searchKey 关键字
     * @param nextPageFirstKey 下一页的句柄
     * @returns {Promise}
     */
    JNetworkOther.search = function (cityId, searchKey, nextPageFirstKey) {
        if (cityId) {
            return JNetwork_js_1.default.POST(JUrlList_1.otherUrl.jbzSearch, {
                cityId: cityId,
                queryStr: searchKey,
                lastKey: nextPageFirstKey
            });
        } else {
            return JNetwork_js_1.default.POST(JUrlList_1.otherUrl.jbzSearch, {
                queryStr: searchKey,
                lastKey: nextPageFirstKey
            });
        }
    };
    /**
     * 热搜词汇
     * @returns {{terminate, then}|*}
     */
    JNetworkOther.hotSearchKeyword = function () {
        return JNetwork_js_1.default.POST(JUrlList_1.otherUrl.jbzHotSearchKeyword);
    };
    /**
     * 广告接口
     * @param location 广告使用地点
     * @param cityId 当前城市
     * @returns {Promise}
     */
    JNetworkOther.otherBanners = function (location, cityId) {
        return new _promise2.default(function (resolve, reject) {
            return JNetwork_js_1.default.POST(JUrlList_1.otherUrl.jbzBanners, {
                location: location, cityId: cityId
            }).then(function (data) {
                resolve(JDataUnify_1.default('otherUrl.jbzBanners', data));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**+
     * 广告接口
     * @param position 广告使用地点
     * @param cityId 当前城市
     * @returns {Promise}
     */
    JNetworkOther.banners = function (position, cityId) {
        return JNetworkOther.otherBanners(position, cityId);
    };
    return JNetworkOther;
}();
exports.default = JNetworkOther;
//# sourceMappingURL=JNetworkOther.js.map
