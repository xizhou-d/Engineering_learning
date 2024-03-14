const KoaRouter = require('@koa/router')

const userRouter = new KoaRouter({ prefix: '/users' })

userRouter.get('/list', (ctx, next) => {
    console.log('ctx.headers', ctx.headers)
    ctx.body = [
        { name: 'xizhou', age: 20, score: 99 },
        { name: 'dongzhou', age: 220, score: 9966 },
        { name: 'datang', age: 340, score: 978 }
    ]
})

module.exports = userRouter