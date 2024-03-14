const koa = require('koa')
const static = require('koa-static')

const userRouter = require('../router/userRouter')

const app = new koa()
app.use(static('./client'))

// CORS 方式解决跨域
app.use(async (ctx, next) => {
    // 1. 允许简单请求开启 CORS
    // ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5501') // 服务器开启 CORS

    // 2. 非简单请求开启下面的设置
    ctx.set('Access-Control-Allow-Header', 'Accept, AcceptEncoding, Connection, Host, Origin')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许跨域请求的时候携带 cookie
    ctx.set('Access-Control-Allow-Methods', 'PUT, DELETE, GET, POST, PATCH, OPTIONS')

    if (ctx.method === 'OPTIONS') {
        ctx.status = 204
    } else {
        await next()
    }
})

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(8000, () => {
    console.log('koa 服务器启动了.')
})