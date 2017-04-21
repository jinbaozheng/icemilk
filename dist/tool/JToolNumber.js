'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumberTool = function () {
    function NumberTool() {
        (0, _classCallCheck3.default)(this, NumberTool);
    }

    (0, _createClass3.default)(NumberTool, null, [{
        key: 'prefixInteger',
        value: function prefixInteger(number, length) {
            return (Array(length).join(0) + number).slice(-length);
        }
    }, {
        key: 'fixNumberTo',
        value: function fixNumberTo(number, fixed) {
            return Number(number).toFixed(fixed);
        }
    }]);
    return NumberTool;
}();

exports.default = NumberTool;