/**
 * Created by cuppi on                                              2016/12/21.
 */
// import _ from 'lodash';
import SmartSeatModel from "../model/SmartSeatModel";

let instance = null;
class AutoSeatPicking {
  /*
  *  @member AutoSeatPicking#needSeatCount
  *  @type {string}
  */
  private needSeatCount: number;
  private rowCount: number;
  private colCount: number;
  private minRow: number;
  private minCol: number;
  private seatMap: string[][];
  private seatModelMap: SmartSeatModel[][];
  private resultCallback: Function;

  constructor() {
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

  static defaultManager() {
    return new AutoSeatPicking();
  }

  /**
   * 创建快捷座位简图
   * @param smartSeats 目标座位图
   */
  createSeatMap(smartSeats: SmartSeatModel[]) {
    let maxRow = 0;
    let maxCol = 0;
    let minRow = Number.POSITIVE_INFINITY;
    let minCol = Number.POSITIVE_INFINITY;
    for (let seat of smartSeats) {
      maxRow = Math.max(seat.row, maxRow);
      maxCol = Math.max(seat.col, maxCol);
      minRow = Math.min(seat.row, minRow);
      minCol = Math.min(seat.col, minCol);
    }

    for (let i = 0; i <= maxRow; i++) {
      this.seatMap[i] = [];
      this.seatModelMap[i] = [];
      for (let j = 0; j <= maxCol; j++) {
        this.seatMap[i][j] = '_';
        this.seatModelMap[i][j] = null;
      }
    }

    for (let seat of smartSeats) {
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
  }

  /**
   *  一层一层寻找最佳位置
   * @param smartSeats 目标座位图
   * @param count 期望最佳位置的数量
   * @param resultCallback 结果回调
   */
  autoSelected(smartSeats, count, resultCallback) {
    this.createSeatMap(smartSeats);
    this.needSeatCount = count;
    this.resultCallback = resultCallback;
    let rowLength = (this.rowCount - this.minRow);
    let colLength = (this.colCount - this.minCol);
    for (let i = 0; i <= Math.max(Math.floor(this.rowCount / 2), Math.floor(this.colCount / 2)); i++) {
      if (this.targetFromRowColTier(Math.floor(rowLength / 2) + this.minRow, Math.floor(colLength / 2) + this.minCol, i)) {
        return;
      }
    }
    resultCallback(new Map());
  }

  /**
   * 判断指定层是否存在最佳位置
   * @param row 指定点行
   * @param col 指定点列
   * @param tier 层数
   * @returns {boolean} 是否存在最佳位置
   */
  targetFromRowColTier(row, col, tier) {
    for (let i = 0; i <= tier; i++) {
      if (this.targetFromRowColInnerOffsetTier(row, col, i, tier)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 判断指定点的期望结果
   * @param row 指定点行
   * @param col 指定点列
   * @param innerOffset 行内偏移
   * @param tier 层索引
   * @returns {boolean} 是否存在
   */
  targetFromRowColInnerOffsetTier(row: number, col: number, innerOffset: number, tier: number) {
    let rowSignTimes = (innerOffset !== 0) ? 1 : 0;
    for (let rowSign = -1; rowSign <= rowSignTimes; rowSign++) {
      if (!rowSign) {
        continue;
      }
      let colSignTimes = (tier !== 0) ? 1 : 0;
      for (let colSign = -1; colSign <= colSignTimes; colSign++) {
        if (!colSign) {
          continue;
        }
        let changeTimes = (innerOffset != tier) ? 1 : 0;
        for (let change = 0; change <= changeTimes; change++) {
          let rowOffset, colOffset;
          if (change) {
            rowOffset = tier * colSign;
            colOffset = innerOffset * rowSign;
          } else {
            rowOffset = innerOffset * rowSign;
            colOffset = tier * colSign;
          }
          let resultRow = row + rowOffset;
          let resultCol = col + colOffset;
          if (resultRow < 0 ||
            resultCol < 0 ||
            resultRow >= this.rowCount ||
            resultCol >= this.colCount) {
            // console.log('内存溢出');
            return false;
          }
          if (this.seatMap[resultRow][resultCol] === '0') {
            let result = this.checkVisibleSeatAtRowColMiddleOffsetCount(resultRow, resultCol, this.needSeatCount);
            if (result.length === this.needSeatCount) {
              let resultMap = new Map();
              for (let integer of result) {
                let row = Math.floor(integer / this.colCount);
                let col = integer % this.colCount;
                let key = row + ':' + col;
                let value = this.seatModelMap[row][col];
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
  }

  /**
   * 判断指定点的所有行内偏移的结果
   * @param row 指定点行
   * @param col 指定点列
   * @param count 当前查找的数量(后期需要优化)
   * @returns {*} 是否存在期望点
   */
  checkVisibleSeatAtRowColMiddleOffsetCount(row: number, col: number, count: number) {
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
    for (let i = 0; i <= Math.floor(count / 2); i++) {
      let result = [];
      for (let j = 0; j < this.needSeatCount; j++) {
        result = result.concat(this.checkVisibleSeatAtRowColMiddleOffsetCount(row, col + i - Math.floor(this.needSeatCount / 2) + j, 1));
      }
      if (result.length === this.needSeatCount) {
        return result;
      }
      if (i <= Math.floor((count - 1) / 2)) {
        result = [];
        for (let j = 0; j < this.needSeatCount; j++) {
          result = result.concat(this.checkVisibleSeatAtRowColMiddleOffsetCount(row, col - i - Math.floor(this.needSeatCount / 2) + j, 1))
        }
        if (result.length === this.needSeatCount) {
          return result;
        }
      }
    }
    return [];
  }

  /**
   * 二维转一维
   * @param row 行号
   * @param col 列好
   * @returns {*} 一维对应的映射
   */
  integerAt(row, col) {
    return row * this.colCount + col;
  }
}

export default AutoSeatPicking;
