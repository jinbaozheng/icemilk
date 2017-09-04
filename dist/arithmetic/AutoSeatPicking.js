"use strict";
/**
 * Created by cuppi on                                              2016/12/21.
 */

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
// 项目甲方公司人员并存在抄袭想法观看这段代码会在↑时间开始的一年里发生不好的事情的
// 我说话一向蛮准的
// 对  这就是赤果果的诅咒 -.-
// 此代码开源的 外人随便看 并希望大家对开源献出自己的一份力量
// 此代码有很多需优化的细节... 遍历顺序，时间复杂度，可定制型什么的... balabala... 时间来不及了...
// import _ from 'lodash';
var instance = null;
var AutoSeatPicking = function () {
    function AutoSeatPicking() {
        if (!instance) {
            this.needSeatCount = 0;
            this.rowCount = 0;
            this.colCount = 0;
            this.minRow = Number.POSITIVE_INFINITY;
            this.minCol = Number.POSITIVE_INFINITY;
            this.seatMap = [];
            this.seatModelMap = [];
            instance = this;
            this.resultCallback = null;
        }
        return instance;
    }
    AutoSeatPicking.defaultManager = function () {
        return new AutoSeatPicking();
    };
    /**
     * 创建快捷座位简图
     * @param smartSeats 目标座位图
     */
    AutoSeatPicking.prototype.createSeatMap = function (smartSeats) {
        var maxRow = 0;
        var maxCol = 0;
        var minRow = Number.POSITIVE_INFINITY;
        var minCol = Number.POSITIVE_INFINITY;
        for (var _i = 0, smartSeats_1 = smartSeats; _i < smartSeats_1.length; _i++) {
            var seat = smartSeats_1[_i];
            maxRow = Math.max(seat.row, maxRow);
            maxCol = Math.max(seat.col, maxCol);
            minRow = Math.min(seat.row, minRow);
            minCol = Math.min(seat.col, minCol);
        }
        for (var i = 0; i <= maxRow; i++) {
            this.seatMap[i] = [];
            this.seatModelMap[i] = [];
            for (var j = 0; j <= maxCol; j++) {
                this.seatMap[i][j] = '_';
                this.seatModelMap[i][j] = {};
            }
        }
        for (var _a = 0, smartSeats_2 = smartSeats; _a < smartSeats_2.length; _a++) {
            var seat = smartSeats_2[_a];
            this.seatModelMap[seat.row][seat.col] = seat;
            if (seat.status === 0 && (seat.loveIndex === 0 || isNaN(seat.loveIndex))) {
                this.seatMap[seat.row][seat.col] = '0';
            } else {
                this.seatMap[seat.row][seat.col] = '1';
            }
        }
        this.rowCount = maxRow + 1;
        this.colCount = maxCol + 1;
        this.minRow = minRow;
        this.minCol = minCol;
    };
    /**
     *  一层一层寻找最佳位置
     * @param smartSeats 目标座位图
     * @param count 期望最佳位置的数量
     * @param resultCallback 结果回调
     */
    AutoSeatPicking.prototype.autoSelected = function (smartSeats, count, resultCallback) {
        this.createSeatMap(smartSeats);
        this.needSeatCount = count;
        this.resultCallback = resultCallback;
        var rowLength = this.rowCount - this.minRow;
        var colLength = this.colCount - this.minCol;
        for (var i = 0; i <= Math.max(parseInt(this.rowCount / 2), parseInt(this.colCount / 2)); i++) {
            if (this.targetFromRowColTier(parseInt(rowLength / 2) + this.minRow, parseInt(colLength / 2) + this.minCol, i)) {
                return;
            }
        }
        resultCallback(new _map2.default());
    };
    /**
     * 判断指定层是否存在最佳位置
     * @param row 指定点行
     * @param col 指定点列
     * @param tier 层数
     * @returns {boolean} 是否存在最佳位置
     */
    AutoSeatPicking.prototype.targetFromRowColTier = function (row, col, tier) {
        for (var i = 0; i <= tier; i++) {
            if (this.targetFromRowColInnerOffsetTier(row, col, i, tier)) {
                return true;
            }
        }
        return false;
    };
    /**
     * 判断指定点的期望结果
     * @param row 指定点行
     * @param col 指定点列
     * @param innerOffset 行内偏移
     * @param tier 层索引
     * @returns {boolean} 是否存在
     */
    AutoSeatPicking.prototype.targetFromRowColInnerOffsetTier = function (row, col, innerOffset, tier) {
        var rowSignTimes = (innerOffset !== 0) + 0;
        for (var rowSign = -1; rowSign <= rowSignTimes; rowSign++) {
            if (!rowSign) {
                continue;
            }
            var colSignTimes = (tier !== 0) + 0;
            for (var colSign = -1; colSign <= colSignTimes; colSign++) {
                if (!colSign) {
                    continue;
                }
                var changeTimes = (innerOffset !== tier) + 0;
                for (var change = 0; change <= changeTimes; change++) {
                    var rowOffset = void 0,
                        colOffset = void 0;
                    if (change) {
                        rowOffset = tier * colSign;
                        colOffset = innerOffset * rowSign;
                    } else {
                        rowOffset = innerOffset * rowSign;
                        colOffset = tier * colSign;
                    }
                    var resultRow = row + rowOffset;
                    var resultCol = col + colOffset;
                    if (resultRow < 0 || resultCol < 0 || resultRow >= this.rowCount || resultCol >= this.colCount) {
                        // console.log('内存溢出');
                        return false;
                    }
                    if (this.seatMap[resultRow][resultCol] === '0') {
                        var result = this.checkVisibleSeatAtRowColMiddleOffsetCount(resultRow, resultCol, this.needSeatCount);
                        if (result.length === this.needSeatCount) {
                            var resultMap = new _map2.default();
                            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                                var integer = result_1[_i];
                                var row_1 = parseInt(integer / this.colCount);
                                var col_1 = integer % this.colCount;
                                var key = row_1 + ':' + col_1;
                                var value = this.seatModelMap[row_1][col_1];
                                resultMap.set(key, value);
                                // [self selectedSeatRow:integer/this.colCount col:integer%this.rowCount];
                            }
                            if (this.resultCallback) {
                                this.resultCallback(resultMap);
                            }
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    /**
     * 判断指定点的所有行内偏移的结果
     * @param row 指定点行
     * @param col 指定点列
     * @param count 当前查找的数量(后期需要优化)
     * @returns {*} 是否存在期望点
     */
    AutoSeatPicking.prototype.checkVisibleSeatAtRowColMiddleOffsetCount = function (row, col, count) {
        if (col >= this.colCount || col < 0) {
            return [];
        }
        // 当期望是一个点的时候
        if (count === 1) {
            if (this.seatMap[row][col] === '0') {
                return [this.integerAt(row, col)];
            }
            return [];
        }
        // i为遍历偏移量 （目前是从左到右)
        for (var i = 0; i <= parseInt(count / 2); i++) {
            var result = [];
            for (var j = 0; j < this.needSeatCount; j++) {
                result = result.concat(this.checkVisibleSeatAtRowColMiddleOffsetCount(row, col + i - parseInt(this.needSeatCount / 2) + j, 1));
            }
            if (result.length === this.needSeatCount) {
                return result;
            }
            if (i <= parseInt((count - 1) / 2)) {
                result = [];
                for (var j = 0; j < this.needSeatCount; j++) {
                    result = result.concat(this.checkVisibleSeatAtRowColMiddleOffsetCount(row, col - i - parseInt(this.needSeatCount / 2) + j, 1));
                }
                if (result.length === this.needSeatCount) {
                    return result;
                }
            }
        }
        return [];
    };
    /**
     * 二维转一维
     * @param row 行号
     * @param col 列好
     * @returns {*} 一维对应的映射
     */
    AutoSeatPicking.prototype.integerAt = function (row, col) {
        return row * this.colCount + col;
    };
    return AutoSeatPicking;
}();
exports.default = AutoSeatPicking;
//# sourceMappingURL=AutoSeatPicking.js.map
