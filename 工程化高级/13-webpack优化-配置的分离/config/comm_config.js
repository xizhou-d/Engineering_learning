const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 合并公共配置和开发/生产的配置
const { merge } = require('webpack-merge')
const devConfig = require('./dev_config')
const prodConfig = require('./prod_config')

/**
 * 抽取开发和生产环境的配置文件
 * 1. 将配置文件导出改为函数，导出函数返回的对象
 * 2. 从上往下查看所有的配置属性属于哪一个配置文件 （comm/dev/prod）
 * 3. 针对单独的文件进行定义化
 * * css 加载：使用不同的 loader 可以根据 isProduction 动态获取
 */

const getCommonConfig = function(isProduct) {
    return (
        {
            // entry: {
            //     index: './src/index.js',
            //     main: './src/main.js'
            // },
            entry: './src/index.js',
            output: {
                clean: true,
                path: path.resolve(__dirname, '../build'),
                filename: 'js/[name]_[chunkhash]_bundle.js',
                chunkFilename: 'js/[chunkhash]_bundle.js'
            },
            resolve: {
                extensions: ['.js', '.json', '.wasm', '.ts', '.jsx']
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                            isProduct ? MiniCssExtractPlugin.loader : 'style-loader',
                            { loader: 'css-loader' }
                        ]
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: './src/index.html'
                }),
            ]
        }
    )
}
// 配置如果导出的是一个函数，那么这个函数可以在 webpack 运行的时候，自动获取一个参数 env，webpack 源码自动实现的
module.exports = function(env) {
    console.log('env', env)
    // { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, production: true }

    const isProduct = env.production

    let mergeConfig = isProduct ? prodConfig : devConfig
    return merge(getCommonConfig(isProduct), mergeConfig)
}