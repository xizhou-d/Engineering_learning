const KoaRouter = require('@koa/router')

const userRouter = new KoaRouter({ prefix: '/users'} )

userRouter.get('/lists', (ctx, next) => {
    ctx.body = [
        { id: 111, name: 'xizhou', age: 18 },
        { id: 222, name: 'dongzhou', age: 20 },
        { id: 333, name: 'tang', age: 21 },
        { id: 444, name: 'ming', age: 44 }
    ]
})

module.exports = userRouter