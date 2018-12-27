/**
 * Created by cuppi on 2017/9/6.
 */

class JNetworkRoot{
    extraParams: Array<string|object> = [];
    extraHeaders: Array<string|object> = [];
    extraBodyData: Array<string|object> = [];

    useParas(...paras: Array<string|object>): this {
        this.extraParams = paras;
        return this;
    }

    useHeaders(...headers: Array<string|object>): this {
        this.extraHeaders = headers;
        return this;
    }

    useBodyData(...bodyData: Array<string|object>): this {
        this.extraBodyData = bodyData;
        return this;
    }

    clearExtraData(){
        this.extraParams = [];
        this.extraHeaders = [];
        this.extraBodyData = [];
    }
}

export default JNetworkRoot;
