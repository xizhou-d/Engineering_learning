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
    devServer: {
        // static 不设置，默认是 public
        static: ['public', 'content'],
        // host: '0.0.0.0'
        port: 3000,
        open: true,
        // 本地服务器，压缩文件
        compress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                pathRewrite: {
                    '^/api': ''
                },
                /**
                 * changeOrigin 的作用：如果本地 loacalhost:3000 去请求接口 localhost:9000 ，打印服务器的 headers 时，host 属性的值是：localhost:3000
                 * 若是服务器设置了限制，必须是 localhost:9000 的请求才有响应（防止爬虫），那么就会请求失败，为了结局这个问题，changeOrigin 的作用就是在出现跨域请求的时候
                 * 可以让 服务器中的 headers 里面的 host: localhost:9000(不是浏览器显示的地址)
                 */
                changeOrigin: true
            }
        },
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react project',
            template: './src/index.html'
        })
    ]
}