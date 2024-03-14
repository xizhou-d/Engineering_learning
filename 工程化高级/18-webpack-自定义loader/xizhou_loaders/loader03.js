module.exports = function(content) {
    console.log('content3', content)

    // this 绑定对象
    // 获取到同步的 callback
    // const callback = this.callback
    // 获取到异步的 callback
    const callback = this.async()

    // 进行异步操作：无效的，不要这样做
    setTimeout(() => {
        callback(null, content + 'aaa')
    }, 2000)
    
    // callback 进行调用：
    // 参数一：错误信息
    // 参数二：传给下一个 loader 的内容
    // callback(null, '哈哈哈哈')
}

// 同步 loader
// module.exports = function(content) {
//     console.log('content3', content)

//     return content + 'aaa'
// }

// module.exports.pitch = function() {
//     console.log('loader pitch 03')
// }