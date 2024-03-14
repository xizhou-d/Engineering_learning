const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
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
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        // 打包之前，先将之前打包的文件夹删除掉，可以代替 clean-webpack-plugin
    },
    resolve: {
        extensions: ['.js', '.json', '.wasm', '.jsx', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                /**
                 * 转换 ts 文件的时候，ts-loader 无法处理 polyfill 的问题，但是 babel-loader 可以
                 * 但是，ts-loader可以在编译的时候进行类型检测，而 babel-loader 不会进行类型检测
                 */
                // use: "ts-loader",
                use: "babel-loader"
                
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react project',
            template: './src/index.html'
        })
    ]
}