const path = require('path')

module.exports = {
    mode: 'production',
    // 1. false
    // 2. none => production
    // 3. eval => development,
    // 4. source-map => production,

    // 不常见的值：eval-source-map
    // 1. eval-source-map: 添加到 eval 函数的后面
    // 2. inline-source-map: 添加到 文件的后面
    // 3. cheap-source-map（dev）: 低开销，更加高效
    // 4. cheap-module-source-map 和 cheap-source-map 很相似，但是对来自 loader 的 source-map 处理的更好。cheap-source-map 处理 loader 处理的代码是会删掉空行，cheap-module-source-map不会删除空行
    // 5. hidden-source-map: 会生成 sourcemap 文件，但是不会对 sourcemap文件进行引用，可以手动在 bundle.js 文件最后添加 //# sourceMappingURL=bundle.js.map 手动引用
    // 6. nosources-source-map：有正确的错误提示，但是无法正确查看源代码
    devtool: 'inline-source-map',
    // devtool: 'eval-source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}