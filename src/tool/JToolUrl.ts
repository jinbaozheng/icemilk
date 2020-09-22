import UrlPattern from 'url-pattern';

interface UrlOption {
    complete: boolean
}

interface CommonUrlObj {
    host: string
    href:string
    pathname: string
    protocol: string
    query: any
    hashpath: string
    hashquery: any
}

interface ComplexUrlObj extends CommonUrlObj{
    origin: string,
    hostname: string,
    port: string,
    search: string,
    username: string,
    password: string,
    hashsearch: string,
    hash: string
}

/**
 * 网络地址工具类
 */
class UrlTool {
    /**
     * 合成URL完整地址
     * @param baseUrl 基础地址
     * @param subUrl 相对地址
     * @param parameters 参数
     * @returns 返回拼接后的地址
     */
    static urlFromPortion(baseUrl: string, subUrl: string, parameters: object): string {
        if (!parameters) {
            parameters = {};
        }
        let params = [];
        for (let key in parameters) {
            if (!parameters.hasOwnProperty(key)) {
                continue;
            }
            if (parameters[key] !== undefined) {
                params.push(key + '=' + parameters[key]);
            }
        }
        let iUrl = baseUrl + subUrl;
        if (params.length > 0) {
            iUrl = iUrl + '?' + params.join('&');
        }
        return iUrl;
    }

    /**
     * 分析Url并解析为对象结构
     * @param url 待分析Url
     * @param options 分析Url配置
     * @return 返回解析后的结果，url无效时返回Null
     */
    static portionFromUrl(url: string, options?: UrlOption): CommonUrlObj | ComplexUrlObj{
        options = {
            complete: false,
            ...options
        };
        try {
            let urlObj = null;
            try{
                urlObj = new URL(url);
            } catch (e) {
                return null;
            }

            if (urlObj){
                const _getKV = (obj) => {
                    let queryMap = {};
                    if (obj){
                        for (let kv of obj.split('&')){
                            let kv_l = kv.split('=');
                            if (kv_l.length < 2) continue;
                            queryMap[kv_l[0]] = kv_l[1];
                        }
                    }
                    return queryMap;
                }
                let query = new UrlPattern(/^\??(.*)$/, ['query']).match(urlObj.search).query;
                let queryMap = _getKV(query);
                let hashObj = new UrlPattern(/^#?(([\w-]*(\/)?)+)?((\?)+(.*))?$/,
                    ['hashpath', '', '', 'hashsearch', '', '_hashsearch']).match(urlObj.hash);
                let hashMap = _getKV(hashObj._hashsearch);
                let p: any = {
                    host: urlObj.host,
                    href: urlObj.href,
                    pathname: urlObj.pathname,
                    protocol: urlObj.protocol,
                    query: queryMap,
                    hashpath: hashObj.hashpath,
                    hashquery: hashMap
                }
                if (options.complete){
                    p = {
                        ...p,
                        origin: urlObj.origin,
                        hostname: urlObj.hostname,
                        port: urlObj.port,
                        search: urlObj.search,
                        username: urlObj.username,
                        password: urlObj.password,
                        hashsearch: hashObj.hashsearch,
                        hash: urlObj.hash
                    }
                }
                return p;
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }
}

export default UrlTool;
