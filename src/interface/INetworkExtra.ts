export default interface INetworkExtra {
    useParas(...paras: Array<string|object>);
    useBodyData(...bodyData: Array<string|object>);
    useHeaders(...headers: Array<string|object>);
    extraParams: Array<string|object>;
    extraHeaders: Array<string|object>;
    extraBodyData: Array<string|object>;
}
