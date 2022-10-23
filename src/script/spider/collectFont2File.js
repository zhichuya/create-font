/*
 * @Author: chengyuan
 * @Date: 2022-03-19
 * @LastEditTime: 2022-10-23
 * @LastEditors: chengyuan06 chengyuan06@baidu.com
 * @Description: 收集所有的异体字到../font.txt文件中
 */
const urlMap = require('../../config/urlMap');
const fontPageSaveFile = require('./fontPageSaveFile');
const path = require('path');

/**
 * 收集所有的异体字到../font.txt文件中
 */
async function collectFont2File() {
    const urls = Object.values(urlMap);
    for (var i = 0; i < urls.length; i++) {
        const url = urls[i];
        await fontPageSaveFile(url, path.join(__dirname, '../font.txt'));
    }
}

collectFont2File();
