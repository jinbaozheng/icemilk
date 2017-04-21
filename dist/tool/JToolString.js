'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringTool = function () {
    function StringTool() {
        (0, _classCallCheck3.default)(this, StringTool);
    }

    (0, _createClass3.default)(StringTool, null, [{
        key: 'isMobile',
        value: function isMobile(mobile) {
            return (/^1[34578]\d{9}$/.test(mobile)
            );
        }
    }, {
        key: 'isPhoneNumber',
        value: function isPhoneNumber(phone) {
            return (/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(phone)
            );
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(string) {
            return !(string && string != '');
        }
    }, {
        key: 'isVerifyCode',
        value: function isVerifyCode(verifycode) {
            return (/^[0-9]{6}$/.test(verifycode)
            );
        }
    }, {
        key: 'isPassword',
        value: function isPassword(password) {
            return (/^[a-zA-Z0-9]{6,14}$/.test(password)
            );
        }
    }, {
        key: 'numberIfAZ',
        value: function numberIfAZ(c) {
            if (/^[0-9]*$/.test(c)) {
                return (0, _parseInt2.default)(c);
            }
            var asc = c.charCodeAt(0);
            if (asc >= 65 && asc <= 90) {
                asc -= 65;
            } else if (asc >= 97 && asc <= 122) {
                asc -= 97;
            } else if (asc >= 48 && asc <= 57) {
                asc -= 48;
            } else {
                asc = 0;
            }
            return asc;
        }
    }, {
        key: 'remainStr',
        value: function remainStr(item) {
            if (item) {
                var temp1 = item.replace(/<[^>]+>/g, '');

                var temp2 = temp1.replace(/&nbsp;/g, '');

                var realStr = temp2.replace(/(^\s*)/g, '');
                return realStr;
            }
        }
    }]);
    return StringTool;
}();

exports.default = StringTool;