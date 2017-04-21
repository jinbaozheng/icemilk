'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UrlTool = function () {
  function UrlTool() {
    (0, _classCallCheck3.default)(this, UrlTool);
  }

  (0, _createClass3.default)(UrlTool, null, [{
    key: 'urlFromPortion',
    value: function urlFromPortion(baseUrl, subUrl, parameters) {
      if (!parameters) {
        parameters = {};
      }
      var paras = [];
      for (var key in parameters) {
        if (!parameters.hasOwnProperty(key)) {
          continue;
        }
        if (parameters[key] !== undefined) {
          paras.push(key + '=' + parameters[key]);
        }
      }
      var iUrl = baseUrl + subUrl;
      if (paras.length > 0) {
        iUrl = iUrl + '?' + paras.join('&');
      }
      return iUrl;
    }
  }]);
  return UrlTool;
}();

exports.default = UrlTool;