"use strict";
/**
 * Created by cuppi on 2016/12/5.
 */

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _parseInt = require("babel-runtime/core-js/number/parse-int");

var _parseInt2 = _interopRequireDefault(_parseInt);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || _assign2.default || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var JToolString_js_1 = require("../tool/JToolString.js");
var AutoSeatPicking_1 = require("../arithmetic/AutoSeatPicking");
var _cellSize = 30;
var _cellSpace = 8;
var instance = null;
/**
 * 座位图管理类
 * @module manager
 */
var SeatManager = function () {
    /**
     * 构造器
     * @returns {*}
     */
    function SeatManager() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    /**
     * 单例方法
     * @returns {SeatManager}
     */
    SeatManager.defaultManager = function () {
        return new SeatManager();
    };
    /**
     * 智能选座
     * @param smartSeats
     * @param count
     * @returns {Promise}
     */
    SeatManager.smartAutoSelected = function (smartSeats, count) {
        return new _promise2.default(function (reduce, reject) {
            AutoSeatPicking_1.default.defaultManager().autoSelected(smartSeats, count, function (data) {
                reduce(data);
            });
        });
    };
    /**
     * 获取座位图时需要的参数
     * @param platform 平台类型
     * @param screening 平台数据
     * @returns {Object} 平台需要的参数
     */
    SeatManager.seatParasFromScreening = function (platform, screening) {
        var paras = {};
        if (platform === 'wangpiao') {
            paras = {
                cinemaId: screening.cinemaId,
                showId: screening.showId
            };
        }
        if (platform === 'spider') {
            paras = {
                cinemaId: screening.cinemaId,
                showId: screening.showId,
                hallId: screening.hallId
            };
        }
        if (platform === 'maizuo') {
            paras = {
                showId: screening.showId
            };
        }
        if (platform === 'danche') {
            paras = {
                showId: screening.showId
            };
        }
        if (platform === 'maoyan' || platform === 'meituan' || platform === 'dazhong') {
            paras = {
                showId: screening.showId
            };
        }
        if (platform === 'baidu') {
            paras = {
                showId: screening.showId
            };
        }
        return paras;
    };
    /**
     * 对原始座位图进行智能转换
     * @param type 平台类型
     * @param seatData 座位图原始数据
     * @returns {Array} 智能座位图列表
     */
    SeatManager.prototype.smartSeatsFromSeats = function (type, seatData) {
        var seatList = this.unitySeatWithSeatData(type, seatData);
        // 获取智能座位图
        return this.smartSeatsWithSeats(type, seatList);
    };
    /**
     * 获取智能座位图元数据
     * @param type 平台类型
     * @param smartSeats 智能座位图
     * @returns {{smartSeats: Array, seatRowData: Array.<*>}} 智能座位图详细信息
     */
    SeatManager.prototype.smartSeatDataFromSmartSeats = function (type, smartSeats) {
        var seatRowData = this.rowDataFromSmartSeats(smartSeats);
        var seatContentData = this.seatContentDataFromSmartSeats(smartSeats);
        return __assign({ smartSeats: smartSeats, seatRowData: seatRowData }, seatContentData);
    };
    /**
     * 对原始座位图进行智能转换
     * @param type 平台类型
     * @param seatData 座位图原始数据
     * @returns {{smartSeats: Array, seatRowData: Array.<*>}} 智能座位图详细信息
     */
    SeatManager.prototype.smartSeatDataFromSeats = function (type, seatData) {
        // 获取智能座位图
        var smartSeats = this.smartSeatsFromSeats(type, seatData);
        return this.smartSeatDataFromSmartSeats(type, smartSeats);
    };
    /** ***********************  下面的方法为内部方法  ******************** **/
    /**
     * 统一座位格式
     * @private
     * @param type
     * @param seatData
     * @returns {Array}
     */
    SeatManager.prototype.unitySeatWithSeatData = function (type, seatData) {
        if (type === 'maoyan' || type === 'meituan' || type === 'dazhong') {
            var seatList_1 = [];
            var sections = seatData.sections;
            for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
                var section = sections_1[_i];
                for (var sectionId in section) {
                    if (section.hasOwnProperty(sectionId)) {
                        var seatMap_1 = section[sectionId].seatMap;
                        var maxRow_1 = section[sectionId].maxRow ? section[sectionId].maxRow : 0;
                        var maxColumn_1 = section[sectionId].maxColumn ? section[sectionId].maxColumn : 0;
                        for (var i = 0; i <= maxRow_1; i++) {
                            for (var j = 0; j <= maxColumn_1; j++) {
                                var seat = seatMap_1[i + ':' + j];
                                // 去掉走廊
                                if (seat && seat.status !== 'E') {
                                    seat.sectionId = sectionId;
                                    // 时间复杂度多了  但是代码整洁
                                    seatList_1.push(seat);
                                }
                            }
                        }
                    }
                }
            }
            return seatList_1;
        }
        var seatList = [];
        var seatMap = seatData.seatMap;
        var maxRow = seatData.maxRow;
        var maxColumn = seatData.maxColumn;
        // 获取基本座位图
        if (type === 'danche') {
            for (var i = 0; i <= maxRow; i++) {
                for (var j = 0; j <= maxColumn; j++) {
                    var seat = seatMap[i + ':' + j];
                    if (seat && seat.isSeat) {
                        // 时间复杂度多了  但是代码整洁
                        seatList.push(seat);
                    }
                }
            }
        } else if (type === 'baidu') {
            for (var i = 0; i <= maxRow; i++) {
                for (var j = 0; j <= maxColumn; j++) {
                    var seat = seatMap[i + ':' + j];
                    if (seat && seat.seatNo && seat.seatNo !== '') {
                        seat.rowId = i;
                        seat.columnId = j;
                        // 时间复杂度多了  但是代码整洁
                        seatList.push(seat);
                    }
                }
            }
        } else {
            for (var i = 0; i <= maxRow; i++) {
                for (var j = 0; j <= maxColumn; j++) {
                    var seat = seatMap[i + ':' + j];
                    if (seat) {
                        // 时间复杂度多了  但是代码整洁
                        seatList.push(seat);
                    }
                }
            }
        }
        return seatList;
    };
    /**
     * 获取智能座位图通用方法
     * @private
     * @param type 平台类型
     * @param seatList 基本座位图
     * @returns {Array} 智能座位图
     */
    SeatManager.prototype.smartSeatsWithSeats = function (type, seatList) {
        if (type === 'wangpiao') {
            return this.smartSeatsWithWPSeats(seatList);
        }
        if (type === 'spider') {
            return this.smartSeatsWithSPSeats(seatList);
        }
        if (type === 'maizuo') {
            return this.smartSeatsWithMZSeats(seatList);
        }
        if (type === 'danche') {
            return this.smartSeatsWithDCSeats(seatList);
        }
        if (type === 'maoyan' || type === 'meituan' || type === 'dazhong') {
            return this.smartSeatsWithMYSeats(seatList);
        }
        if (type === 'baidu') {
            return this.smartSeatsWithBDSeats(seatList);
        }
    };
    /**
     * 获取网票智能座位图
     * @private
     * @param seatList
     * @returns {Array}
     */
    SeatManager.prototype.smartSeatsWithWPSeats = function (seatList) {
        return seatList.map(function (seatModel) {
            var row = (0, _parseInt2.default)(seatModel.key.split(':').shift());
            var col = (0, _parseInt2.default)(seatModel.key.split(':').pop());
            var rowNumber = JToolString_js_1.default.numberFromString(seatModel.Name.split(':').shift(), true, 1);
            var colNumber = JToolString_js_1.default.numberFromString(seatModel.Name.split(':').pop(), true, 1);
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(function (bridgeModel) {
            var seatRowModel = bridgeModel.seatModel;
            return __assign({}, bridgeModel, {
                // N:lock  Y:unLock
                status: seatRowModel.Status === 'Y' ? 0 : 1, rowLocation: bridgeModel.row * (_cellSize + _cellSpace), colLocation: bridgeModel.col * (_cellSize + _cellSpace), loveIndex: (0, _parseInt2.default)(seatRowModel.LoveFlag) });
        });
    };
    /**
     * 获取蜘蛛智能座位图
     * @private
     * @param seatList
     * @returns {Array}
     */
    SeatManager.prototype.smartSeatsWithSPSeats = function (seatList) {
        return seatList.map(function (seatModel) {
            var row = (0, _parseInt2.default)(seatModel.rowNum);
            var col = (0, _parseInt2.default)(seatModel.columnNum);
            var rowNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.rowId, true, 1));
            var colNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.columnId, true, 1));
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(function (bridgeModel) {
            var seatRowModel = bridgeModel.seatModel;
            return __assign({}, bridgeModel, { status: seatRowModel.isLock ? 1 : 0, rowLocation: bridgeModel.row * (_cellSize + _cellSpace), colLocation: bridgeModel.col * (_cellSize + _cellSpace), loveIndex: (0, _parseInt2.default)(seatRowModel.loveIndex) });
        });
    };
    /**
     * 获取卖座智能座位图
     * @private
     * @param seatList
     * @returns {Array}
     */
    SeatManager.prototype.smartSeatsWithMZSeats = function (seatList) {
        return seatList.map(function (seatModel) {
            var row = (0, _parseInt2.default)(seatModel.rowNum);
            var col = (0, _parseInt2.default)(seatModel.columnNum);
            var rowNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.rowId, true, 1));
            var colNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.columnId, true, 1));
            // 上海百美汇影城
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(function (bridgeModel) {
            var seatRowModel = bridgeModel.seatModel;
            return __assign({}, bridgeModel, { status: seatRowModel.isLock === '1' ? 1 : 0, rowLocation: bridgeModel.row * (_cellSize + _cellSpace), colLocation: bridgeModel.col * (_cellSize + _cellSpace), loveIndex: (0, _parseInt2.default)(seatRowModel.loveIndex) });
        });
    };
    /**
     * 获取单车智能座位图
     * @private
     * @param seatList
     * @returns {Array}
     */
    SeatManager.prototype.smartSeatsWithDCSeats = function (seatList) {
        return seatList.map(function (seatModel) {
            var row = (0, _parseInt2.default)(seatModel.rowNum);
            var col = (0, _parseInt2.default)(seatModel.columnNum);
            var rowNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.rowId, true, 1));
            var colNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.columnId, true, 1));
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(function (bridgeModel) {
            var seatRowModel = bridgeModel.seatModel;
            console.log(seatRowModel.loveIndex);
            return __assign({}, bridgeModel, { status: seatRowModel.isLock ? 1 : 0, rowLocation: bridgeModel.row * (_cellSize + _cellSpace), colLocation: bridgeModel.col * (_cellSize + _cellSpace), loveIndex: (0, _parseInt2.default)(seatRowModel.loveIndex) });
        });
    };
    /**
     * 获取猫眼智能座位图
     * @private
     * @param seatList
     * @returns {Array}
     */
    SeatManager.prototype.smartSeatsWithMYSeats = function (seatList) {
        return seatList.map(function (seatModel) {
            var row = (0, _parseInt2.default)(seatModel.rowNo);
            var col = (0, _parseInt2.default)(seatModel.columnNo);
            var rowNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.rowId, true, 1));
            var colNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.columnId, true, 1));
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(function (bridgeModel) {
            var seatRowModel = bridgeModel.seatModel;
            var loveIndex = 0;
            if (seatRowModel.status === 'L') {
                loveIndex = 1;
            } else if (seatRowModel.status === 'R') {
                loveIndex = 2;
            }
            return __assign({}, bridgeModel, { status: seatRowModel.status === 'LK' ? 1 : 0, rowLocation: bridgeModel.row * (_cellSize + _cellSpace), colLocation: bridgeModel.col * (_cellSize + _cellSpace), loveIndex: loveIndex });
        });
    };
    /**
     * 获取百度智能座位图
     * @private
     * @param seatList
     * @returns {Array}
     */
    SeatManager.prototype.smartSeatsWithBDSeats = function (seatList) {
        return seatList.map(function (seatModel) {
            var row = (0, _parseInt2.default)(seatModel.rowId);
            var col = (0, _parseInt2.default)(seatModel.columnId);
            var rowNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.rowNo, true, 1));
            var colNumber = (0, _parseInt2.default)(JToolString_js_1.default.numberFromString(seatModel.columnNo, true, 1));
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(function (bridgeModel) {
            var seatRowModel = bridgeModel.seatModel;
            return __assign({}, bridgeModel, { status: seatRowModel.status === '2' ? 1 : 0, rowLocation: bridgeModel.row * (_cellSize + _cellSpace), colLocation: bridgeModel.col * (_cellSize + _cellSpace), loveIndex: (0, _parseInt2.default)(seatRowModel.isLove), areaInfo: seatRowModel.area });
        });
    };
    /**
     * 获取座位图尺寸
     * @private
     * @param smartSeats 智能座位图
     * @returns {{width: *, height: *}} 座位图尺寸
     */
    SeatManager.prototype.seatContentSizeWithSmartSeats = function (smartSeats) {
        // 计算座位图大小
        var maxWidth = 0;
        var maxHeight = 0;
        for (var _i = 0, smartSeats_1 = smartSeats; _i < smartSeats_1.length; _i++) {
            var smartSeatModel = smartSeats_1[_i];
            if (maxWidth < smartSeatModel.colLocation) {
                maxWidth = smartSeatModel.colLocation;
            }
            if (maxHeight < smartSeatModel.rowLocation) {
                maxHeight = smartSeatModel.rowLocation;
            }
        }
        var seatContentWidth = maxWidth + _cellSize;
        var seatContentHeight = maxHeight + _cellSize;
        return { 'width': seatContentWidth, 'height': seatContentHeight };
    };
    /**
     * 获取座位图元数据
     * @private
     * @param smartSeats 智能座位图
     * @returns {{seatCellWidth: number, seatCellHeight: number, seatContentWidth, seatContentHeight}}
     */
    SeatManager.prototype.seatContentDataFromSmartSeats = function (smartSeats) {
        var seatContentSize = this.seatContentSizeWithSmartSeats(smartSeats);
        return {
            'seatCellSpace': _cellSpace,
            'seatCellWidth': _cellSize,
            'seatCellHeight': _cellSize,
            'seatContentWidth': seatContentSize.width,
            'seatContentHeight': seatContentSize.height
        };
    };
    /**
     * 获取行号数据
     * @private
     * @param smartSeats 智能座位图
     * @returns {Array.<*>} 返回行号数据 {rowNumber, colLocation}
     */
    SeatManager.prototype.rowDataFromSmartSeats = function (smartSeats) {
        var dict = new _map2.default();
        for (var _i = 0, smartSeats_2 = smartSeats; _i < smartSeats_2.length; _i++) {
            var seat = smartSeats_2[_i];
            var row = seat.rowNumber;
            if (dict.hasOwnProperty(row)) {
                continue;
            }
            dict.set(row, seat.rowLocation);
        }
        var allRowNumber = dict.keys();
        var allRowData = [];
        for (var _a = 0, allRowNumber_1 = allRowNumber; _a < allRowNumber_1.length; _a++) {
            var rowNumber = allRowNumber_1[_a];
            allRowData.push({ rowNumber: rowNumber, colLocation: dict.get(rowNumber) });
        }
        return allRowData.sort(function (a, b) {
            return a.rowNumber.toString().localeCompare(b.rowNumber.toString());
        });
    };
    return SeatManager;
}();
exports.default = SeatManager;
//# sourceMappingURL=JManagerSeat.js.map
