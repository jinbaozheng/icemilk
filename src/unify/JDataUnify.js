/**
 * Created by cuppi on 2017/5/15.
 */

import IcbcUnify from '../differentiation/icbc.network.unify';
import ShangHaiUnify from '../differentiation/shanghai.network.unify';
import IcmcUnify from '../differentiation/icmc.network.unify';

let _inType = '';
let _TYPE_OBJECT = {'ICBC-APP': IcbcUnify, 'SHANGHAI-APP': ShangHaiUnify, 'ICMC-APP':IcmcUnify};
let _VISIBLE_TYPE = Reflect.ownKeys(_TYPE_OBJECT);
export function UseConfig(inType) {
  if (_VISIBLE_TYPE.indexOf(inType) === -1) {
    console.log('ERROR: the inType value is non-existent, please look inType at config. \n the inType value is one of ( '
      + _VISIBLE_TYPE.join(', ')
      + ' )');
    return;
  }
  _inType = inType;
}

export default function (path, data, mark, otherHandle) {
  if (!data){
    return;
  }
  let unify = _TYPE_OBJECT[_inType];
  if (!unify){
    return {};
  }
  if (!unify.hasOwnProperty(path)){
    console.log('Can not find data unify for path:' + path + ', please contact the Author => cuppi');
    return {};
  }
  return unify[path](data, mark, otherHandle);

}
