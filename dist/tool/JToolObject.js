"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deleteProperty = require("babel-runtime/core-js/reflect/delete-property");

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectTool = function () {
  function ObjectTool() {
    (0, _classCallCheck3.default)(this, ObjectTool);
  }

  (0, _createClass3.default)(ObjectTool, null, [{
    key: "deleteProperty",
    value: function deleteProperty(target, propertyKey) {
      if (target) {
        return (0, _deleteProperty2.default)(target, propertyKey);
      }
      return true;
    }
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