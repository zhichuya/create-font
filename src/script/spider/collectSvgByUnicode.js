/*
 * @Author: 一月
 * @Date: 2022-03-19
 * @LastEditTime: 2022-11-01
 * @Description: 根据unicode收集对应字的svg图片
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const color = require('../../config/logColor');
const getUnicodeByChar = require('../../utils/getUnicodeByChar');

// 网站地址
const BASE_URL = `http://zhs.glyphwiki.org/glyph/`;

async function collectSvgUnicode() {
    // 从收集的异体字font.txt文件中读取异体字。
    const filePath = path.join(__dirname, '../font.txt');
    const text = fs.readFileSync(filePath, 'utf8');
    let successNum = 0;
    let failNum = 0;
    let requestNum = 0;
    let failRequest = [];

    // 遍历所有的异体字,注意为了防止字符按字节切割错误只能使用for of遍历
    for (let char of text) {
        // 跳过已经爬取的前面34186、71947个字
        if (requestNum < 71947) {
            requestNum++;
            continue;
        }

        // 获取字对应的unicode码，拼接该字对应svg地址
        const unicode = getUnicodeByChar(char).slice(1);
        const fileName = `${unicode}.svg`;
        const svgUrl = BASE_URL + fileName;
        requestNum++;
        try {
            // 下载该字对应的svg图片
            const response = await axios.get(svgUrl, {
                responseType: 'arraybuffer'
            });

            // 按unicode+'.svg'保存图片
            fs.writeFile(path.join(__dirname, '../../static/svg' + fileName), response.data, function (err) {
                if (err) {
                    failNum++;
                    console.error(color.red, `save: ${svgUrl} fail`);
                }
                successNum++;
                console.log(color.green, `save: ${svgUrl} success`);
            });
        } catch (error) {
            console.error(color.red, `save: ${svgUrl} fail`);
            failRequest.push({
                index: requestNum,
                url: svgUrl,
                char: char,
                unicode: unicode
            });
        }
    }
    // 保存所有的失败日志
    fs.writeFile(path.join(__dirname, '../../log/fail.log'), JSON.stringify(failRequest), function (err) {
        if (err) {
            console.error(color.red, `save log fail`);
        }
        console.log(color.green, `save log success`);
    });
    console.log('完成了请求数：', requestNum);
    console.log('完成了成功数：', successNum);
    console.log('完成了失败数：', failNum);
}

collectSvgUnicode();
