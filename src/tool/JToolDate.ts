/**
 * Created by cuppi on 2016/11/25.
 */

import moment from 'moment';
type DateString = string;
type SmartDate = Date|DateString|number
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
};
const _ti2d = (ti) => {
    return moment(ti * 1000).toDate();
};
const _d2ti = (d) => {
    return moment(d).unix();
};
const _ti2ds = (ti, f) => {
    f = _date_format_shim(f)
    return moment(ti * 1000).utcOffset(STANDARD_TIMEZONE).format(f);
};
const _ds2ti = (ds, z) => {
    return DateTool.timeIntervalFromDate(moment(ds).utcOffset(z, true).toDate());
};
const _d2ds = (d, f) => {
    f = _date_format_shim(f)
    return moment(d).utcOffset(STANDARD_TIMEZONE).format(f)
};
const _ds2d = (ds, z) => {
    return moment(ds).utcOffset(z, true).toDate();
};

/**
 * 时间工具类
 */
class DateTool {

    // 距离标准时区(STANDARD_TIMEZONE)的位移 --单位为分钟
    static offsetFromStandardTimezone(){
        return new Date().getTimezoneOffset()
    }

    /**
     * 当前日期是什么类型
     * @param _ 多态日期
     * @private
     * @returns {string}
     */
    static whatType(_: SmartDate): string{
        if (_ instanceof Date) {
            return 'Date';
        }
        return typeof (_);
    }

    /**
     * 这个日期要做什么
     * @param  _ 多态日期
     * @param dateDoing 日期格式做的事情
     * @param strDoing 字符串格式做的事情
     * @param numDoing 数字格式做的事情
     * @param otherDoing  其他格式做的事情
     * @private
     */
    static whatTypeDoing(_: SmartDate, dateDoing: Function, strDoing: Function, numDoing: Function, otherDoing?: Function): void {
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
     * @param _ 多态日期
     * @returns 日期
     */
    static wantDate(_: SmartDate): Date {
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
     * @param _ 多态日期
     * @returns 时间戳
     */
    static wantTimeInterval(_: SmartDate): number {
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
     * @param date 日期
     * @returns 时间戳
     */
    static timeIntervalFromDate(date: Date): number {
        return _d2ti(date);
    }

    /**
     * 时间戳转换日期
     * @param timeInterval 时间戳
     * @returns 日期
     */
    static dateFromTimeInterval(timeInterval: number): Date {
        return _ti2d(timeInterval)
    }

    /**
     * 日期字符串转换时间戳
     * @param dateString 日期
     * @param timezone 时区
     * @returns 时间戳
     */
    static timeIntervalFromDateString(dateString: string, timezone: number = STANDARD_TIMEZONE): number {
        return _ds2ti(dateString, timezone)
    }

    /**
     * 时间戳转换日期字符串
     * @param timeInterval 时间戳
     * @param format 日期格式 如: YYYY-MM-DD HH:mm:ss
     * @returns 日期字符串
     */
    static dateStringFromTimeInterval(timeInterval: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        return _ti2ds(timeInterval, format)
    }

    /**
     * 日期字符串转换日期
     * #### 待完善
     * @param dateString 日期字符串
     * @param timezone 时区
     * @returns 日期
     */
    static dateFromDateString(dateString: string, timezone: number = STANDARD_TIMEZONE): Date {
        return _ds2d(dateString, timezone)
    }

    /**
     * 日期转换日期字符串
     * @param date Date对象
     * @param format 格式化信息
     * @returns 日期字符串
     */
    static dateStringFromDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        return _d2ds(date, format);
    }

    /**
     * 获取当前日期对象
     * @returns 当前日期对象
     */
    static currentDate(): Date{
        return moment().utcOffset(STANDARD_TIMEZONE).toDate();
    }

    /**
     * 获取当前日期字符串
     * @param format 字符串格式
     * @returns 当前日期字符串
     */
    static currentDateString(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        return _d2ds(DateTool.currentDate(), format);
    }

    /**
     * 获取当前时间戳
     * @returns 当前时间戳
     */
    static currentTimeInterval(): number {
        return moment().unix();
    }

    // TODO 需要优化月份的算法
    /**
     * 获取日期的距离
     * #### 待完善
     * @param startDate 起始多态日期
     * @param endDate 结束多态日期
     * @param justSeconds 只需要秒的总数
     * @returns [秒，分，小时，天，月, 年]
     */
    static distanceBetweenDate(startDate: SmartDate, endDate: SmartDate, justSeconds: boolean): number[] {
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
     * 变换日期字符串格式
     * #### 待开发
     * @since ~1.1.*
     * @param dateString 日期字符串
     * @param fromFormat 输入格式
     * @param toFormat 输出格式
     * @param timezone 时区
     * @returns 字符串
     */
    static transformDateStringByFormat(dateString: string, fromFormat: string, toFormat: string = 'YYYY-MM-DD HH:mm:ss', timezone: number = STANDARD_TIMEZONE): string {
        return _d2ds(_ds2d(dateString, timezone), toFormat);
    }

    /**
     * 获取指定日期为星期几
     * @param date 多态日期
     * @returns 0~6 => 星期一~星期日
     */
    static weekDay(date: SmartDate): number {
        return (moment(DateTool.wantDate(date)).utcOffset(STANDARD_TIMEZONE).day() + 6) % 7;
    }

    /**
     * 获取某日期某天后的日期
     * @param beganDate 多态目标日期
     * @param days 天数
     * @returns 目的日期
     */
    static dateAfterDaysLater(beganDate: SmartDate, days: number): Date {
        return moment(DateTool.wantDate(beganDate)).add(days, 'days').toDate();
    }

    /**
     * 获取日期某天后的日期字符串
     * @param beganDate 多态目标日期
     * @param days 天数
     * @param format 格式化信息
     * @returns 目的日期字符串
     */
    static dateStringAfterDaysLater(beganDate: SmartDate, days: number, format: string = 'YYYY-MM-DD'): string {
        return _d2ds(DateTool.dateAfterDaysLater(beganDate, days), format);
    }
}

export default DateTool;
