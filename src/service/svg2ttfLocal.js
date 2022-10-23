/*
 * @Author: chengyuan
 * @Date: 2022-03-21
 * @LastEditTime: 2022-10-23
 * @Description: 从本地读取svg图片生成ttf字体文件服务
 */

const fs = require('fs');
const path = require('path');

const fontCarrier = require('wiki-font-carrier');

const svgPath = path.join(__dirname, '../static/svg');

/**
 * 获取字符的unicode编码
 * @param {string} str 要获取unicode编码的字符
 * @returns {string} 该字符的unicode编码
 */
function getUnicodeByChar(str) {
    let temp;
    let res = '';
    for (const val of str) {
        temp = val.codePointAt(0).toString(16);
        while (temp.length < 4) temp = '0' + temp;
        res += temp;
    }
    return res;
}

/**
 * 从本地获取svg图片
 * @param {string} svgUrl 对应的bos url
 * @returns {object} svg文件的buffer对象，失败返回null
 */
async function readSvg(svgUrl) {
    return new Promise((resolve, reject) => {
        fs.readFile(svgUrl, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                console.error(err.message);
                reject(err);
            }
        });
    });
}

/**
 * 根据输入的text字符串生成包含这些字符串的字体文件
 * @param {string} text 要生成字体的字符串
 * @returns {object} 返回字体文件的Buffer对象, 失败返回null
 */
const svg2ttfLocal = async function (text) {
    const transFont = fontCarrier.create();

    // 遍历每个字符生成该字的字体: 注意必须使用for of遍历字符串
    let promiseArr = [];
    let wordArr = [];
    for (const char of text) {
        const unicode = getUnicodeByChar(char);
        const svgUrl = `${svgPath}/u${unicode}.svg`;
        wordArr.push({
            char,
            unicode: unicode
        });
        promiseArr.push(readSvg(svgUrl));
    }
    const resArr = await Promise.allSettled(promiseArr);

    resArr.forEach((res, index) => {
        const {status, value} = res;
        const {char, unicode} = wordArr[index];
        if (status === 'fulfilled') {
            transFont.setGlyph(char, {
                glyphName: char,
                unicode: `&#x${unicode};`,
                horizAdvX: '2048',
                vertAdvY: '1050',
                svg: value.toString()
            });
        }
    });

    // 导出字体文件buffer
    const fontFile = transFont.output({
        types: ['ttf']
    });

    return fontFile.ttf;
};

module.exports = svg2ttfLocal;
