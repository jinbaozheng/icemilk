/**
 * Created by cuppi on 2017/9/6.
 */

class JNetworkRoot{
  static _instance: any;
  otherParas: Array<string|object> = [];
  otherHeaders: Array<string|object> = [];

  static useParas(...paras: Array<string|object>) {
    let instance = this.instance();
    instance.otherParas = paras;
    return instance;
  }

  static useHeaders(...headers: Array<string|object>) {
    let instance = this.instance();
    instance.otherHeaders = headers;
    return instance;
  }

  static instance(): any {
    if (!this._instance) {
      this._instance = new this();
      this._instance.test = Math.random();
    }
    return this._instance;
  }
}

export default JNetworkRoot;
