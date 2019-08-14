import {AxiosRequestConfig} from "axios";
export default interface INetworkOtherOption extends AxiosRequestConfig{
    notTransformData: boolean;
    specific: any;
    ignore: any;
}
