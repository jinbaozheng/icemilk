/**
 * Created by cuppi on 2017/5/15.
 */

let _dataMap: object = {};
export function UseConfig(dataMap) {
  // if (_VISIBLE_TYPE.indexOf(inType) === -1) {
  //   console.log('ERROR: the inType value is non-existent, please look inType at config. \n the inType value is one of ( '
  //     + _VISIBLE_TYPE.join(', ')
  //     + ' )');
  //   return;
  // }
  _dataMap = dataMap;
}

export default function (path: string, data: object, mark?: number, otherHandle?: object) {
  if (!data){
    return;
  }
  let unify = _dataMap;
  if (!unify){
    return {};
  }
  if (!unify.hasOwnProperty(path)){
    console.log('Can not find data unify for path:' + path + ', please contact the Author => cuppi');
    return {};
  }
  return unify[path](data, mark, otherHandle);
}
