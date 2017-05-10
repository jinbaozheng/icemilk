/**
 * Created by cuppi on 2016/11/25.
 */

import NumberTool from './JToolNumber.js';

class DateTool {

  static timeIntervalFromDate(dateString){
    var stringTime = dateString;
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    return timestamp2;
  }

  static dateFromTimeInterval(timeInterval, format){
    return DateTool.formatDateToString(new Date(timeInterval*1000), format);
  }

    static chineseTimeFromTime(time, unit){
        if (unit === 'm'){
            let originSeconds = parseInt(time*60);
            let seconds = parseInt(originSeconds%60);
            let originMinutes = parseInt(originSeconds/60);
            let minutes = parseInt(originMinutes%60);
            let originHours = parseInt(originMinutes/60);
            let hours = parseInt(originHours%25);
            return hours + '小时' + minutes + '分钟';
        }
    }

    // 当前日期
    static currentDate(){
        return new Date();
    }

    // 格式化日期
    static formatDateToString(date, format) {
        let paddNum = function (num) {
            num += '';
            return num.replace(/^(\d)$/, '0$1');
        };
        // 指定格式字符
        let cfg = {
            yyyy: date.getFullYear(), // 年 : 4位
            yy: date.getFullYear().toString().substring(2), // 年 : 2位
            M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
            MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
            d: date.getDate(), // 日 : 如果1位的时候不补0
            dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
            hh: date.getHours(), // 时
            mm: paddNum(date.getMinutes()), // 分
            ss: paddNum(date.getSeconds()) // 秒
        };
        format || (format = 'yyyy-MM-dd hh:mm:ss');
        return format.replace(/([a-z])(\1)*/ig, function (m) {
            return cfg[m];
        });
    }

    // 转换 2016-05-02 或 2016/05/01等 类型
    // 到 2016年05月03日
    static formatDateToChineseDate(date, separator, nozero) {
        let _date = date.split(separator);
        let location = 0;
        let unitList = ['日', '月', '年'];
        let result = '';
        while (_date.length > 0 && location < unitList.length) {
            let num = _date.pop();
            if (nozero){
                result = +num + unitList[location] + result;
            } else {
                result = NumberTool.prefixInteger(num, 2) + unitList[location] + result;
            }
            location++;
        }
        return result;
    }

    // 转换 2016-05-02 或 2016/05/01等 类型
    static formatStringToDate(date, separator) {
        let _date = date.split(separator);
        // 月份从0 开始
        return new Date(_date[0], parseInt(_date[1]) - 1, _date[2]);
    }

    // 转换 2016-05-02 或 2016/05/01等 类型
    static formatDateStringToDateString(date, separator, toSeparator) {
       return date.split(separator).join(toSeparator);
    }

    static partFromDate(date, separator, part) {
        if (date === '' || date === '暂无' || date === undefined){
            return '';
        } else {
            let _date = date.split(separator);
            _date.reverse();
            let _result = [];
            let i = 0;
            while (part !== 0) {
                if (part & 1) {
                    if (i >= _date.length) {
                        break;
                    }
                    _result.push(_date[i]);
                }
                part = part >> 1;
                i++;
            }
            _result.reverse();
            return _result.join(separator);
        }
    }

    static weekDay(date) {
        return date.getDay();
    }

    static weekDayFromDate(date) {
        return DateTool.weekDay(DateTool.formatStringToDate(date, '-'));
    }
    // 格式化为   2015-01-02
    static getDateByAddDay(date, addDay) {
        let dd = new Date();
        dd.setDate(dd.getDate() + addDay);
        let y = dd.getFullYear();
        let m;
        let d;
        if (dd.getMonth() > 8) {
            m = dd.getMonth() + 1;
        } else {
            m = '0' + (dd.getMonth() + 1);
        }
        if (dd.getDate() > 9) {
            d = dd.getDate();
        } else {
            d = '0' + dd.getDate();
        }
        return y + '-' + m + '-' + d;
    }

    static getAddDayFromDateToDate(fromDate, toDate, separator) {
        try {
            let addDay = DateTool.formatStringToDate(toDate, separator) - DateTool.formatStringToDate(fromDate, separator);
            return addDay / 1000 / 60 / 60 / 24;
        } catch (e) {
            throw e;
        }
    }

}

export default DateTool;
