const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    // 多入口
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        // placeholder 多入口时，可以输出到不同的文件
        filename: '[name]-bundle.js',
        // 打包之前，先将之前打包的文件夹删除掉，可以代替 clean-webpack-plugin
        clean: true,
        // 单独对分包的文件进行命名
        chunkFilename: '[name]_chunk.js'
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