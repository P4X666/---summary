const Koa = require('koa');
const path = require('path')

const app = new Koa();
const static = require('koa-static')   //静态资源服务插件

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 配置静态资源
const staticPath = '/source'
app.use(static(
    path.join( __dirname, staticPath)
))

app.listen(3000, '127.0.0.1', () => {
    console.log('server is running on local')
});
