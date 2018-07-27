/**
 * Created by cuppi on 2017/3/6.
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
var JDataUnify_1 = require("../unify/JDataUnify");
var JUrlList_1 = require("../unify/JUrlList");
var JNetworkRoot_1 = require("./JNetworkRoot");
/**
 * 个人中心接口
 * @memberOf module:network
 */

var JNetworkMine = function (_JNetworkRoot_1$defau) {
    (0, _inherits3.default)(JNetworkMine, _JNetworkRoot_1$defau);

    function JNetworkMine() {
        (0, _classCallCheck3.default)(this, JNetworkMine);
        return (0, _possibleConstructorReturn3.default)(this, (JNetworkMine.__proto__ || (0, _getPrototypeOf2.default)(JNetworkMine)).apply(this, arguments));
    }

    (0, _createClass3.default)(JNetworkMine, [{
        key: "mineOrder",

        /**
         * 我的订单
         * @private
         * @returns {*}
         */
        value: function mineOrder() {
            return this.prefixPromise(JUrlList_1.mineUrl.userorders);
        }
        /**
         * 我的收藏(影院)
         * @returns {*}
         */

    }, {
        key: "mineFavoriteCinema",
        value: function mineFavoriteCinema() {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                _this2.prefixPromise(JUrlList_1.mineUrl.jbzMineCinema).then(function (data) {
                    resolve(JDataUnify_1.default('mineUrl.jbzMineCinema', data));
                }, function (error) {
                    reject(error);
                });
            });
        }
        /**
         * 我的收藏
         * @private
         * @returns {*}
         */

    }, {
        key: "mineFavorite",
        value: function mineFavorite() {
            return this.prefixPromise(JUrlList_1.mineUrl.collectedcinemalist);
        }
    }], [{
        key: "mineOrder",
        value: function mineOrder() {
            return this.instance().mineOrder();
        }
    }, {
        key: "mineFavoriteCinema",
        value: function mineFavoriteCinema() {
            return this.instance().mineFavoriteCinema();
        }
    }, {
        key: "mineFavorite",
        value: function mineFavorite() {
            return this.instance().mineFavorite();
        }
    }]);
    return JNetworkMine;
}(JNetworkRoot_1.default);

exports.default = JNetworkMine;
//# sourceMappingURL=JNetworkMine.js.map
