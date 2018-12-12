export default interface INetworkExtra {
    useParas(...paras: Array<string|object>);
    useHeaders(...headers: Array<string|object>);
    extraParas: Array<string|object>;
    extraHeaders: Array<string|object>;
}
