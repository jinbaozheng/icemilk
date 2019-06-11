import INetworkDelegate from "../interface/INetworkDelegate";
import {GlobalValueRegistry, ObjectPicker} from "../../types";

/**
 * @private
 */
class Jpara {
    _params: object[];
    isJpara: boolean;
    constructor(...params) {
        this._params = [];
        for (let para of params) {
            this._params.push(para);
        }
        this.isJpara = true;
    }

    items() {
        return this._params;
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
    _paramsPicker: Function;
    _nextTask: Jtask;

    constructor(task, paramsPicker, resolve, reject) {
        this._task = task;
        this._resolve = resolve;
        this._reject = reject;
        this._paramsPicker = paramsPicker;
    }

    setNextTask(task) {
        this._nextTask = task;
    }

    do(params) {
        params = params ? params : this._paramsPicker();
        this._task(...this.paraItems(params)).then(data => {
            let nextPara = this._resolve(data, ...this.paraItems(params));
            if (this._nextTask) {
                this._nextTask.do(nextPara);
            }
        }, error => {
            if (this._reject){
                this._reject(error, ...this.paraItems(params))
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

    params(...params) {
        this._allTaskPara = params;
        return this;
    }

    next(resolve, reject) {
        if (this._taskIndex >= this._tasks.length) {
            return this;
        }
        let nextTask = new Jtask(this._tasks[this._taskIndex], this._paramsPicker(this._taskIndex), resolve, reject);
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
        this._headTask.do(this._paramsPicker(0)());
        return this;
    }

    /**
     * 指定任务的params的获取者 (目前实现会浪费内存，多个相同函数推入函数栈，后期优化）
     * @returns {Array}
     * @private
     */
    _paramsPicker(index) {
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
//   _paramsPicker: Function;
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
//   params(...params) {
//     this._allTaskPara = params;
//     return this;
//   }
//
//   next(resolve, reject) {
//     if (this._taskIndex >= this._tasks.length) {
//       return this;
//     }
//     let nextTask = new Jtask(this._tasks[this._taskIndex], this._paramsPicker(this._taskIndex), resolve, reject);
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
//     this._headTask.do(this._paramsPicker(0)());
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
 * @param params
 * @returns {Jpara}
 */
function jparam(...params) {
    return new Jpara(...params);
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
 *
 * @param {GlobalValueRegistry | ((delegate: INetworkDelegate) => GlobalValueRegistry)} x
 * @return {x is (delegate: INetworkDelegate) => GlobalValueRegistry}
 */
function isGlobalValueRegistry(x: GlobalValueRegistry | ((delegate: INetworkDelegate) => GlobalValueRegistry)): x is ((delegate: INetworkDelegate) => GlobalValueRegistry){
    return typeof x === 'function';
}

function isGlobalValueRegistryObject(x: GlobalValueRegistry): x is object {
    return typeof x === 'object';
}

function isGlobalValueRegistryFunction(x: GlobalValueRegistry): x is ObjectPicker {
    return typeof x === 'function';
}

/**
 * 获取全局指定参数
 * @param extraValues 全局参数列表
 * @param delegate 全局代理
 * @param globalValueRegistryPicker 全局参数代理对象
 * @return {{}}
 */
function jgetGlobalValue(extraValues: (string|object)[],
                         delegate: INetworkDelegate,
                         globalValueRegistryPicker: GlobalValueRegistry | ((delegate: INetworkDelegate) => GlobalValueRegistry)): object{
    const jgetGlobalValueWithKey = (key) => {
        let otherValues = {};
        if (!globalValueRegistryPicker){
            throw new Error('未找到全局参数，请确认是否设置global代理');
        }

        let globalValueRegistry: GlobalValueRegistry;
        if (isGlobalValueRegistry(globalValueRegistryPicker)){
            globalValueRegistry = globalValueRegistryPicker(delegate);
        } else {
            globalValueRegistry = globalValueRegistryPicker as GlobalValueRegistry;
        }

        let globalParaFunc  = null;
        if (isGlobalValueRegistryObject(globalValueRegistry)){
            globalParaFunc = globalValueRegistry[key];
        }
        if (isGlobalValueRegistryFunction(globalValueRegistry)) {
            globalParaFunc = globalValueRegistry()[key];
        }

        if (globalParaFunc){
            let globalPara:any|string|number = null;
            if (typeof globalParaFunc == "function"){
                globalPara = globalParaFunc();
            } else {
                globalPara = globalParaFunc;
            }
            if (typeof globalPara == "object"){
                otherValues = {...otherValues, ...globalPara};
            } else if (typeof globalPara === 'string' || typeof globalPara === 'number'){
                otherValues[key] = globalPara;
            } else {
                throw new Error(`全局变量类型不正确:${key}`);
            }
        } else {
            throw new Error(`不存在的全局变量:${key}`);
        }
        return otherValues;
    };

    let globalOtherValues = {};
    extraValues.forEach(key => {
        if (typeof key == "object"){
            globalOtherValues = {...globalOtherValues, ...key};
        } else {
            if (!delegate) return;
            globalOtherValues = {...globalOtherValues, ...jgetGlobalValueWithKey(key)}
        }
    });
    return globalOtherValues;
}

export {jlink, jparam, jgetGlobalValue};
