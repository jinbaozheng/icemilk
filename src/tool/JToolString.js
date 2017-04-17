'use strict';
class StringTool {
    static isMobile(mobile) {
        return (/^1[34578]\d{9}$/.test(mobile));
    }

    static isPhoneNumber(phone) {
        return /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(phone);
    }

    static isEmpty(string) {
        return !(string && string != '');
    }

    static isVerifyCode(verifycode) {
        return (/^[0-9]{6}$/.test(verifycode));
    }

    static isPassword(password) {
        return (/^[a-zA-Z0-9]{6,14}$/.test(password));
    }

    static numberIfAZ(c) {
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
    static remainStr(item) {
        if (item) {
            // 过滤标签
            let temp1 = item.replace(/<[^>]+>/g, '');
            // 过滤&nbsp空格符
            let temp2 = temp1.replace(/&nbsp;/g, '');
            // 过滤空格
            let realStr = temp2.replace(/(^\s*)/g, '');
            return realStr;
        }
    }
}

module.exports = StringTool;
