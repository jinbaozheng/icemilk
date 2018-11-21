import JRequester from "../network/JRequester";
import CancelPromiseFactory, {JPromise} from "../factory/CancelPromiseFactory";
import {AxiosResponse} from "axios";
import JNetworkError from "../network/JNetworkError";


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
    private readonly runList:any[] = [];
    private readonly reactor;
    constructor(){
        let reactor = new Reactor();
        this.reactor = reactor;
        reactor.registerEvent('requestCanLoad');
    }

    addRequest(request:JRequester): JPromise<any>{
        return CancelPromiseFactory.createJPromise((resolve, reject) => {
            let listener = (requesterId) => {
                console.log('dddd' + requesterId);
                if (request.requesterId === requesterId){
                    console.log('eeee');
                    request.request().then(data => {
                        resolve(data);
                        let lasReq = this.runList.shift();
                        if (lasReq){
                            this.reactor.dispatchEvent('requestCanLoad', lasReq.requesterId);
                            this.reactor.removeEventListener('requestCanLoad', listener);
                        } else {
                            this.isRunning = false;
                        }
                    }, error => {
                        reject(error)
                    })
                }
            }
            this.reactor.addEventListener('requestCanLoad', listener);
            if (!this.isRunning){
                this.isRunning = true;
                this.reactor.dispatchEvent('requestCanLoad', request.requesterId);
                this.reactor.removeEventListener('requestCanLoad', listener);
            } else {
                this.runList.push(request);
            }
        })
    }

    do(request: JRequester): Promise<any>{
        return new Promise((resolve, reject) => {
            request.request().then()
        });
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