/**
 * Created by cuppi on 2016/12/5.
 */
import NetworkCinemaManager from '../network/NetworkCinema.js';
import StringTool from '../tool/StringTool.js';
const _cellSize = 30;
const _cellSpace = 8;
let instance = null;

class SeatManager {
    /**
     * 构造器
     * @returns {*}
     */
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /**
     * 单例方法
     * @returns {SeatManager}
     */
    static defaultManager() {
        return new SeatManager();
    }

    /**
     * 获取座位图时需要的参数
     * @param type 平台类型
     * @param platform 平台数据
     * @returns {{平台需要的参数}}
     */
    static seatParasFromPlatform(type, platform) {
        var paras = {};
        if (type === 'wangpiao') {
            paras = {
                cinemaId: platform.cinemaId,
                showId: platform.showIndex
            }
        }

        if (type === 'spider') {
            paras = {
                cinemaId: platform.cinemaId,
                showId: platform.showId,
                hallId: platform.hallId
            }
        }

        if (type === 'maizuo') {
            paras = {
                showId: platform.foretellId
            }
        }

        if (type === 'danche') {
            paras = {
                showId: platform.id
            }
        }

        if (type === 'maoyan' || type === 'meituan' || type === 'dazhong') {
            paras = {
                showId: platform.showId
            }
        }

        if (type === 'baidu') {
            paras = {
                showId: platform.seqid
            }
        }
        return paras;
    }

    /**
     * 获取经过智能转换的座位图
     * @param type 平台类型
     * @param paras 平台参数
     * @param callback 回调(第一个参数为error   第二个参数为smartSeats  成功error为null 否则smartSeats为null)
     */
    smartSeatsFromPlatform(type, paras, callback) {
        NetworkCinemaManager.cinemaSeat(type, paras).then((data) => {
            let seatList = this.unitySeatWithSeatData(type, data);
            // 获取智能座位图
            let smartSeats = this.smartSeatsWithSeats(type, seatList);
            let seatContentData = this.seatContentDataFromSmartSeats(smartSeats);
            let seatRowData = this.rowDataFromSmartSeats(smartSeats);
            callback(null, {smartSeats, seatRowData, ...seatContentData});
        }, (error) => {
            console.log(error);
            callback(error, null);
        });
    }

    /** ***********************  下面的方法为内部方法 ******************** **/

    /**
     * 统一座位格式
     * @param type
     * @param seatData
     * @returns {Array}
     */
    unitySeatWithSeatData(type, seatData) {
        if (type === 'maoyan' || type === 'meituan' || type === 'dazhong') {
            let seatList = [];
            let sections = seatData.sections;
            for (let section of sections) {
                for (let sectionId in section) {
                    if (section.hasOwnProperty(sectionId)) {
                        let seatMap = section[sectionId].seatMap;
                        let maxRow = section[sectionId].maxRow ? section[sectionId].maxRow : 0;
                        let maxColumn = section[sectionId].maxColumn ? section[sectionId].maxColumn : 0;
                        for (let i = 0; i <= maxRow; i++) {
                            for (let j = 0; j <= maxColumn; j++) {
                                let seat = seatMap[i + ':' + j];
                                // 去掉走廊
                                if (seat && seat.status !== 'E') {
                                    seat.sectionId = sectionId;
                                    // 时间复杂度多了  但是代码整洁
                                    seatList.push(seat);
                                }
                            }
                        }
                    }
                }
            }
            return seatList;
        }

        let seatList = [];
        let seatMap = seatData.seatMap;
        let maxRow = seatData.maxRow;
        let maxColumn = seatData.maxColumn;
        // 获取基本座位图
        if (type === 'danche') {
            for (let i = 0; i <= maxRow; i++) {
                for (let j = 0; j <= maxColumn; j++) {
                    let seat = seatMap[i + ':' + j];
                    if (seat && seat.isSeat) {
                        // 时间复杂度多了  但是代码整洁
                        seatList.push(seat);
                    }
                }
            }
        } else if (type === 'baidu') {
            for (let i = 0; i <= maxRow; i++) {
                for (let j = 0; j <= maxColumn; j++) {
                    let seat = seatMap[i + ':' + j];
                    if (seat && seat.seatNo && seat.seatNo !== '') {
                        seat.rowId = i;
                        seat.columnId = j;
                        // 时间复杂度多了  但是代码整洁
                        seatList.push(seat);
                    }
                }
            }
        } else {
            for (let i = 0; i <= maxRow; i++) {
                for (let j = 0; j <= maxColumn; j++) {
                    let seat = seatMap[i + ':' + j];
                    if (seat) {
                        // 时间复杂度多了  但是代码整洁
                        seatList.push(seat);
                    }
                }
            }
        }
        return seatList;
    }

    /**
     * 获取智能座位图通用方法
     * @param type 平台类型
     * @param seatList 基本座位图
     * @returns {Array} 智能座位图
     */
    smartSeatsWithSeats(type, seatList) {
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
    }

    /**
     * 获取网票智能座位图
     * @param seatList
     * @returns {Array}
     */
    smartSeatsWithWPSeats(seatList) {
        return seatList.map((seatModel) => {
            let row = Number.parseInt(seatModel.key.split(':').shift());
            let col = Number.parseInt(seatModel.key.split(':').pop());
            let rowNumber = StringTool.numberIfAZ(seatModel.Name.split(':').shift());
            let colNumber = StringTool.numberIfAZ(seatModel.Name.split(':').pop());
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map((bridgeModel) => {
            let seatRowModel = bridgeModel.seatModel;
            return {
                ...bridgeModel,
                status: seatRowModel.Status,
                rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
                colLocation: bridgeModel.col * (_cellSize + _cellSpace),
                loveIndex: Number.parseInt(seatRowModel.LoveFlag)
            };
        });
    }

    /**
     * 获取蜘蛛智能座位图
     * @param seatList
     * @returns {Array}
     */
    smartSeatsWithSPSeats(seatList) {
        return seatList.map((seatModel) => {
            let row = Number.parseInt(seatModel.rowNum);
            let col = Number.parseInt(seatModel.columnNum);
            let rowNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.rowId));
            let colNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.columnId));
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(bridgeModel => {
            let seatRowModel = bridgeModel.seatModel;
            return {
                ...bridgeModel,
                status: seatRowModel.isLock
                    ? 'N'
                    : 'Y',
                rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
                colLocation: bridgeModel.col * (_cellSize + _cellSpace),
                loveIndex: Number.parseInt(seatRowModel.loveIndex)
            }
        });
    }

    /**
     * 获取卖座智能座位图
     * @param seatList
     * @returns {Array}
     */
    smartSeatsWithMZSeats(seatList) {
        return seatList.map((seatModel) => {
            let row = Number.parseInt(seatModel.rowNum);
            let col = Number.parseInt(seatModel.columnNum);
            let rowNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.rowId));
            let colNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.columnId));
            // 上海百美汇影城
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(bridgeModel => {
            let seatRowModel = bridgeModel.seatModel;
            return {
                ...bridgeModel,
                status: seatRowModel.isLock === '1'
                    ? 'N'
                    : 'Y',
                rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
                colLocation: bridgeModel.col * (_cellSize + _cellSpace),
                loveIndex: Number.parseInt(seatRowModel.loveIndex)
            }
        });
    }

    /**
     * 获取单车智能座位图
     * @param seatList
     * @returns {Array}
     */
    smartSeatsWithDCSeats(seatList) {
        return seatList.map((seatModel) => {
            let row = Number.parseInt(seatModel.rowNum);
            let col = Number.parseInt(seatModel.columnNum);
            let rowNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.rowId));
            let colNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.columnId));
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(bridgeModel => {
            let seatRowModel = bridgeModel.seatModel;
            console.log(seatRowModel.loveIndex);
            return {
                ...bridgeModel,
                status: seatRowModel.isLock
                    ? 'N'
                    : 'Y',
                rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
                colLocation: bridgeModel.col * (_cellSize + _cellSpace),
                loveIndex: Number.parseInt(seatRowModel.loveIndex)
            }
        });
    }

    /**
     * 获取猫眼智能座位图
     * @param seatList
     * @returns {Array}
     */
    smartSeatsWithMYSeats(seatList) {
        return seatList.map((seatModel) => {
            let row = Number.parseInt(seatModel.rowNo);
            let col = Number.parseInt(seatModel.columnNo);
            let rowNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.rowId));
            let colNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.columnId));
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map(bridgeModel => {
            var seatRowModel = bridgeModel.seatModel;
            let loveIndex = 0;
            if (seatRowModel.status === 'L') {
                loveIndex = 1;
            } else if (seatRowModel.status === 'R') {
                loveIndex = 2;
            }
            return {
                ...bridgeModel,
                status: seatRowModel.status === 'LK'
                    ? 'N'
                    : 'Y',
                rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
                colLocation: bridgeModel.col * (_cellSize + _cellSpace),
                loveIndex: loveIndex
            }
        });
    }

    /**
     * 获取百度智能座位图
     * @param seatList
     * @returns {Array}
     */
    smartSeatsWithBDSeats(seatList) {
        return seatList.map((seatModel) => {
            let row = Number.parseInt(seatModel.rowId);
            let col = Number.parseInt(seatModel.columnId);
            let rowNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.rowNo));
            let colNumber = Number.parseInt(StringTool.numberIfAZ(seatModel.columnNo));
            return {
                row: row,
                col: col,
                rowNumber: rowNumber,
                colNumber: colNumber,
                seatModel: seatModel
            };
        }).map((bridgeModel) => {
            let seatRowModel = bridgeModel.seatModel;
            return {
                ...bridgeModel,
                status: seatRowModel.status === '2'
                    ? 'N'
                    : 'Y',
                rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
                colLocation: bridgeModel.col * (_cellSize + _cellSpace),
                loveIndex: Number.parseInt(seatRowModel.isLove)
            };
        });
    }

    /**
     * 获取座位图尺寸
     * @param smartSeats 智能座位图
     * @returns {{width: *, height: *}} 座位图尺寸
     */
    seatContentSizeWithSmartSeats(smartSeats) {
        // 计算座位图大小
        let maxWidth = 0;
        let maxHeight = 0;
        for (let smartSeatModel of smartSeats) {
            if (maxWidth < smartSeatModel.colLocation) {
                maxWidth = smartSeatModel.colLocation;
            }
            if (maxHeight < smartSeatModel.rowLocation) {
                maxHeight = smartSeatModel.rowLocation;
            }
        }
        let seatContentWidth = maxWidth + _cellSize;
        let seatContentHeight = maxHeight + _cellSize;
        return {'width': seatContentWidth, 'height': seatContentHeight};
    }

    /**
     * 获取座位图元数据
     * @param smartSeats 智能座位图
     * @returns {{seatCellWidth: number, seatCellHeight: number, seatContentWidth, seatContentHeight}}
     */
    seatContentDataFromSmartSeats(smartSeats) {
        let seatContentSize = this.seatContentSizeWithSmartSeats(smartSeats);
        return {
            'seatCellSpace': _cellSpace,
            'seatCellWidth': _cellSize,
            'seatCellHeight': _cellSize,
            'seatContentWidth': seatContentSize.width,
            'seatContentHeight': seatContentSize.height
        };
    }

    /**
     * 获取行号数据
     * @param smartSeats 智能座位图
     * @returns {Array.<*>} 返回行号数据 {rowNumber, colLocation}
     */
    rowDataFromSmartSeats(smartSeats) {
        let dict = new Map();
        for (let seat of smartSeats) {
            let row = seat.rowNumber;
            if (dict.hasOwnProperty(row)) {
                continue;
            }
            dict.set(row, seat.rowLocation);
        }
        let allRowNumber = dict.keys();
        let allRowData = [];
        for (let rowNumber of allRowNumber) {
            allRowData.push({rowNumber: rowNumber, colLocation: dict.get(rowNumber)});
        }
        return allRowData.sort((a, b) => {
            return a.rowNumber.toString().localeCompare(b.rowNumber.toString());
        })
    }
}

export default SeatManager;
