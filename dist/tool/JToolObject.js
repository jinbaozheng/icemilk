"use strict";
/**
 * Created by cuppi on 2017/5/10.
 */

var _deleteProperty = require("babel-runtime/core-js/reflect/delete-property");

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 对象工具类
 * @memberOf module:tool
 */

var ObjectTool = function () {
    function ObjectTool() {
        (0, _classCallCheck3.default)(this, ObjectTool);
    }

    (0, _createClass3.default)(ObjectTool, null, [{
        key: "deleteProperty",

        /**
         * 删除对象某个属性
         * @param {object} target 对象
         * @param {string} propertyKey 属性
         * @returns {boolean} 是否删除成功
         */
        value: function deleteProperty(target, propertyKey) {
            if (target) {
                return (0, _deleteProperty2.default)(target, propertyKey);
            }
            return true;
        }
        /**
         * 安全的获取链式属性 eg: a.b.c.d
         * @param target 目标对象
         * @param pChain 对象链式属性
         * @returns {*}
         */

    }, {
        key: "safeGet",
        value: function safeGet(target) {
            for (var _len = arguments.length, pChain = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                pChain[_key - 1] = arguments[_key];
            }

            if (!target || !pChain || pChain.length <= 0) {
                return undefined;
            }
            var property = target;
            var chainIndex = 0;
            do {
                property = property[pChain[chainIndex++]];
            } while (property && chainIndex < pChain.length);
            return chainIndex === pChain.length ? property : undefined;
        }
    }]);
    return ObjectTool;
}();

exports.default = ObjectTool;
//# sourceMappingURL=JToolObject.js.map
