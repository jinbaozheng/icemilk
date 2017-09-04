"use strict";
/**
 * Created by cuppi on 2017/5/15.
 */

Object.defineProperty(exports, "__esModule", { value: true });
// import IcbcUnify from '../differentiation/icbc.network.unify';
// import ShangHaiUnify from '../differentiation/shanghai.network.unify';
// import IcmcUnify from '../differentiation/icmc.network.unify';
var _dataMap = {};
function UseConfig(dataMap) {
    // if (_VISIBLE_TYPE.indexOf(inType) === -1) {
    //   console.log('ERROR: the inType value is non-existent, please look inType at config. \n the inType value is one of ( '
    //     + _VISIBLE_TYPE.join(', ')
    //     + ' )');
    //   return;
    // }
    _dataMap = dataMap;
}
exports.UseConfig = UseConfig;
function default_1(path, data, mark, otherHandle) {
    if (!data) {
        return;
    }
    var unify = _dataMap;
    if (!unify) {
        return {};
    }
    if (!unify.hasOwnProperty(path)) {
        console.log('Can not find data unify for path:' + path + ', please contact the Author => cuppi');
        return {};
    }
    return unify[path](data, mark, otherHandle);
}
exports.default = default_1;
//# sourceMappingURL=JDataUnify.js.map
