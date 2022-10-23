/*
 * @Author: chengyuan
 * @Date: 2022-03-19
 * @LastEditTime: 2022-03-19
 * @Description: 获取指定扩展区的字体并且写入文件中
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * 保存url中异体字到path文件中
 * @param {string} url
 * @param {string} path
 */
async function fontPageSaveFile(url, path) {
    const res = await axios.get(url);
    const html = res.data;
    const $ = cheerio.load(html);
    const text = $('center table tbody tr td').text().trim();
    fs.appendFile(path, text, function (err) {
        if (err) {
            console.log(`this page "${url}" has error`);
        }
    });
}

module.exports = fontPageSaveFile;
