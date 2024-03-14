const babel = require('@babel/core')

module.exports = function(content) {
    // 1. 使用异步 loader
    const callback = this.async()

    // 2. 获取 options
    let options = this.getOptions()
    if (!Object.keys(options).length) {
        options = require('../babel.config.js')
    }

    // 使用 babel 转换代码
    babel.transform(content, options, (error, result) => {
        if (error) {
            callback(error)
        } else {
            // babel 转换后的代码在 code 中
            callback(null, result.code)
        }
    })
    // 因为在回调函数中拿到的结果，没法直接返回所以需要使用异步 loader
    // return content
}