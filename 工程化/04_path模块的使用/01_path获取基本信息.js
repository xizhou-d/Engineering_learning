const path = require('path')

// const filePath = '/Users/xizhou/Downloads/个人项目.html'

// console.log('path.extname', path.extname(filePath))

// console.log('path.basename', path.basename(filePath))

// console.log('path.dirname', path.dirname(filePath))


// 2. path.join() 拼接多个路径

// const path1 = '../xizhou/Downloads'
// const path2 = '../前端工程化/aaa'
// console.log(path.join(path1, path2))

// 3. path.resolve() 拼接多个路径
console.log(path.resolve('./abc/cnh', './aaa.text'))