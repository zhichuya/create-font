/*
 * @Author: 一月
 * @Date: 2022-03-19
 * @LastEditTime: 2022-11-01
 * @Description: 获取字符串的unicode编码
 */

function getUnicodeByChar(str) {
    let temp;
    let res = '';
    for (let val of str) {
        temp = val.codePointAt(0).toString(16);
        while (temp.length < 4) temp = '0' + temp;
        res += '\\u' + temp;
    }
    return res;
}

module.exports = getUnicodeByChar;
