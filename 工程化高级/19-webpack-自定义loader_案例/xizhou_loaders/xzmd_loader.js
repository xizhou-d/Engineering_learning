const {marked} = require('marked')
const hljs = require('highlight.js')

module.exports = function(content) {
    // 让 makes 库解析语法的时候将代码高亮内容标识出来
    marked.setOptions({
        highlight: function(code, lang) {
            return hljs.highlight(lang, code).value
        }
    })
    // 将 md 语法转换成 html 元素结构 
    const htmlContent = marked(content)
    console.log('htmlContent', htmlContent)

    // 返回的结果必须是模块化的内容
    const innerHtml = "`" + htmlContent + "`"
    const moduleContent = `var code = ${innerHtml}; export default code;`
    return moduleContent
}