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
    key: 'isEmail',
    value: function isEmail(email) {
      return (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)
      );
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(string) {
      return !(string && string !== '');
    }
  }, {
    key: 'isVerifyCode',
    value: function isVerifyCode(verifycode) {
      return (/^[0-9]{6}$/.test(verifycode)
      );
    }
  }, {
    key: 'isPassword',
    value: function isPassword(password, minLength, maxLength) {
      if (minLength !== undefined && maxLength !== undefined) {
        return new RegExp("^[a-zA-Z0-9]{" + minLength + "," + maxLength + "}$").test(password);
      }
      return (/^[a-zA-Z0-9]{6,14}$/.test(password)
      );
    }
  }, {
    key: 'numberRemoveLeftZero',
    value: function numberRemoveLeftZero(c) {
      if (/^[0-9]*$/.test(c)) {
        return (0, _parseInt2.default)(c) + '';
      }
      return c;
    }
  }, {
    key: 'numberFromASC',
    value: function numberFromASC(ascChar) {
      var asc = ascChar.charCodeAt(0);
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
    key: 'numberFromString',
    value: function numberFromString(string, force, offset) {
      if (/^[0-9]*$/.test(string)) {
        return (0, _parseInt2.default)(string);
      }
      var sum = offset ? offset : 0;
      if (force) {
        for (var i = string.length - 1, radix = 1; i >= 0; i--, radix = radix * 26) {
          sum += StringTool.numberFromASC(string[i]) * radix;
        }
      }
      return sum;
    }
  }, {
    key: 'clearSpace',
    value: function clearSpace(string) {
      var unSpaceString = string.replace(/\s+/g, '');
      return unSpaceString;
    }
  }, {
    key: 'clearComma',
    value: function clearComma(string) {
      var unCommaString = string.replace(/\u002c+/g, '').replace(/，+/g, '');
      return unCommaString;
    }
  }, {
    key: 'clearVertical',
    value: function clearVertical(string) {
      var unVerticalString = string.replace(/\|+/g, '');
      return unVerticalString;
    }
  }, {
    key: 'clearClutter',
    value: function clearClutter(string) {
      var clearString = StringTool.clearSpace(string);
      clearString = StringTool.clearComma(clearString);
      clearString = StringTool.clearVertical(clearString);
      return clearString;
    }
  }]);
  return StringTool;
}();

exports.default = StringTool;