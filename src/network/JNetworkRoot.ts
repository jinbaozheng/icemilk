class JNetworkRoot{
    extraParams: Array<string|object> = [];
    extraHeaders: Array<string|object> = [];
    extraBodyData: Array<string|object> = [];

    useParams(...params: Array<string|object>): this {
        this.extraParams = params;
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

export const GLOBAL_TYPE = {
    GLOBAL_PARAMS: 'GLOBAL_PARAMS',
    GLOBAL_HEADERS: 'GLOBAL_HEADERS',
    GLOBAL_BODYDATA: 'GLOBAL_BODYDATA',
}
