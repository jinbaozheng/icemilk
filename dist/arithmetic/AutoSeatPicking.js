'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = null;

var AutoSeatPicking = function () {
  function AutoSeatPicking() {
    (0, _classCallCheck3.default)(this, AutoSeatPicking);

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

  (0, _createClass3.default)(AutoSeatPicking, [{
    key: 'createSeatMap',
    value: function createSeatMap(smartSeats) {
      var maxRow = 0;
      var maxCol = 0;
      var minRow = Number.POSITIVE_INFINITY;
      var minCol = Number.POSITIVE_INFINITY;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(smartSeats), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var seat = _step.value;

          maxRow = Math.max(seat.row, maxRow);
          maxCol = Math.max(seat.col, maxCol);
          minRow = Math.min(seat.row, minRow);
          minCol = Math.min(seat.col, minCol);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      for (var i = 0; i <= maxRow; i++) {
        this.seatMap[i] = [];
        this.seatModelMap[i] = [];
        for (var j = 0; j <= maxCol; j++) {
          this.seatMap[i][j] = '_';
          this.seatModelMap[i][j] = {};
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(smartSeats), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _seat = _step2.value;

          this.seatModelMap[_seat.row][_seat.col] = _seat;
          if (_seat.status === 0 && (_seat.loveIndex === 0 || isNaN(_seat.loveIndex))) {
            this.seatMap[_seat.row][_seat.col] = '0';
          } else {
            this.seatMap[_seat.row][_seat.col] = '1';
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.rowCount = maxRow + 1;
      this.colCount = maxCol + 1;
      this.minRow = minRow;
      this.minCol = minCol;
    }
  }, {
    key: 'autoSelected',
    value: function autoSelected(smartSeats, count, resultCallback) {
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
    }
  }, {
    key: 'targetFromRowColTier',
    value: function targetFromRowColTier(row, col, tier) {
      for (var i = 0; i <= tier; i++) {
        if (this.targetFromRowColInnerOffsetTier(row, col, i, tier)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'targetFromRowColInnerOffsetTier',
    value: function targetFromRowColInnerOffsetTier(row, col, innerOffset, tier) {
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
              return false;
            }
            if (this.seatMap[resultRow][resultCol] === '0') {
              var result = this.checkVisibleSeatAtRowColMiddleOffsetCount(resultRow, resultCol, this.needSeatCount);
              if (result.length === this.needSeatCount) {
                var resultMap = new _map2.default();
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = (0, _getIterator3.default)(result), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var integer = _step3.value;

                    var _row = parseInt(integer / this.colCount);
                    var _col = integer % this.colCount;
                    var key = _row + ':' + _col;
                    var value = this.seatModelMap[_row][_col];
                    resultMap.set(key, value);
                  }
                } catch (err) {
                  _didIteratorError3 = true;
                  _iteratorError3 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                      _iterator3.return();
                    }
                  } finally {
                    if (_didIteratorError3) {
                      throw _iteratorError3;
                    }
                  }
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
  }, {
    key: 'checkVisibleSeatAtRowColMiddleOffsetCount',
    value: function checkVisibleSeatAtRowColMiddleOffsetCount(row, col, count) {
      if (col >= this.colCount || col < 0) {
        return [];
      }

      if (count === 1) {
        if (this.seatMap[row][col] === '0') {
          return [this.integerAt(row, col)];
        }
        return [];
      }

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
          for (var _j = 0; _j < this.needSeatCount; _j++) {
            result = result.concat(this.checkVisibleSeatAtRowColMiddleOffsetCount(row, col - i - parseInt(this.needSeatCount / 2) + _j, 1));
          }
          if (result.length === this.needSeatCount) {
            return result;
          }
        }
      }
      return [];
    }
  }, {
    key: 'integerAt',
    value: function integerAt(row, col) {
      return row * this.colCount + col;
    }
  }], [{
    key: 'defaultManager',
    value: function defaultManager() {
      return new AutoSeatPicking();
    }
  }]);
  return AutoSeatPicking;
}();

exports.default = AutoSeatPicking;