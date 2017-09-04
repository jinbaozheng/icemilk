"use strict";
/**
 * Created by cuppi on 2017/5/10.
 */

var _deleteProperty = require("babel-runtime/core-js/reflect/delete-property");

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 对象工具类
 * @memberOf module:tool
 */
var ObjectTool = function () {
    function ObjectTool() {}
    /**
     * 删除对象某个属性
     * @param {object} target 对象
     * @param {string} propertyKey 属性
     * @returns {boolean} 是否删除成功
     */
    ObjectTool.deleteProperty = function (target, propertyKey) {
        if (target) {
            return (0, _deleteProperty2.default)(target, propertyKey);
        }
        return true;
    };
    /**
     * 安全的获取链式属性 eg: a.b.c.d
     * @param target 目标对象
     * @param pChain 对象链式属性
     * @returns {*}
     */
    ObjectTool.safeGet = function (target) {
        var pChain = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            pChain[_i - 1] = arguments[_i];
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
    };
    return ObjectTool;
}();
exports.default = ObjectTool;
//# sourceMappingURL=JToolObject.js.map
