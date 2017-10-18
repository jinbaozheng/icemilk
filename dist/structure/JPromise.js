"use strict";

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _promise2 = require("babel-runtime/core-js/promise");

var _promise3 = _interopRequireDefault(_promise2);

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

var JPromise = function (_Promise) {
    (0, _inherits3.default)(JPromise, _Promise);

    function JPromise() {
        (0, _classCallCheck3.default)(this, JPromise);
        return (0, _possibleConstructorReturn3.default)(this, (JPromise.__proto__ || (0, _getPrototypeOf2.default)(JPromise)).apply(this, arguments));
    }

    (0, _createClass3.default)(JPromise, null, [{
        key: "create",
        value: function create(para) {
            var promise = null;
            if (typeof para == "function") {
                promise = new _promise3.default(para);
            } else {
                promise = para;
            }
            var hasCanceled_ = false;
            var wrappedPromise = new _promise3.default(function (resolve, reject) {
                promise.then(function (val) {
                    return hasCanceled_ ? function () {} : resolve(val);
                }, function () {
                    // 不写会有警告
                });
                promise.catch(function (error) {
                    return hasCanceled_ ? function () {} : reject(error);
                });
            });
            var _promise = (0, _assign2.default)({}, wrappedPromise, { terminate: function terminate() {
                    hasCanceled_ = true;
                }, then: function then(resolve, reject) {
                    return wrappedPromise.then(resolve, reject);
                }, otherParas: [], otherHeaders: [], useParas: function useParas() {
                    for (var _len = arguments.length, paras = Array(_len), _key = 0; _key < _len; _key++) {
                        paras[_key] = arguments[_key];
                    }

                    _promise.otherParas = paras;
                    return _promise;
                }, useHeaders: function useHeaders() {
                    for (var _len2 = arguments.length, headers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        headers[_key2] = arguments[_key2];
                    }

                    _promise.otherHeaders = headers;
                    return _promise;
                } });
            return _promise;
        }
    }]);
    return JPromise;
}(_promise3.default);

exports.default = JPromise;
//# sourceMappingURL=JPromise.js.map
