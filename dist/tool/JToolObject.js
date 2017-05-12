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
  }]);
  return ObjectTool;
}();

exports.default = ObjectTool;