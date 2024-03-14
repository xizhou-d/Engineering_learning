const { validate } = require('schema-utils')
const loader04Scheme = require('./schema/loader04_schema.json')
 
module.exports = function(content) {
    // 1. 获取使用 loader 时， 传递进来的参数
    // 方式一：早期时需要单独使用 loader-utils(webpack开发)的库莱获取参数
    // 方式二：目前已经可以直接通过 this.getOptions() 直接获取到参数
    const options = this.getOptions()

    // 2. 校验参数是否符合规则
    validate(loader04Scheme, options)
    console.log('options', options)
    console.log('content04', content)
    return content
}