/*
 * @Author: 一月
 * @Date: 2022-03-20
 * @LastEditTime: 2022-11-01
 * @Description: 生成字体文件入口。
 */
const svg2ttfLocal = require('./service/svg2ttfLocal');

async function main() {
    const text = '𫠠𫠡𫠢𫠣𫠤𫠥𫠦𫠧𫠨';
    await svg2ttfLocal(text);
}

main();
