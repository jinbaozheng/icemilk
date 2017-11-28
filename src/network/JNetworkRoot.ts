/**
 * Created by cuppi on 2017/9/6.
 */
import JNetwork from './JNetwork';
import _ from '../unify/JDataUnify';

class JNetworkRoot{
  otherParas: Array<string|object> = [];
  otherHeaders: Array<string|object> = [];
  static _instance: any;

  static useParas(...paras: Array<string|object>) {
    let instance = new this();
    instance.otherParas = paras;
    return instance;
  }

  static useHeaders(...headers: Array<string|object>) {
    let instance = new this();
    instance.otherHeaders = headers;
    return instance;
  }

  useParas(...paras: Array<string|object>): JNetworkRoot {
    this.otherParas = paras;
    return this;
  }

  useHeaders(...headers: Array<string|object>): JNetworkRoot {
    this.otherHeaders = headers;
    return this;
  }

  static instance(): any {
    if (!this._instance) {
      this._instance = new this();
      this._instance.test = Math.random();
    }
    return this._instance;
  }

  prefixPromise(url, paras?: object, headers?: object, options?: object){
    return JNetwork.useParas(...this.otherParas).useHeaders(...this.otherHeaders).POST(url, paras, headers).then(data => {
      return data;
    });
  }
}

export default JNetworkRoot;
