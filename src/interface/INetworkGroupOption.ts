import JNetworkGroup from "../network/JNetworkGroup";
import {AxiosRequestConfig} from "axios";
import INetworkDelegate from "./INetworkDelegate";
export default interface INetworkGroupOption <T extends JNetworkGroup>{
    notClearExtraData: boolean,
    isSync: boolean,
    groupClass: new (...args: any[]) => T
}