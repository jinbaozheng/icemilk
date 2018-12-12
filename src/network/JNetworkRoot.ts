/**
 * Created by cuppi on 2017/9/6.
 */
import JNetwork from './JNetwork';

class JNetworkRoot extends JNetwork{
    /**
     * 便捷添加全局paras及headers
     * @deprecated
     * @param url
     * @param {object} paras
     * @param {object} headers
     * @param {object} options
     * @return {Promise<AxiosResponse>}
     */
    prefixPromise(url, paras?: object, headers?: object, options?: object){
        console.warn('the Function <prefixPromise> is deprecated since icemilk-1.0.1, please use freedomPOST or POST method instead of.');
        return this.useParas(...this.extraParas).useHeaders(...this.extraHeaders).POST(url, paras, headers).then(data => {
            return data;
        });
    }
}

export default JNetworkRoot;
