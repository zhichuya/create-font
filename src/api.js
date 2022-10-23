/*
 * @Author: chengyuan
 * @Date: 2022-03-21
 * @LastEditTime: 2022-10-23
 * @Description: http接口服务，url中传入text参数，生成对应ttf文件
 */
const Koa = require('koa');
const cors = require('koa2-cors');
const svg2Font = require('./service/svg2ttfLocal');
const router = require('koa-router')();

const app = new Koa();

router.get('/', (ctx, next) => {
    ctx.body = '字体文件生成服务<br>访问 /createFont?text=𫠠𫠡𫠢𫠣𫠤𫠥𫠦𫠧𫠨 即可生成该字的字体文件.ttf';
});

router.get('/createFont', async (ctx, next) => {
    const query = ctx.request.query;
    const text = query.text;
    const file = await svg2Font(text);
    ctx.set('Content-disposition', 'attachment;filename=' + 'createFont.ttf');
    ctx.set('content-type', 'font/ttf');
    ctx.body = file;
});

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => {
    console.log('listen in http://localhost:8080');
});
