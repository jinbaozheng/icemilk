
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetworkTrade = require('../network/JNetworkTrade.js');

var _JNetworkTrade2 = _interopRequireDefault(_JNetworkTrade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = null;

var TradeManager = function () {
  function TradeManager() {
    (0, _classCallCheck3.default)(this, TradeManager);

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  (0, _createClass3.default)(TradeManager, [{
    key: 'lockSeatHandlerFrom',
    value: function lockSeatHandlerFrom(type, paras) {
      return _JNetworkTrade2.default.tradeLockSeatNeedLogin(type, paras);
    }
  }, {
    key: 'confirmOrderHandlerFrom',
    value: function confirmOrderHandlerFrom(type, paras) {
      return _JNetworkTrade2.default.tradeConfirmOrderNeedLogin(type, paras);
    }
  }, {
    key: 'seatInforParas',
    value: function seatInforParas(type, seatList, mobile) {
      if (type === 'wangpiao') {
        var seatInfos = [];
        var seatNumberInfos = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(seatList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var seat = _step.value;

            seatInfos.push(seat.seatModel.SeatIndex);
            seatNumberInfos.push(seat.rowNumber + ':' + seat.colNumber);
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

        return {
          seatIds: seatInfos.join('|'),
          count: seatInfos.length,
          seatNumberInfos: seatNumberInfos.join('|'),
          mobile: mobile,
          openId: openId
        };
      }

      if (type === 'spider') {
        var _seatInfos = [];
        var _seatNumberInfos = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(seatList), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _seat = _step2.value;

            _seatInfos.push(_seat.seatModel.rowId + ':' + _seat.seatModel.columnId);
            _seatNumberInfos.push(_seat.rowNumber + ':' + _seat.colNumber);
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

        return {
          seatIds: _seatInfos.join('|'),
          count: _seatInfos.length,
          seatNumberInfos: _seatNumberInfos.join('|'),
          mobile: mobile,
          openId: openId
        };
      }

      if (type === 'maizuo') {
        var _seatInfos2 = [];
        var _seatNumberInfos2 = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(seatList), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _seat2 = _step3.value;

            _seatInfos2.push(_seat2.seatModel.rowId + ':' + _seat2.seatModel.columnId);
            _seatNumberInfos2.push(_seat2.rowNumber + ':' + _seat2.colNumber);
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

        return {
          seatIds: _seatInfos2.join('|'),
          count: _seatInfos2.length,
          seatNumberInfos: _seatNumberInfos2.join('|'),
          mobile: mobile,
          openId: openId
        };
      }

      if (type === 'danche') {
        var _seatInfos3 = [];
        var _seatNumberInfos3 = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = (0, _getIterator3.default)(seatList), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _seat3 = _step4.value;

            _seatInfos3.push(_seat3.seatModel.rowId + ':' + _seat3.seatModel.columnId);
            _seatNumberInfos3.push(_seat3.rowNumber + ':' + _seat3.colNumber);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        return {
          seatIds: _seatInfos3.join('|'),
          count: _seatInfos3.length,
          seatNumberInfos: _seatNumberInfos3.join('|'),
          mobile: mobile,
          openId: openId
        };
      }

      if (type === 'maoyan' || type === 'meituan' || type === 'dazhong') {
        var _seatInfos4 = [];
        var _seatNumberInfos4 = [];
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = (0, _getIterator3.default)(seatList), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _seat4 = _step5.value;

            if (!_seat4.seatModel || true) {
              console.log(_seat4);
            }
            console.log(_seat4.seatModel);
            _seatInfos4.push({
              sectionId: _seat4.seatModel.sectionId,
              columnId: _seat4.seatModel.columnId,
              rowId: _seat4.seatModel.rowId,
              seatNo: _seat4.seatModel.seatNo
            });
            _seatNumberInfos4.push(_seat4.rowNumber + ':' + _seat4.colNumber);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        return {
          seatIds: (0, _stringify2.default)({
            count: seatList.length,
            list: _seatInfos4
          }),
          seatNumberInfos: _seatNumberInfos4.join('|'),
          mobile: mobile,
          openId: openId
        };
      }

      if (type === 'baidu') {
        var seatIds = [];
        var _seatNumberInfos5 = [];
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = (0, _getIterator3.default)(seatList), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _seat5 = _step6.value;

            seatIds.push(_seat5.seatModel.seatNo);
            _seatNumberInfos5.push(_seat5.seatModel.rowId + ':' + _seat5.seatModel.columnId);
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        return {
          count: seatIds.length,

          seatIds: _seatNumberInfos5.join('|'),
          seatNumberInfos: seatIds.join('|'),
          mobile: mobile,
          openId: openId
        };
      }

      if (type === 'taobao') {
        var _seatInfos5 = [];
        var _seatNumberInfos6 = [];
        var seatNameInfos = [];
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = (0, _getIterator3.default)(seatList), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _seat6 = _step7.value;

            _seatInfos5.push(_seat6.seatModel.seatId);
            _seatNumberInfos6.push(_seat6.rowOriNumber + ':' + _seat6.colOriNumber);
            seatNameInfos.push(_seat6.seatModel.name);
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        var s = {
          seatIds: _seatInfos5.join('|'),
          count: _seatInfos5.length,
          seatNumberInfos: _seatNumberInfos6.join('|'),
          seatsName: seatNameInfos.join('|'),
          applyKey: '',
          mobile: mobile,
          openId: openId
        };
        console.log(s);
        return s;
      }
    }
  }, {
    key: 'buyTicket',
    value: function buyTicket(type, tradeParas, seatList, mobile) {
      var paras = (0, _extends3.default)({}, tradeParas, this.seatInforParas(type, seatList, mobile));
      var bridgeSelf = this;
      return {
        next: function next(lockSeatCallback) {
          return {
            next: function next(confirmOrderCallback) {
              bridgeSelf.lockSeatHandlerFrom(type, (0, _extends3.default)({}, paras, { cinemaId: paras.platformCinemaId })).then(function (data) {
                lockSeatCallback(null, data);
                var orderId = data.orderId;
                var cinemaId = paras.cinemaId,
                    jbzFilmId = paras.jbzFilmId,
                    filmId = paras.filmId,
                    showId = paras.showId;

                var cityId = store.getState().location.locationCity.id;
                var cityName = store.getState().location.locationCity.name;
                bridgeSelf.confirmOrderHandlerFrom(type, {
                  orderId: orderId,
                  cinemaId: cinemaId,
                  jbzFilmId: jbzFilmId,
                  filmId: filmId,
                  showId: showId,
                  cityId: cityId,
                  cityName: cityName
                }).then(function (data) {
                  confirmOrderCallback(null, data);
                }, function (error) {
                  confirmOrderCallback(error, null);
                });
              }, function (error) {
                lockSeatCallback(error, null);
              });
            }
          };
        }
      };
    }
  }, {
    key: 'lockSeat',
    value: function lockSeat(type, tradeParas, seatList, mobile) {
      var _this = this;

      var paras = (0, _extends3.default)({}, tradeParas, this.seatInforParas(type, seatList, mobile));
      return new _promise2.default(function (resolve, reject) {
        _this.lockSeatHandlerFrom(type, (0, _extends3.default)({}, paras, { cinemaId: paras.platformCinemaId })).then(function (data) {
          var orderId = data.orderId;
          var amount = data.originalAmount;
          var cinemaId = paras.cinemaId,
              jbzFilmId = paras.jbzFilmId,
              filmId = paras.filmId,
              showId = paras.showId;

          var cityId = store.getState().location.locationCity.id;
          var cityName = store.getState().location.locationCity.name;
          resolve({
            orderId: orderId,
            amount: amount,
            cinemaId: cinemaId,
            jbzFilmId: jbzFilmId,
            filmId: filmId,
            showId: showId,
            cityId: cityId,
            cityName: cityName
          });
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'applyOrder',
    value: function applyOrder(type, lockSeatResultData) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        _this2.confirmOrderHandlerFrom(type, lockSeatResultData).then(function (data) {
          resolve(data);
        }, function (error) {
          reject(error);
        });
      });
    }
  }], [{
    key: 'defaultManager',
    value: function defaultManager() {
      return new TradeManager();
    }
  }, {
    key: 'tradeParasFromPlatform',
    value: function tradeParasFromPlatform(platform, platformData, filmId, filmName, cinemaId, cinemaName) {
      if (platform === 'wangpiao') {
        return {
          jbzFilmId: filmId,
          filmId: platformData.filmId,
          showId: platformData.showIndex,
          cinemaName: cinemaName,
          platformCinemaId: platformData.cinemaId,
          cinemaId: cinemaId
        };
      }

      if (platform === 'spider') {
        return {
          jbzFilmId: filmId,
          filmId: platformData.filmId,
          showId: platformData.showId,
          platformCinemaId: platformData.cinemaId,
          cinemaId: cinemaId
        };
      }

      if (platform === 'maizuo') {
        return {
          jbzFilmId: filmId,
          filmId: platformData.filmId,
          showId: platformData.foretellId,
          filmName: filmName,
          cinemaName: cinemaName,
          platformCinemaId: platformData.cinemaId,
          cinemaId: cinemaId
        };
      }

      if (platform === 'danche') {
        return {
          jbzFilmId: filmId,
          filmId: platformData.filmId,
          showId: platformData.id,
          platformCinemaId: platformData.cinemaId,
          cinemaId: cinemaId
        };
      }

      if (platform === 'maoyan' || platform === 'meituan' || platform === 'dazhong') {
        return {
          jbzFilmId: filmId,
          filmId: platformData.filmId,
          showId: platformData.showId,
          cinemaName: cinemaName,
          platformCinemaId: platformData.cinemaId,
          cinemaId: cinemaId
        };
      }

      if (platform === 'baidu') {
        return {
          showId: platformData.seqid,
          platformCinemaId: platformData.cinemaId,
          cinemaId: cinemaId
        };
      }

      if (platform === 'taobao') {
        return {
          jbzFilmId: filmId,
          filmId: platform.filmId,
          showId: platform.showId,
          cinemaName: cinemaName,
          platformCinemaId: platform.cinemaId,
          filmName: filmName,
          cinemaId: cinemaId
        };
      }
    }
  }]);
  return TradeManager;
}();

exports.default = TradeManager;