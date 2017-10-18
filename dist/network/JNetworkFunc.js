"use strict";
/**
 * Created by cuppi on 2017/5/9.
 */

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @private
 */

var Jpara = function () {
    function Jpara() {
        (0, _classCallCheck3.default)(this, Jpara);

        this._paras = [];

        for (var _len = arguments.length, paras = Array(_len), _key = 0; _key < _len; _key++) {
            paras[_key] = arguments[_key];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(paras), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var para = _step.value;

                this._paras.push(para);
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

        this.isJpara = true;
    }

    (0, _createClass3.default)(Jpara, [{
        key: "items",
        value: function items() {
            return this._paras;
        }
    }], [{
        key: "emptyPara",
        value: function emptyPara() {
            return new Jpara();
        }
    }]);
    return Jpara;
}();
/**
 * 辅助任务类
 * @private
 */


var Jtask = function () {
    function Jtask(task, parasPicker, resolve, reject) {
        (0, _classCallCheck3.default)(this, Jtask);

        this._task = task;
        this._resolve = resolve;
        this._reject = reject;
        this._parasPicker = parasPicker;
    }

    (0, _createClass3.default)(Jtask, [{
        key: "setNextTask",
        value: function setNextTask(task) {
            this._nextTask = task;
        }
    }, {
        key: "do",
        value: function _do(paras) {
            var _this = this;

            paras = paras ? paras : this._parasPicker();
            this._task.apply(this, (0, _toConsumableArray3.default)(this.paraItems(paras))).then(function (data) {
                var nextPara = _this._resolve.apply(_this, [data].concat((0, _toConsumableArray3.default)(_this.paraItems(paras))));
                if (_this._nextTask) {
                    _this._nextTask.do(nextPara);
                }
            }, function (error) {
                if (_this._reject) {
                    _this._reject.apply(_this, [error].concat((0, _toConsumableArray3.default)(_this.paraItems(paras))));
                } else {
                    console.log('ERROR: Don\'t find the error handler for task (' + _this._task.name + ')');
                }
            });
        }
    }, {
        key: "paraItems",
        value: function paraItems(nextPara) {
            if (nextPara && nextPara.isJpara) {
                return nextPara.items();
            }
            return Jpara.emptyPara().items();
        }
    }]);
    return Jtask;
}();
/**
 *
 * 任务连接类
 * @private
 */


var Jlink = function () {
    function Jlink() {
        (0, _classCallCheck3.default)(this, Jlink);

        this._tasks = [];

        for (var _len2 = arguments.length, tasks = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            tasks[_key2] = arguments[_key2];
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(tasks), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var task = _step2.value;

                this._tasks.push(task);
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

        this._taskIndex = 0;
    }

    (0, _createClass3.default)(Jlink, [{
        key: "para",
        value: function para(_para) {
            this._headTaskPara = _para;
            return this;
        }
    }, {
        key: "paras",
        value: function paras() {
            for (var _len3 = arguments.length, _paras = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                _paras[_key3] = arguments[_key3];
            }

            this._allTaskPara = _paras;
            return this;
        }
    }, {
        key: "next",
        value: function next(resolve, reject) {
            if (this._taskIndex >= this._tasks.length) {
                return this;
            }
            var nextTask = new Jtask(this._tasks[this._taskIndex], this._parasPicker(this._taskIndex), resolve, reject);
            this._taskIndex++;
            if (this._nextTask) {
                this._nextTask.setNextTask(nextTask);
            } else {
                this._headTask = nextTask;
            }
            this._nextTask = nextTask;
            return this;
        }
    }, {
        key: "run",
        value: function run() {
            this._headTask.do(this._parasPicker(0)());
            return this;
        }
        /**
         * 指定任务的paras的获取者 (目前实现会浪费内存，多个相同函数推入函数栈，后期优化）
         * @returns {Array}
         * @private
         */

    }, {
        key: "_parasPicker",
        value: function _parasPicker(index) {
            var _this2 = this;

            return function () {
                if (_this2._allTaskPara && _this2._allTaskPara.length > index) {
                    return _this2._allTaskPara[index];
                }
                if (index === 0 && _this2._headTaskPara) {
                    return _this2._headTaskPara;
                }
                return Jpara.emptyPara();
            };
        }
    }]);
    return Jlink;
}();
/**
 * 任务组合类
 * @private
 */
// class Jcombine {
//   _tasks: Function[];
//   _headTaskPara: object;
//   _taskIndex: number;
//   _parasPicker: Function;
//   _headTask: Jtask;
//
//   constructor(...tasks) {
//     this._tasks = [];
//     for (var task of tasks) {
//       this._tasks.push(task);
//     }
//     this._taskIndex = 0;
//   }
//
//   para(para) {
//     this._headTaskPara = para;
//     return this;
//   }
//
//   paras(...paras) {
//     this._allTaskPara = paras;
//     return this;
//   }
//
//   next(resolve, reject) {
//     if (this._taskIndex >= this._tasks.length) {
//       return this;
//     }
//     let nextTask = new Jtask(this._tasks[this._taskIndex], this._parasPicker(this._taskIndex), resolve, reject);
//     this._taskIndex++;
//     if (this._nextTask) {
//       this._nextTask.setNextTask(nextTask);
//     } else {
//       this._headTask = nextTask;
//     }
//     this._nextTask = nextTask;
//     return this;
//   }
//
//   run() {
//     this._headTask.do(this._parasPicker(0)());
//     return this;
//   }
// }
/**
 * 任务连接类
 * @alias other/jlink
 * @param tasks
 * @returns {Jlink}
 */


function jlink() {
    for (var _len4 = arguments.length, tasks = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        tasks[_key4] = arguments[_key4];
    }

    return new (Function.prototype.bind.apply(Jlink, [null].concat(tasks)))();
}
exports.jlink = jlink;
/**
 * @private
 * @param paras
 * @returns {Jpara}
 */
function jpara() {
    for (var _len5 = arguments.length, paras = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        paras[_key5] = arguments[_key5];
    }

    return new (Function.prototype.bind.apply(Jpara, [null].concat(paras)))();
}
exports.jpara = jpara;
//# sourceMappingURL=JNetworkFunc.js.map
