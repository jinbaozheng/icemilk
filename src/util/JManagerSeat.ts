/**
 * Created by cuppi on 2016/12/5.
 */

import NetworkCinemaManager from '../network/JNetworkCinema';
import StringTool from '../tool/JToolString';
import AutoSeatPicking from '../arithmetic/AutoSeatPicking';
import SmartSeatModel from "../model/SmartSeatModel";

const _cellSize = 30;
const _cellRowSpace = 8;
const _cellColSpace = 8;


let instance = null;

/**
 * 座位图管理类
 * @module manager
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
    let paras = {};
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

    if (platform === 'taobao'){
      paras = {
        cinemaId: platform.cinemaId,
        showId: platform.showId,
        sectionId: platform.sectionId
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
    if (!seatData){
      return [];
    }

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

    // 淘票票预处理
    if (type === 'taobao' && !seatData.regular){
      seatData = this.handleTaoBaoSeatData(seatData);
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
   * 淘票票座位图处理
   * @param seatData
   * @returns {*}
   */
  handleTaoBaoSeatData(seatData){
    let seatMap = seatData.seatMap;
    let seatRowList: number[] = [];
    let seatColList: number[] = [];
    for (let key in seatMap){
      if (seatMap.hasOwnProperty(key)){
        let location: string[] = key.split(':');
        seatRowList.push(parseInt(location[0]));
        seatColList.push(parseInt(location[1]));
      }
    }
    seatRowList.sort((a: number, b: number) => {
      return (a - b) && ((a - b) / Math.abs(a - b))
    })
    seatColList.sort((a: number, b: number) => {
      return (a - b) && ((a - b) / Math.abs(a - b))
    })
    let closeRowSpace:any = {};
    let closeColSpace:any = {};
    for (let i = 1, l = Math.min(seatRowList.length, seatColList.length); i < l; i++){
      let rowOffset = seatRowList[i] - seatRowList[i - 1];
      if (closeRowSpace.hasOwnProperty(rowOffset)){
        closeRowSpace[rowOffset]++;
      } else {
        closeRowSpace[rowOffset] = 1;
      }

      let colOffset = seatColList[i] - seatColList[i - 1];
      if (closeColSpace.hasOwnProperty(colOffset)){
        closeColSpace[colOffset]++;
      } else {
        closeColSpace[colOffset] = 1;
      }
    }

    let rowSpace = Number.MAX_VALUE;
    let rowStress = 0;
    for (let spaceString in closeRowSpace){
      if(closeRowSpace.hasOwnProperty(spaceString)){
        let space = parseInt(spaceString);
        if (space !== 0 && closeRowSpace[space] > rowStress){
          rowSpace = space;
          rowStress = closeRowSpace[space];
        }
      }
    }

    let colSpace = Number.MAX_VALUE;
    let colStress = 0;
    for (let spaceString in closeColSpace){
      let space = parseInt(spaceString);
      if (space !== 0 && closeColSpace[space] > colStress){
        colSpace = space;
        colStress = closeColSpace[space];
      }
    }

    let filteredSeatMap = {};
    for (let key in seatMap){
      if (seatMap.hasOwnProperty(key)){
        let location: string[] = key.split(':');
        let filteredRow: number = Math.floor(parseInt(location[0]) / rowSpace);
        let filteredCol: number = Math.floor(parseInt(location[1]) / colSpace);
        let rowId: number = Math.floor(seatMap[key].rowId / rowSpace);
        let columnId: number = Math.floor(seatMap[key].columnId / colSpace);
        filteredSeatMap[filteredRow + ':' + filteredCol] = {...seatMap[key], rowId, columnId};
      }
    }
    seatData.seatMap = filteredSeatMap;
    return seatData;
  }

  /**
   * 获取智能座位图通用方法
   * @private
   * @param type 平台类型
   * @param seatList 基本座位图
   * @returns {Array} 智能座位图
   */
  smartSeatsWithSeats(type, seatList) {
    let smartSeats = [];
    if (type === 'wangpiao') {
      smartSeats = this.smartSeatsWithWPSeats(seatList);
    }
    if (type === 'spider') {
      smartSeats = this.smartSeatsWithSPSeats(seatList);
    }
    if (type === 'maizuo') {
      smartSeats = this.smartSeatsWithMZSeats(seatList);
    }
    if (type === 'danche') {
      smartSeats = this.smartSeatsWithDCSeats(seatList);
    }
    if (type === 'maoyan' || type === 'meituan' || type === 'dazhong') {
      smartSeats = this.smartSeatsWithMYSeats(seatList);
    }
    if (type === 'baidu') {
      smartSeats = this.smartSeatsWithBDSeats(seatList);
    }
    if (type === 'taobao') {
      smartSeats = this.smartSeatsWithTBSeats(seatList);
    }
    let minRow = Number.MAX_VALUE;
    let minCol = Number.MAX_VALUE;
    smartSeats.forEach(seat => {
      minRow = Math.min(minRow, seat.row);
      minCol = Math.min(minCol, seat.col);
    })
    smartSeats.forEach(seat => {
      seat.adjustRow = seat.row - minRow;
      seat.adjustCol = seat.col - minCol;
      seat.rowLocation -= minRow * (_cellSize + _cellRowSpace)
      seat.colLocation -= minCol * (_cellSize + _cellColSpace)
    })
    return smartSeats;
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
      let rowOriNumber = StringTool.numberRemoveLeftZero(seatModel.rowName);
      let colOriNumber = StringTool.numberRemoveLeftZero(seatModel.columnName);
      let rowNumber = StringTool.numberFromString(seatModel.Name.split(':').shift(), true, 1);
      let colNumber = StringTool.numberFromString(seatModel.Name.split(':').pop(), true, 1);
      return {
        rowOriNumber,
        colOriNumber,
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
        rowLocation: bridgeModel.row * (_cellSize + _cellRowSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellColSpace),
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
      let rowOriNumber = StringTool.numberRemoveLeftZero(seatModel.rowName);
      let colOriNumber = StringTool.numberRemoveLeftZero(seatModel.columnName);
      let rowNumber = StringTool.numberFromString(seatModel.rowId, true, 1);
      let colNumber = StringTool.numberFromString(seatModel.columnId, true, 1);
      return {
        rowOriNumber,
        colOriNumber,
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
        rowLocation: bridgeModel.row * (_cellSize + _cellRowSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellColSpace),
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
      let rowOriNumber = StringTool.numberRemoveLeftZero(seatModel.rowName);
      let colOriNumber = StringTool.numberRemoveLeftZero(seatModel.columnName);
      let rowNumber = StringTool.numberFromString(seatModel.rowId, true, 1);
      let colNumber = StringTool.numberFromString(seatModel.columnId, true, 1);
      // 上海百美汇影城
      return {
        rowOriNumber,
        colOriNumber,
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
        rowLocation: bridgeModel.row * (_cellSize + _cellRowSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellColSpace),
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
      let rowOriNumber = StringTool.numberRemoveLeftZero(seatModel.rowName);
      let colOriNumber = StringTool.numberRemoveLeftZero(seatModel.columnName);
      let rowNumber = StringTool.numberFromString(seatModel.rowId, true, 1);
      let colNumber = StringTool.numberFromString(seatModel.columnId, true, 1);
      return {
        rowOriNumber,
        colOriNumber,
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
        rowLocation: bridgeModel.row * (_cellSize + _cellRowSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellColSpace),
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
      let rowOriNumber = StringTool.numberRemoveLeftZero(seatModel.rowName);
      let colOriNumber = StringTool.numberRemoveLeftZero(seatModel.columnName);
      let rowNumber = StringTool.numberFromString(seatModel.rowId, true, 1);
      let colNumber = StringTool.numberFromString(seatModel.columnId, true, 1);
      return {
        rowOriNumber,
        colOriNumber,
        row: row,
        col: col,
        rowNumber: rowNumber,
        colNumber: colNumber,
        seatModel: seatModel
      };
    }).map(bridgeModel => {
      let seatRowModel = bridgeModel.seatModel;
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
        rowLocation: bridgeModel.row * (_cellSize + _cellRowSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellColSpace),
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
      let rowOriNumber = StringTool.numberRemoveLeftZero(seatModel.rowName);
      let colOriNumber = StringTool.numberRemoveLeftZero(seatModel.columnName);
      let rowNumber = StringTool.numberFromString(seatModel.rowNo, true, 1);
      let colNumber = StringTool.numberFromString(seatModel.columnNo, true, 1);
      return {
        rowOriNumber,
        colOriNumber,
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
        rowLocation: bridgeModel.row * (_cellSize + _cellRowSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellColSpace),
        loveIndex: Number.parseInt(seatRowModel.isLove),
        areaInfo: seatRowModel.area
      };
    });
  }

  /**
   * 获取淘票票智能座位图
   * @param seatList
   * @returns {Array}
   */
  smartSeatsWithTBSeats(seatList) {
    return seatList.map((seatModel) => {
      let row = Number.parseInt(seatModel.rowId);
      let col = Number.parseInt(seatModel.columnId);
      let rowOriNumber: string = StringTool.numberRemoveLeftZero(seatModel.rowName);
      let colOriNumber: string = StringTool.numberRemoveLeftZero(seatModel.columnName);
      let rowNumber = StringTool.numberFromString(rowOriNumber, true, 1);
      let colNumber = StringTool.numberFromString(colOriNumber, true, 1);
      return {
        rowOriNumber,
        colOriNumber,
        row,
        col,
        rowNumber,
        colNumber,
        seatModel
      };
    }).map(bridgeModel => {
      let seatRowModel = bridgeModel.seatModel;
      let loveIndex = 0;
      loveIndex = seatRowModel.loveIndex;
      return {
        ...bridgeModel,
        status: seatRowModel.status === 0
          ? 1
          : 0,
        rowLocation: bridgeModel.row * (_cellSize + _cellRowSpace),
        colLocation: bridgeModel.col * (_cellSize + _cellColSpace),
        loveIndex: loveIndex
      }
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
      'seatCellRowSpace': _cellRowSpace,
      'seatCellColSpace': _cellColSpace,
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
  rowDataFromSmartSeats(smartSeats: SmartSeatModel[]) {
    let dict = new Map();
    for (let seat of smartSeats) {
      let row = seat.rowNumber;
      if (dict.hasOwnProperty(row)) {
        continue;
      }
      dict.set(row, seat.rowLocation);
    }
    let allRowData = [];

    dict.forEach((value: number, key: number) => {
      allRowData.push({rowNumber: key, colLocation: value});
    });

    return allRowData.sort((a, b) => {
      return a.rowNumber.toString().localeCompare(b.rowNumber.toString());
    })
  }

  static maoyanSeatCheck(selectedSeats, smartSeats){
    let rows:number[] = [];
    selectedSeats.forEach(seat => {
      if (rows.indexOf(seat.row) === -1){
        rows.push(seat.row);
      }
    })
    let simpleSmartSeatsList: any[] = smartSeats.map(seat => {
      let isSel = selectedSeats.some(selSeat => {
        return selSeat.row === seat.row && selSeat.col === seat.col;
      })
      return {row: seat.row, col: seat.col, status: isSel ? -1 : seat.status};
    }).filter(seat => {
      return rows.indexOf(seat.row) !== -1;
    });
    let simpleSmartSeatsRowList = rows.map(row => {
      return simpleSmartSeatsList.filter(seat => {
        return seat.row === row
      })
    });
    for (let i = 0; i < simpleSmartSeatsRowList.length; i++){
      let simpleSmartSeatsRow = simpleSmartSeatsRowList[i];
      simpleSmartSeatsRow.sort((a: any, b: any) => {
        if (a.col > b.col){
          return 1;
        } else {
          return -1;
        }
      })
      let simpleSmartSeatsRowPieceList = [];
      let headIndex = Number.MIN_VALUE;
      let curPieceList = [];
      simpleSmartSeatsRow.forEach((seat, index) => {
        if (seat.col - index !== headIndex){
          curPieceList = [seat];
          simpleSmartSeatsRowPieceList.push(curPieceList);
          headIndex = seat.col - index;
        } else {
          curPieceList.push(seat);
        }
      })
      let visible = simpleSmartSeatsRowPieceList.map(simpleSmartSeatsRowPiece => {
        return this.isVisibleChooseWithinRow(simpleSmartSeatsRowPiece)
      }).reduce((pre, cur) => pre && cur, true)
      if (!visible){
        return false;
      }
    }
    return true;
  }

  static isVisibleChooseWithinRow(simpleSmartSeats){
    let left_space = 0;
    let right_space = 0;
    let sel_space = -1;
    for (let i = 0; i < simpleSmartSeats.length; i++){
      let seat = simpleSmartSeats[i];
      if (Math.abs(seat.status) !== 1){
        left_space++;
        if (sel_space !== -1){
          sel_space++;
        }
      }
      if (seat.status === 1)  {
        if ((right_space === 1 || left_space === 1) && (right_space * left_space)) {
          return false;
        }
        right_space = 0;
        left_space = 0;
        sel_space = -1;
      }
      if (seat.status === -1){
        if (left_space !== 0){
          right_space = left_space;
          left_space = 0;
        }
        if(sel_space === 1){
          return false;
        }
        sel_space = 0;
      }
    }
    return !((right_space === 1 || left_space === 1) && (right_space * left_space))
  }
}

export default SeatManager;
