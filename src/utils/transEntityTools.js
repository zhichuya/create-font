/*
 * @Author: 一月
 * @Date: 2022-03-19
 * @LastEditTime: 2022-11-01
 * @Description: 实体字符与普通字符互转工具
 */

/**
 * 实体字符转为普通字符
 * @param {string} entity
 * @returns {string}
 */
function entityToString(entity) {
    let entities = entity.split(';');
    entities.pop();
    let result = '';
    for (let i = 0; i < entities.length; i++) {
        let num = entities[i].trim().slice(2);
        //10进制还是16进制
        if (num[0] === 'x') {
            num = parseInt(num.slice(1), 16);
        } else {
            num = parseInt(num);
        }
        result += String.fromCharCode(num);
    }
    return result;
}

/**
 * 普通字符转实体字符
 * @param {string} str 字符
 * @param {number} radix 实体进制，默认10
 * @returns {string} 回实体默认10进制，也可以选择16进制
 */
function stringToEntity(str, radix = 0) {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push((!radix ? '&#' + str.charCodeAt(i) : '&#x' + str.charCodeAt(i).toString(16)) + ';');
    }
    let result = arr.join('');
    return result;
}

module.exports = {
    stringToEntity,
    entityToString
};
