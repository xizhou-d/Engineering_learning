// 早期编写任务的方式（gulp4.x 之前）
const gulp = require('gulp')
// 编写简单的任务
const foo = (callback) => {
    console.log('第一个 gulp 任务')
    callback()
}

// 编写异步的 gulp 任务
const bar = (cb) => {
    setTimeout(() => {
        console.log('bar 任务被执行～')
        cb()
    }, 2000)
}

// 早期编写任务的方式（gulp4.x 之前）
// gulp.task('foo2', (callback) => {
//     console.log('第二个 gulp 任务')
//     callback()
// })

module.exports = {
    foo,
    bar
}

module.exports.default = (cb) => {
    console.log('default task exec~')
    cb()
}
