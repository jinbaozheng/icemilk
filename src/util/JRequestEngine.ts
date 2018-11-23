import JRequester from "../network/JRequester";
import CancelPromiseFactory, {JPromise} from "../factory/CancelPromiseFactory";
import {AxiosResponse} from "axios";
import JNetworkError from "../network/JNetworkError";
import {listeners} from "cluster";


class Event{
    name: string;
    callbacks: any[];
    constructor(name){
        this.name = name;
        this.callbacks = [];
    }
    registerCallback(callback){
        this.callbacks.push(callback);
    }
    removeCallback(callback){
        this.callbacks = this.callbacks.filter(c => {
            return c !== callback
        })
    }
}

class Reactor{
    events: object;
    constructor(){
        this.events = {};
    }
    registerEvent(eventName){
        this.events[eventName] = new Event(eventName);
    }

    dispatchEvent(eventName, eventArgs){
        console.log('***************')
        this.events[eventName].callbacks.forEach((callback) => {
            callback(eventArgs);
        });
    }

    addEventListener(eventName, callback){
        console.log('+++++++++++++++')
        this.events[eventName].registerCallback(callback);
    }

    removeEventListener(eventName, callback){
        this.events[eventName].removeCallback(callback);
    }
}

export default class JRequestEngine {
    isRunning:boolean = false;
    private readonly runQueue:any[] = [];

    // private readonly reactor;
    constructor(){
        // let reactor = new Reactor();
        // this.reactor = reactor;
        // reactor.registerEvent('requestCanLoad');
    }

    _pushRunQueue(request: JRequester, resolve, reject){
        this.runQueue.push({
            request,
            resolve,
            reject
        });
    }

    _popRunQueue(){
       let task = this.runQueue.shift();
       return task;
    }

    addRequest(request:JRequester): JPromise<any>{
        return CancelPromiseFactory.createJPromise((resolve, reject) => {
            if (!this.isRunning){
                this.isRunning = true;
                this.do(request, resolve, reject);
            } else {
                this._pushRunQueue(request, resolve, reject)
            }
        })
    }

    do(request: JRequester, resolve, reject){
        console.log('开始请求');
        request.request().then(data => {
             console.log('结束请求');
             resolve(data);
             console.log('处理完数据');
             let task = this._popRunQueue();
             if (task){
                 this.do(task.request, task.resolve, task.reject);
             } else {
                 this.isRunning = false;
             }
        }, error => {
            reject(error)
        })
    }

    // async do(){
    //     if (this.isRunning){
    //         return;
    //     }
    //     this.isRunning = true;
    //     let lastRequest;
    //     while (lastRequest = this.runList.shift()){
    //         await lastTask();
    //         this.emitCompleteCallback()
    //     }
    //     this.isRunning = false;
    // }
}