'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _leftPad = require('left-pad');

var _leftPad2 = _interopRequireDefault(_leftPad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumberTool = function () {
  function NumberTool() {
    (0, _classCallCheck3.default)(this, NumberTool);
  }

  (0, _createClass3.default)(NumberTool, null, [{
    key: 'zeroPad',
    value: function zeroPad(number, length) {
      return (0, _leftPad2.default)(number, length);
    }
  }, {
    key: 'fixDigits',
    value: function fixDigits(number, digits) {
      return Number(number).toFixed(digits);
    }
  }, {
    key: 'positiveText',
    value: function positiveText(number, text) {
      if (number <= 0) {
        return text ? text : '';
      } else {
        return number + '';
      }
    }
  }]);
  return NumberTool;
}();

exports.default = NumberTool;