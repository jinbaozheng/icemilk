/**
 * Created by cuppi on 2016/12/5.
 */

import NetworkCinemaManager from '../network/JNetworkCinema.js';
import StringTool from '../tool/JToolString.js';
import AutoSeatPicking from '../arithmetic/AutoSeatPicking';

const _cellSize = 30;
const _cellSpace = 8;
let instance = null;

/**
 * 座位图管理类
 * @alias util/JManagerSeat
 */
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
   * 智能选座
   * @param smartSeats
   * @param count
   * @returns {Promise}
   */
  static smartAutoSelected(smartSeats, count) {
    return new Promise((reduce, reject) => {
      AutoSeatPicking.defaultManager().autoSelected(smartSeats, count, (data) => {
        reduce(data);
      });
    });
  }

  /**
   * 获取座位图时需要的参数
   * @param platform 平台类型
   * @param screening 平台数据
   * @returns {Object} 平台需要的参数
   */
  static seatParasFromScreening(platform, screening) {
    var paras = {};
    if (platform === 'wangpiao') {
      paras = {
        cinemaId: screening.cinemaId,
        showId: screening.showId
      }
    }

    if (platform === 'spider') {
      paras = {
        cinemaId: screening.cinemaId,
        showId: screening.showId,
        hallId: screening.hallId
      }
    }

    if (platform === 'maizuo') {
      paras = {
        showId: screening.showId
      }
    }

    if (platform === 'danche') {
      paras = {
        showId: screening.showId
      }
    }

    if (platform === 'maoyan' || platform === 'meituan' || platform === 'dazhong') {
      paras = {
        showId: screening.showId
      }
    }

    if (platform === 'baidu') {
      paras = {
        showId: screening.showId
      }
    }
    return paras;
  }

  /**
   * 对原始座位图进行智能转换
   * @param type 平台类型
   * @param seatData 座位图原始数据
   * @returns {Array} 智能座位图列表
   */
  smartSeatsFromSeats(type, seatData){
    let seatList = this.unitySeatWithSeatData(type, seatData);
    // 获取智能座位图
    return this.smartSeatsWithSeats(type, seatList);
  }

  /**
   * 获取智能座位图元数据
   * @param type 平台类型
   * @param smartSeats 智能座位图
   * @returns {{smartSeats: Array, seatRowData: Array.<*>}} 智能座位图详细信息
   */
  smartSeatDataFromSmartSeats(type, smartSeats) {
    let seatRowData = this.rowDataFromSmartSeats(smartSeats);
    let seatContentData = this.seatContentDataFromSmartSeats(smartSeats);
    return {smartSeats, seatRowData, ...seatContentData};
  }

  /**
   * 对原始座位图进行智能转换
   * @param type 平台类型
   * @param seatData 座位图原始数据
   * @returns {{smartSeats: Array, seatRowData: Array.<*>}} 智能座位图详细信息
   */
  smartSeatDataFromSeats(type, seatData) {
    // 获取智能座位图
    let smartSeats = this.smartSeatsFromSeats(type, seatData);
    return this.smartSeatDataFromSmartSeats(type, smartSeats);
  }


  /** ***********************  下面的方法为内部方法  ******************** **/

  /**
   * 统一座位格式
   * @private
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
   * @private
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
   * @private
   * @param seatList
   * @returns {Array}
   */
  smartSeatsWithWPSeats(seatList) {
    return seatList.map((seatModel) => {
      let row = Number.parseInt(seatModel.key.split(':').shift());
      let col = Number.parseInt(seatModel.key.split(':').pop());
      let rowNumber = StringTool.numberFromString(seatModel.Name.split(':').shift(), true, 1);
      let colNumber = StringTool.numberFromString(seatModel.Name.split(':').pop(), true, 1);
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
        // N:lock  Y:unLock
        status: seatRowModel.Status === 'Y' ? 0 : 1,
        rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellSpace),
        loveIndex: Number.parseInt(seatRowModel.LoveFlag)
      };
    });
  }

  /**
   * 获取蜘蛛智能座位图
   * @private
   * @param seatList
   * @returns {Array}
   */
  smartSeatsWithSPSeats(seatList) {
    return seatList.map((seatModel) => {
      let row = Number.parseInt(seatModel.rowNum);
      let col = Number.parseInt(seatModel.columnNum);
      let rowNumber = Number.parseInt(StringTool.numberFromString(seatModel.rowId, true, 1));
      let colNumber = Number.parseInt(StringTool.numberFromString(seatModel.columnId, true, 1));
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
          ? 1
          : 0,
        rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellSpace),
        loveIndex: Number.parseInt(seatRowModel.loveIndex)
      }
    });
  }

  /**
   * 获取卖座智能座位图
   * @private
   * @param seatList
   * @returns {Array}
   */
  smartSeatsWithMZSeats(seatList) {
    return seatList.map((seatModel) => {
      let row = Number.parseInt(seatModel.rowNum);
      let col = Number.parseInt(seatModel.columnNum);
      let rowNumber = Number.parseInt(StringTool.numberFromString(seatModel.rowId, true, 1));
      let colNumber = Number.parseInt(StringTool.numberFromString(seatModel.columnId, true, 1));
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
          ? 1
          : 0,
        rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellSpace),
        loveIndex: Number.parseInt(seatRowModel.loveIndex)
      }
    });
  }

  /**
   * 获取单车智能座位图
   * @private
   * @param seatList
   * @returns {Array}
   */
  smartSeatsWithDCSeats(seatList) {
    return seatList.map((seatModel) => {
      let row = Number.parseInt(seatModel.rowNum);
      let col = Number.parseInt(seatModel.columnNum);
      let rowNumber = Number.parseInt(StringTool.numberFromString(seatModel.rowId, true, 1));
      let colNumber = Number.parseInt(StringTool.numberFromString(seatModel.columnId, true, 1));
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
          ? 1
          : 0,
        rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellSpace),
        loveIndex: Number.parseInt(seatRowModel.loveIndex)
      }
    });
  }

  /**
   * 获取猫眼智能座位图
   * @private
   * @param seatList
   * @returns {Array}
   */
  smartSeatsWithMYSeats(seatList) {
    return seatList.map((seatModel) => {
      let row = Number.parseInt(seatModel.rowNo);
      let col = Number.parseInt(seatModel.columnNo);
      let rowNumber = Number.parseInt(StringTool.numberFromString(seatModel.rowId, true, 1));
      let colNumber = Number.parseInt(StringTool.numberFromString(seatModel.columnId, true, 1));
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
          ? 1
          : 0,
        rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellSpace),
        loveIndex: loveIndex
      }
    });
  }

  /**
   * 获取百度智能座位图
   * @private
   * @param seatList
   * @returns {Array}
   */
  smartSeatsWithBDSeats(seatList) {
    return seatList.map((seatModel) => {
      let row = Number.parseInt(seatModel.rowId);
      let col = Number.parseInt(seatModel.columnId);
      let rowNumber = Number.parseInt(StringTool.numberFromString(seatModel.rowNo, true, 1));
      let colNumber = Number.parseInt(StringTool.numberFromString(seatModel.columnNo, true, 1));
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
          ? 1
          : 0,
        rowLocation: bridgeModel.row * (_cellSize + _cellSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellSpace),
        loveIndex: Number.parseInt(seatRowModel.isLove),
        areaInfo: seatRowModel.area
      };
    });
  }

  /**
   * 获取座位图尺寸
   * @private
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
   * @private
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
   * @private
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
