/**
 * Created by cuppi on 2017/5/15.
 */

import ShangHaiUnify from '../differentiation/shanghai.network.unify';
import IcbcUnify from '../differentiation/icbc.network.unify';

let _inType = '';
let _VISIBLE_TYPE = ['ICBC-APP', 'SHANGHAI-APP'];

export function UseConfig(inType) {
  if (_VISIBLE_TYPE.indexOf(inType) === -1) {
    console.log('ERROR: the inType value is non-existent, please look inType at config. \n the inType value is one of ( '
      + _VISIBLE_TYPE.join(', ')
      + ' )');
    return;
  }
  _inType = inType;
}

export default function (path, data) {
  if (!data){
    return;
  }
  if (_inType === 'ICBC-APP') {
    return IcbcUnify[path](data);
  }

  if (_inType === 'SHANGHAI-APP') {
    return ShangHaiUnify[path](data);
  }
  return {};
}
