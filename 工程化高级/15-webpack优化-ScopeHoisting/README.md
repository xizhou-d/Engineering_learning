# sideEffects

## package.json 文件中字段 sideEffects 设置方法：
sideEffects: false 声明所有的文件都没有副作用

可以设置一个数组，生命那些文件有副作用
sideEffects: [
    './src/demo/parse_lylics.js'
]
