/*
 * @Author: 一月
 * @Date: 2022-03-19
 * @LastEditTime: 2022-11-01
 * @Description: 获取所有扩展区的url对象
 */

const axios = require('axios');
const cheerio = require('cheerio');
const BASE_URL = 'http://www.rendao.com/';

// 获取字海网统计的所有扩展区url
async function getUrlMap() {
    const res = await axios.get(BASE_URL + 'zsts.htm');
    const html = res.data;
    const $ = cheerio.load(html);
    const aLink = $('table:nth-child(2) tr td:nth-child(1) a');
    let pages = {};
    aLink.each((_, item) => {
        var title = $(item).text();
        var url = BASE_URL + $(item).attr('href');
        pages[title] = url;
    });
    return pages;
}

module.exports = {
    getUrlMap
};
