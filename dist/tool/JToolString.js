'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringTool = function () {
    function StringTool() {
        _classCallCheck(this, StringTool);
    }

    _createClass(StringTool, null, [{
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
                return Number.parseInt(c);
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

        // 删除所有标签  空格

    }, {
        key: 'remainStr',
        value: function remainStr(item) {
            if (item) {
                // 过滤标签
                var temp1 = item.replace(/<[^>]+>/g, '');
                // 过滤&nbsp空格符
                var temp2 = temp1.replace(/&nbsp;/g, '');
                // 过滤空格
                var realStr = temp2.replace(/(^\s*)/g, '');
                return realStr;
            }
        }
    }]);

    return StringTool;
}();

exports.default = StringTool;