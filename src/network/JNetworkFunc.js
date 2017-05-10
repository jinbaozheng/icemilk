/**
 * Created by cuppi on 2017/5/9.
 */

class Jpara {
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
 */
class Jtask {
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
      let nextPara = this._resolve(data);
      if (this._nextTask) {
        this._nextTask.do(nextPara);
      }
    }, error => {
      console.log(error);
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
 * 任务连接类
 * return
 */
class Jlink {
  constructor(...tasks) {
    this._tasks = [];
    for (var task of tasks) {
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

/**
 * 任务组合类
 */
class Jcombine {
  constructor(...tasks) {
    this._tasks = [];
    for (var task of tasks) {
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

  re(resolve, reject) {
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

}

function jlink(...tasks) {
  return new Jlink(...tasks);
}


function jpara(...paras) {
  return new Jpara(...paras);
}

function jcombine(...tasks) {
  return new Jcombine(...tasks);
}

export {jlink, jpara};
