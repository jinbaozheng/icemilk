import JNetworkDelegate, {DEFAULT_DELEGATE} from "../delegate/JNetworkDelegate";

class JNetworkConfig {
    baseUrl: string;
    delegate: JNetworkDelegate;
    carryData: object | Function;
    timeout: number;
    static readonly DEFAULT_CONFIG: JNetworkConfig = {
        baseUrl: '',
        delegate: DEFAULT_DELEGATE,
        carryData: {},
        timeout: 10 * 1000
    }
}

export default JNetworkConfig;
