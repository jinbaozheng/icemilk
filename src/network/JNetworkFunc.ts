/**
 * Created by cuppi on 2017/5/9.
 */

/**
 * @private
 */
class Jpara {
    _paras: object[];
    isJpara: boolean;
    constructor(...paras) {
        this._paras = [];
        for (let para of paras) {
            this._paras.push(para);
        }
        this.isJpara = true;
    }

    items() {
        return this._paras;
    }

    static emptyPara() {
        return new Jpara();
    }
}

/**
 * 辅助任务类
 * @private
 */
class Jtask {
    _task: Function;
    _resolve: Function;
    _reject: Function;
    _parasPicker: Function;
    _nextTask: Jtask;

    constructor(task, parasPicker, resolve, reject) {
        this._task = task;
        this._resolve = resolve;
        this._reject = reject;
        this._parasPicker = parasPicker;
    }

    setNextTask(task) {
        this._nextTask = task;
    }

    do(paras) {
        paras = paras ? paras : this._parasPicker();
        this._task(...this.paraItems(paras)).then(data => {
            let nextPara = this._resolve(data, ...this.paraItems(paras));
            if (this._nextTask) {
                this._nextTask.do(nextPara);
            }
        }, error => {
            if (this._reject){
                this._reject(error, ...this.paraItems(paras))
            } else {
                console.log('ERROR: Don\'t find the error handler for task (' + this._task.name  + ')');
            }
        });
    }

    paraItems(nextPara) {
        if (nextPara && nextPara.isJpara) {
            return nextPara.items();
        }
        return Jpara.emptyPara().items();
    }
}

/**
 *
 * 任务连接类
 * @private
 */
class Jlink {
    _tasks: Jtask[];
    _headTaskPara: object;
    _allTaskPara: object[];
    _headTask: Jtask;
    _nextTask: Jtask;
    _taskIndex: number;

    constructor(...tasks) {
        this._tasks = [];
        for (let task of tasks) {
            this._tasks.push(task);
        }
        this._taskIndex = 0;
    }

    para(para) {
        this._headTaskPara = para;
        return this;
    }

    paras(...paras) {
        this._allTaskPara = paras;
        return this;
    }

    next(resolve, reject) {
        if (this._taskIndex >= this._tasks.length) {
            return this;
        }
        let nextTask = new Jtask(this._tasks[this._taskIndex], this._parasPicker(this._taskIndex), resolve, reject);
        this._taskIndex++;
        if (this._nextTask) {
            this._nextTask.setNextTask(nextTask);
        } else {
            this._headTask = nextTask;
        }
        this._nextTask = nextTask;
        return this;
    }

    run() {
        this._headTask.do(this._parasPicker(0)());
        return this;
    }

    /**
     * 指定任务的paras的获取者 (目前实现会浪费内存，多个相同函数推入函数栈，后期优化）
     * @returns {Array}
     * @private
     */
    _parasPicker(index) {
        return () => {
            if (this._allTaskPara && this._allTaskPara.length > index) {
                return this._allTaskPara[index];
            }
            if (index === 0 && this._headTaskPara) {
                return this._headTaskPara;
            }
            return Jpara.emptyPara();
        }
    }
}

// let pro1 = () => {
//     return new Promise()
// };
//
// let pro2 = () => {
//     return new Promise
// };
// let l = jlink(pro1, pro2).next(
//     (data) => {
//         console.log(data);
//     },
//     error => {
//         console.log(error);
//     }).next(
//     (data) => {
//         console.log(data);
//     },
//     error => {
//         console.log(error);
//     }
// ).run();

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
function jlink(...tasks) {
    return new Jlink(...tasks);
}

/**
 * @private
 * @param paras
 * @returns {Jpara}
 */
function jpara(...paras) {
    return new Jpara(...paras);
}

/**
 * @alias other/jcombine
 * @param tasks
 * @returns {Jcombine}
 */
// function jcombine(...tasks) {
//   return new Jcombine(...tasks);
// }

/**
 * 获取全局指定参数
 * @param key 指定键
 * @param globalValueRegistry 全局参数代理对象
 * @return {{}}
 */
function jgetGlobalValue(key, globalValueRegistry){
    let otherParas = {};
    if (!globalValueRegistry){
        throw new Error('未找到全局参数，请确认是否设置global代理');
    }
    let globalParaFunc = null;
    if (typeof globalValueRegistry == "function"){
        globalParaFunc = globalValueRegistry()[key];
    } else if (typeof globalValueRegistry == "object") {
        globalParaFunc = globalValueRegistry[key];
    }

    if (globalParaFunc){
        let globalPara:any|string|number = null;
        if (typeof globalParaFunc == "function"){
            globalPara = globalParaFunc();
        } else {
            globalPara = globalParaFunc;
        }
        if (typeof globalPara == "object"){
            otherParas = {...otherParas, ...globalPara};
        } else if (typeof globalPara === 'string' || typeof globalPara === 'number'){
            otherParas[key] = globalPara;
        } else {
            throw new Error(`全局变量类型不正确:${key}`);
        }
    } else {
        throw new Error(`不存在的全局变量:${key}`);
    }
    return otherParas;
}

export {jlink, jpara, jgetGlobalValue};
