import JToolFunction from "../tool/JToolFunction";

const decimalAdjust = JToolFunction.curry(function (type, value, exp = 0) {
    if (+exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // 如果 value 或 exp 为非数字时，返回NaN
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // 根据 exp 基数进行取整得到 忽略 exp基数的 有效数字 eg: 1544 => 15 exp=2
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // 根据 exp 技术复原最终数字 eg: 15 => 1500
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}, 2);
const roundDecimalAdjust = decimalAdjust('round');

/**
 * 返回可以让 doublelist 中所有的浮点数变成整数的10的次幂乘子 eg: 0.123 => 3 因为 0.123 => 1000 => 10^3 => 3
 * @param doubleList 需要变成整数的浮点数链表
 * @return 10的倍数的乘子
 */
function maxMultiplyToInteger(doubleList): number {
    let maxMultiplier = 0;
    for (let double of doubleList){
        const double = doubleList[0]
        const doubleStr = double.toString();
        const splitedDouble = doubleStr.split('.');
        const decLength = splitedDouble[1].length;
        maxMultiplier = Math.max(maxMultiplier, decLength);
    }
    return maxMultiplier
}

function _add(doubleList, multer) {
    let sum = 0;
    let exp = Math.pow(10, multer);
    doubleList.map((double) => {
        sum += roundDecimalAdjust(double*exp)
    });
    return sum/exp;
}

function getNum(price: number | Number | Price){
    if (typeof price === 'number'){
        return price;
    }
    if (price instanceof Number){
        return price.valueOf()
    }
    if (price instanceof Price){
        return price.value
    }
    return NaN
}

class Price{
    private _priceNum: number;
    private _priceStr: string;

    static ZERO: Price = new Price(0);

    constructor(number) {
        this._priceNum = Number(number);
        this._priceStr = String(number);
    }

    get value(){
        return this._priceNum
    }

    static add(...numbers){
        return numbers.reduce((acc, cur) => acc.add(cur), Price.ZERO)
    }

    add(number: number | Price | Number){
        const doubleList = [this.value, getNum(number)];
        const maxMulter = maxMultiplyToInteger(doubleList);
        return new Price(_add(doubleList, maxMulter));
    }

    discount(){
    }

    /**
     * 格式化金额
     * @param floatMode 小数保留情况 (cents 保留分, clear 根据数值保留) eg:  cents 10.1 => 10.10, clear 10.1 => 10.1
     * @param segment
     */
    format(floatMode: 'cents' | 'clear' = 'clear', segment: boolean = false): string{
        let [interger, double] = this.toString().split('.');
        if (double !== undefined){
            if (floatMode === 'cents'){
                double = double.padEnd(2, '0');
            }
        }
        if (segment){
            let intergerList = interger.split(''), space = 1;
            for (let i = intergerList.length - 1; i >=0; i--, space++){
                if (space === 3 && i !== 0){
                    space = 0;
                    intergerList.splice(i, 0, ',')
                }
            }
            interger = intergerList.join('');
        }
        return double ? [interger, double].join('.') : interger;
    }

    valueOf(){
        return this._priceNum;
    }

    toString(){
        return this._priceStr;
    }
}

export default Price;
