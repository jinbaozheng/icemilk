/** eslint-disable **/
// Link to - https://github.com/then/promise/blob/master/src/core.js
'use strict';

// var asap = require('asap/raw');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};

/**
 * 安全获取指定对象的下一个then回调
 * @param obj 指定对象
 * @return {error|undefined} 如果获取失败，则放回错误
 */
function getThen(obj) {
    try {
        return obj.then;
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

/**
 * 安全执行方法 通过一个参数
 * @param fn 需要执行的方法
 * @param a 参数
 * @return {error|vale} 如果执行报错，则返回错误，否则返回执行后的返回值
 */
function tryCallOne(fn, a) {
    try {
        return fn(a);
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

/**
 * 安全执行方法 通过两个参数
 * @param fn 需要执行的方法
 * @param a 参数1
 * @param b 参数2
 * @return {error|undefined} 如果执行报错，则返回错误，否则无返回值
 */
function tryCallTwo(fn, a, b) {
    try {
        fn(a, b);
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

// module.exports = JPromise;

/**
 * JPromise 构造方法
 * @param fn
 * @constructor
 */
function JPromise(fn) {
    if (typeof this !== 'object') {
        throw new TypeError('JPromises must be constructed via new');
    }
    if (typeof fn !== 'function') {
        throw new TypeError('JPromise constructor\'s argument is not a function');
    }
    // 当前promise链中的状态
    this._state = 0;
    // 当前promise链中存储的最终值
    this._value = null;
    this._deferredState = 0;
    // 当前promise链所有的待处理Handler对象列表
    this._deferreds = null;
    if (fn === noop) return;
    doResolve(fn, this);
}
// JPromise handle监听器
JPromise._onHandle = null;
// JPromise reject监听器
JPromise._onReject = null;
JPromise._noop = noop;

JPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.constructor !== JPromise) {
        return safeThen(this, onFulfilled, onRejected);
    }
    var res = new JPromise(noop);
    handle(this, new Handler(onFulfilled, onRejected, res));
    return res;
};

function safeThen(self, onFulfilled, onRejected) {
    return new self.constructor(function (resolve, reject) {
        var res = new JPromise(noop);
        res.then(resolve, reject);
        handle(self, new Handler(onFulfilled, onRejected, res));
    });
}

/**
 * 处理方法指定promise链
 * @param self 当前promise对象
 * @param deferred 待处理的Handler对象列表
 */
function handle(self, deferred) {
    // 一直向promise链末尾移动，直到发现某个promise的最终状态不是依赖于它的下一个promise
    while (self._state === 3) {
        self = self._value;
    }
    // 如果JPromise有全局的handle监听器，进行回调
    if (JPromise._onHandle) {
        JPromise._onHandle(self);
    }
    // 如果promise处于混沌状态
    if (self._state === 0) {
        if (self._deferredState === 0) {
            self._deferredState = 1;
            self._deferreds = deferred;
            return;
        }
        if (self._deferredState === 1) {
            self._deferredState = 2;
            self._deferreds = [self._deferreds, deferred];
            return;
        }
        self._deferreds.push(deferred);
        return;
    }
    // promise已经确定状态，进行处理
    handleResolved(self, deferred);
}

/**
 * 处理当前promise与它下一个相关promise - 可能引起递归过程
 * @param self 当前promise
 * @param deferred 它的下一个相关promise
 */
function handleResolved(self, deferred) {
    /**********************************************************/
    /*************         进行异步处理           ***************/
    /**********************************************************/
    setTimeout(function() {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
            if (self._state === 1) {
                resolve(deferred.promise, self._value);
            } else {
                reject(deferred.promise, self._value);
            }
            return;
        }
        var ret = tryCallOne(cb, self._value);
        if (ret === IS_ERROR) {
            reject(deferred.promise, LAST_ERROR);
        } else {
            resolve(deferred.promise, ret);
        }
    }, 0);
}

/**
 * 执行指定JPromise的resolve
 * @param self 当前promise引用
 * @param newValue resolve用到的回调参数 - 类似 resolve('aaa') 中的 'aaa'
 * @note newValue 可能是JPromise
 */
function resolve(self, newValue) {
    // JPromise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self) {
        return reject(
            self,
            new TypeError('A promise cannot be resolved with itself.')
        );
    }
    // newValue 是否是个合法值
    if (
        newValue &&
        (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
        var then = getThen(newValue);
        if (then === IS_ERROR) {
            return reject(self, LAST_ERROR);
        }
        // 确定是否还是一个JPromise
        if (
            then === self.then &&
            newValue instanceof JPromise
        ) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
        // 确定是否还是一个thenable对象
        } else if (typeof then === 'function') {
            doResolve(then.bind(newValue), self);
            return;
        }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
}

/**
 * 执行指定JPromise的reject
 * @param self 当前promise引用
 * @param newValue reject用到的回调参数 - 类似 reject(err) 中的 err
 */
function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    if (JPromise._onReject) {
        JPromise._onReject(self, newValue);
    }
    finale(self);
}

function finale(self) {
    console.log(self._deferredState);
    if (self._deferredState === 1) {
        handle(self, self._deferreds);
        self._deferreds = null;
    }
    if (self._deferredState === 2) {
        for (var i = 0; i < self._deferreds.length; i++) {
            handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
    }
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
/**
 * 执行fn方法并对promise的回调进行注入 - let promise = new JPromise(fn(resolve, reject) => {})
 * @param fn
 * @param promise
 */
function doResolve(fn, promise) {
    var done = false;
    var res = tryCallTwo(fn, function (value) {
        if (done) return;
        done = true;
        resolve(promise, value);
    }, function (reason) {
        if (done) return;
        done = true;
        reject(promise, reason);
    });
    if (!done && res === IS_ERROR) {
        done = true;
        reject(promise, LAST_ERROR);
    }
}

/**
 * 处理类构造方法
 * @param onFulfilled 成功回调方法
 * @param onRejected 失败回调方法
 * @param promise promise类
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise){
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
}

/** eslint-enable **/
