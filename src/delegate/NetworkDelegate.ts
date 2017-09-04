/**
 * Created by cuppi on 2017/9/4.
 */

import CityParas from "../paras/CityParas";
import CoordinateParas from '../paras/CoordinateParas';

abstract class NetworkDelegate{
  abstract coordinateParas(): CoordinateParas;
  abstract cityParas(): CityParas;
  abstract loginParas(): any;
}

export default NetworkDelegate;
