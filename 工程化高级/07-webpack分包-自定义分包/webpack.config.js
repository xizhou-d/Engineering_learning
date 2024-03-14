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
        chunkFilename: '[name]_chunk.js',
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
    // 优化配置
    optimization: {
        /** 设置生成的 chunkId 的算法 */
        // mode development: 默认是 named
        // mode production: 默认是 deterministic(webpack5 新增)
        chunkIds: 'named',
        splitChunks: {
            /** 默认值：async => 只会把异步的代码进行分包，比如 import 动态导入的 */
            // chunks: 'async'
            chunks: 'all',
            /** 包的大小超过 2000kb 就自动的继续进行分包 */
            // maxSize: 20000,
            /** 将包拆分成大小不小于 10000kb 的 */
            // minSize: 10000(默认值 20000)
            minSize: 10,

            /** 自己对需要进行拆包的内容进行分包 */
            cacheGroups: {
                // key1: value1,
                // key2: value2
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: '[id]_vendor.js',
                },
                utils: {
                    test: /utils/,
                    filename: '[id]_utils.js'
                }
            }
        }
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