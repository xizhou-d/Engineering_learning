// koa 搭建 api 服务器
const Koa = require('koa')

const app = new Koa()

const userRouter = require('./router/usersRouter')

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(9000, () => {
    console.log('koa 服务器已经启动了～')
})