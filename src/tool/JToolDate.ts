/**
 * Created by cuppi on 2016/11/25.
 */

import moment from 'moment';
// 北京时区(东八区)早于协调世界时
// const STANDARD_TIMEZONE = -480;
const STANDARD_TIMEZONE = 480;

const _date_format_shim = (f) => {
    if (f){
        f = f.replace('yyyy', 'YYYY');
        f = f.replace('dd', 'DD');
        f = f.replace('hh', 'HH');
    }
    return f;
}
const _ti2d = (ti) => {
    return moment(ti * 1000).toDate();
}
const _d2ti = (d) => {
    return moment(d).unix();
}
const _ti2ds = (ti, f) => {
    f = _date_format_shim(f)
    return moment(ti * 1000).utcOffset(STANDARD_TIMEZONE).format(f);
}
const _ds2ti = (ds, z) => {
    return DateTool.timeIntervalFromDate(moment(ds).utcOffset(z, true).toDate());
}
const _d2ds = (d, f) => {
    f = _date_format_shim(f)
    return moment(d).utcOffset(STANDARD_TIMEZONE).format(f)
}
const _ds2d = (ds, z) => {
    return moment(ds).utcOffset(z, true).toDate();
}

/**
 * 时间工具类
 * @memberOf module:tool
 */
class DateTool {

    // 距离标准时区(STANDARD_TIMEZONE)的位移 --单位为分钟
    static offsetFromStandardTimezone(){
        return new Date().getTimezoneOffset()
    }

    /**
     * 当前日期是什么类型
     * @param {Date | string | number} _ 日期
     * @private
     * @returns {string}
     */
    static whatType(_: Date|string|number): string{
        if (_ instanceof Date) {
            return 'Date';
        }
        return typeof (_);
    }

    /**
     * 这个日期要做什么
     * @param {Date | string | number} _ 日期
     * @param {Function} dateDoing 日期格式做的事情
     * @param {Function} strDoing 字符串格式做的事情
     * @param {Function} numDoing 数字格式做的事情
     * @param {Function} otherDoing  其他格式做的事情
     * @private
     */
    static whatTypeDoing(_: Date|string|number, dateDoing: Function, strDoing: Function, numDoing: Function, otherDoing?: Function): void {
        if (typeof (_) === 'string') {
            strDoing();
        }
        if (typeof (_) === 'number') {
            numDoing();
        }
        if (_ instanceof Date) {
            dateDoing();
        }
        if (otherDoing) {
            otherDoing();
        }
    }

    /**
     * 想要日期格式的日期
     * @param {Date | string | number} _ 日期
     * @returns {Date}
     */
    static wantDate(_: Date|string|number): Date {
        let result = null;
        DateTool.whatTypeDoing(_, () => {
            result = _;
        }, () => {
            result = DateTool.dateFromDateString(_ as string);
        }, () => {
            result = DateTool.dateFromTimeInterval(_ as number);
        });
        return result;
    }

    /**
     * 想要时间戳格式的日期
     * @param {Date | string | number} _ 日期
     * @returns {number}
     */
    static wantTimeInterval(_: Date|string|number): number {
        let result = null;
        DateTool.whatTypeDoing(_, () => {
            result = DateTool.timeIntervalFromDate(_ as Date);
        }, () => {
            result = DateTool.timeIntervalFromDateString(_ as string);
        }, () => {
            result = _;
        });
        return result;
    }

    /**
     * 日期转换时间戳
     * @static
     * @param {Date} date 日期
     * @returns {number} 时间戳
     */
    static timeIntervalFromDate(date: Date): number {
        return _d2ti(date);
    }


    /**
     * 时间戳转换日期
     * @param {number} timeInterval 时间戳
     * @returns {Date} 日期
     */
    static dateFromTimeInterval(timeInterval: number): Date {
        return _ti2d(timeInterval)
    }

    /**
     * 日期字符串转换时间戳
     * @param {string} dateString 日期
     * @param {string} timezone 时区
     * @returns {number} 时间戳
     */
    static timeIntervalFromDateString(dateString: string, timezone: number = STANDARD_TIMEZONE): number {
        return _ds2ti(dateString, timezone)
    }

    /**
     * 时间戳转换日期字符串
     * @param {number} timeInterval 时间戳
     * @param {string} format 日期格式 如: YYYY-MM-DD HH:mm:ss
     * @returns {string} 日期字符串
     */
    static dateStringFromTimeInterval(timeInterval: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        return _ti2ds(timeInterval, format)
    }

    /**
     * 日期字符串转换日期 （待开发）
     * @param {string} dateString 日期字符串
     * @param {string} timezone 时区
     * @returns {Date} 日期
     */
    static dateFromDateString(dateString: string, timezone: number = STANDARD_TIMEZONE): Date {
        return _ds2d(dateString, timezone)
    }

    /**
     * 日期转换日期字符串
     * @param {Date} date Date对象
     * @param {string} format 格式化信息
     * @returns {string} 日期字符串
     */
    static dateStringFromDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        return _d2ds(date, format);
    }

    /**
     * 获取当前日期对象
     * @returns {Date} 当前日期对象
     */
    static currentDate(): Date{
        return moment().utcOffset(STANDARD_TIMEZONE).toDate();
    }

    /**
     * 获取当前日期字符串
     * @param {string} format 字符串格式
     * @returns {string} 当前日期字符串
     */
    static currentDateString(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        return _d2ds(DateTool.currentDate(), format);
    }

    /**
     * 获取当前时间戳
     * @returns {number} 当前时间戳
     */
    static currentTimeInterval(): number {
        return moment().unix();
    }

    // TODO 需要优化月份的算法
    /**
     * 获取(多态)日期的距离
     * @param {Date | string | number} startDate 起始日期
     * @param {Date | string | number} endDate 结束日期
     * @param {boolean} justSeconds 只需要秒的总数
     * @returns {Array} [秒，分，小时，天，月, 年]
     */
    static distanceBetweenDate(startDate: Date|string|number, endDate: Date|string|number, justSeconds: boolean): number[] {
        let startTimeInterval = this.wantTimeInterval(startDate);
        let endTimeInterval = this.wantTimeInterval(endDate);
        let distance = endTimeInterval - startTimeInterval;
        if (justSeconds) {
            return [distance, 0, 0, 0, 0];
        }
        let sec = distance % 60;
        distance = Math.floor(distance / 60);
        let min = distance % 60;
        distance = Math.floor(distance / 60);
        let hour = distance % 24;
        distance = Math.floor(distance / 24);
        let day = distance % 1000;
        let mou = Math.floor(distance / 1000);
        return [sec, min, hour, day, mou];
    }

    // TODO 待开发
    /**
     * 变换日期字符串格式 （待开发）
     * @since ~1.1.*
     * @param {string} dateString 日期字符串
     * @param {string} fromFormat 输入格式
     * @param {string} toFormat 输出格式
     * @param {string} timezone 时区
     * @returns {string} 字符串
     */
    static transformDateStringByFormat(dateString: string, fromFormat: string, toFormat: string = 'YYYY-MM-DD HH:mm:ss', timezone: number = STANDARD_TIMEZONE): string {
        return _d2ds(_ds2d(dateString, timezone), toFormat);
    }

    /**
     * 获取指定(多态)日期为星期几
     * @param {Date | string | number} date 日期
     * @returns {number} 0~6  星期一~星期日
     */
    static weekDay(date: Date|string|number): number {
        return (moment(DateTool.wantDate(date)).utcOffset(STANDARD_TIMEZONE).day() + 6) % 7;
    }

    /**
     * 获取(多态)日期某天后的日期()
     * @param {Date | string | number} beganDate
     * @param {number} days
     * @returns {Date} 目的日期
     */
    static dateAfterDaysLater(beganDate: Date|string|number, days: number): Date {
        return moment(DateTool.wantDate(beganDate)).add(days, 'days').toDate();
    }

    /**
     * 获取(多态)日期某天后的日期字符串
     * @param {Date | string | number} beganDate 开始日期
     * @param {number} days 天数
     * @param {string} format 格式化信息
     * @returns {string} 目的日期字符串
     */
    static dateStringAfterDaysLater(beganDate: Date|string|number, days: number, format: string = 'YYYY-MM-DD'): string {
        return _d2ds(DateTool.dateAfterDaysLater(beganDate, days), format);
    }
}

export default DateTool;
