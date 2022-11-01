/*
 * @Author: chengyuan
 * @Date: 2022-03-19
 * @LastEditTime: 2022-11-01
 * @Description: 生成对应字符与svg 的对应关系到 sql中
 */

const path = require('path');
const fs = require('fs');
const util = require('util');

const logPath = 'sql.sql';
const logFile = fs.createWriteStream(logPath, {flags: 'a'});

// 终端输入重定向到文件中
console.log = function () {
    logFile.write(util.format.apply(null, arguments) + '\n');
    process.stdout.write(util.format.apply(null, arguments) + '\n');
};

/*
 * @Author: 一月
 * @Date: 2022-03-19
 * @LastEditTime: 2022-03-19
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

// 生成把字符和 svg对应的sql 语句到文件中
function generateSql() {
    const text = fs.readFileSync(path.join(__dirname, '../font.txt')).toString();
    let index = 0;
    for (const char of text) {
        let sql = '';
        let unicode = getUnicodeByChar(char);
        sql = `INSERT INTO \`character\`  (\`char\`, unicode, svgPath) VALUES ("${char}", "${unicode}", "http://localhost:3001/public/svg/${unicode}.svg");\n`;
        console.log(sql);
        index++;
    }
    // console.log(index); // 77603
}

generateSql();
