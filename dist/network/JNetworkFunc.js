"use strict";
/**
 * Created by cuppi on 2017/5/9.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @private
 */
var Jpara = function () {
    function Jpara() {
        var paras = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paras[_i] = arguments[_i];
        }
        this._paras = [];
        for (var _a = 0, paras_1 = paras; _a < paras_1.length; _a++) {
            var para = paras_1[_a];
            this._paras.push(para);
        }
        this.isJpara = true;
    }
    Jpara.prototype.items = function () {
        return this._paras;
    };
    Jpara.emptyPara = function () {
        return new Jpara();
    };
    return Jpara;
}();
/**
 * 辅助任务类
 * @private
 */
var Jtask = function () {
    function Jtask(task, parasPicker, resolve, reject) {
        this._task = task;
        this._resolve = resolve;
        this._reject = reject;
        this._parasPicker = parasPicker;
    }
    Jtask.prototype.setNextTask = function (task) {
        this._nextTask = task;
    };
    Jtask.prototype.do = function (paras) {
        var _this = this;
        paras = paras ? paras : this._parasPicker();
        this._task.apply(this, this.paraItems(paras)).then(function (data) {
            var nextPara = _this._resolve.apply(_this, [data].concat(_this.paraItems(paras)));
            if (_this._nextTask) {
                _this._nextTask.do(nextPara);
            }
        }, function (error) {
            if (_this._reject) {
                _this._reject.apply(_this, [error].concat(_this.paraItems(paras)));
            } else {
                console.log('ERROR: Don\'t find the error handler for task (' + _this._task.name + ')');
            }
        });
    };
    Jtask.prototype.paraItems = function (nextPara) {
        if (nextPara && nextPara.isJpara) {
            return nextPara.items();
        }
        return Jpara.emptyPara().items();
    };
    return Jtask;
}();
/**
 *
 * 任务连接类
 * @private
 */
var Jlink = function () {
    function Jlink() {
        var tasks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tasks[_i] = arguments[_i];
        }
        this._tasks = [];
        for (var _a = 0, tasks_1 = tasks; _a < tasks_1.length; _a++) {
            var task = tasks_1[_a];
            this._tasks.push(task);
        }
        this._taskIndex = 0;
    }
    Jlink.prototype.para = function (para) {
        this._headTaskPara = para;
        return this;
    };
    Jlink.prototype.paras = function () {
        var paras = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paras[_i] = arguments[_i];
        }
        this._allTaskPara = paras;
        return this;
    };
    Jlink.prototype.next = function (resolve, reject) {
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
    };
    Jlink.prototype.run = function () {
        this._headTask.do(this._parasPicker(0)());
        return this;
    };
    /**
     * 指定任务的paras的获取者 (目前实现会浪费内存，多个相同函数推入函数栈，后期优化）
     * @returns {Array}
     * @private
     */
    Jlink.prototype._parasPicker = function (index) {
        var _this = this;
        return function () {
            if (_this._allTaskPara && _this._allTaskPara.length > index) {
                return _this._allTaskPara[index];
            }
            if (index === 0 && _this._headTaskPara) {
                return _this._headTaskPara;
            }
            return Jpara.emptyPara();
        };
    };
    return Jlink;
}();
/**
 * 任务组合类
 * @private
 */
var Jcombine = function () {
    function Jcombine() {
        var tasks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tasks[_i] = arguments[_i];
        }
        this._tasks = [];
        for (var _a = 0, tasks_2 = tasks; _a < tasks_2.length; _a++) {
            var task = tasks_2[_a];
            this._tasks.push(task);
        }
        this._taskIndex = 0;
    }
    Jcombine.prototype.para = function (para) {
        this._headTaskPara = para;
        return this;
    };
    Jcombine.prototype.paras = function () {
        var paras = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paras[_i] = arguments[_i];
        }
        this._allTaskPara = paras;
        return this;
    };
    Jcombine.prototype.next = function (resolve, reject) {
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
    };
    Jcombine.prototype.run = function () {
        this._headTask.do(this._parasPicker(0)());
        return this;
    };
    return Jcombine;
}();
/**
 * 任务连接类
 * @alias other/jlink
 * @param tasks
 * @returns {Jlink}
 */
function jlink() {
    var tasks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tasks[_i] = arguments[_i];
    }
    return new (Jlink.bind.apply(Jlink, [void 0].concat(tasks)))();
}
exports.jlink = jlink;
/**
 * @private
 * @param paras
 * @returns {Jpara}
 */
function jpara() {
    var paras = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paras[_i] = arguments[_i];
    }
    return new (Jpara.bind.apply(Jpara, [void 0].concat(paras)))();
}
exports.jpara = jpara;
/**
 * @alias other/jcombine
 * @param tasks
 * @returns {Jcombine}
 */
function jcombine() {
    var tasks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tasks[_i] = arguments[_i];
    }
    return new (Jcombine.bind.apply(Jcombine, [void 0].concat(tasks)))();
}
//# sourceMappingURL=JNetworkFunc.js.map
