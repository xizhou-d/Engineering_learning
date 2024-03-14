const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 合并公共配置和开发/生产的配置
const { merge } = require('webpack-merge')
const devConfig = require('./dev_config')
const prodConfig = require('./prod_config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 测量每个 loader plugin 花费的时间
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

/**
 * 抽取开发和生产环境的配置文件
 * 1. 将配置文件导出改为函数，导出函数返回的对象
 * 2. 从上往下查看所有的配置属性属于哪一个配置文件 （comm/dev/prod）
 * 3. 针对单独的文件进行定义化
 * * css 加载：使用不同的 loader 可以根据 isProduction 动态获取
 */

const smp = new SpeedMeasurePlugin()

const getCommonConfig = function(isProduct) {
    return (
        {
            // entry: {
            //     index: './src/index.js',
            //     main: './src/main.js'
            // },
            entry: './src/main.js',
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
                        exclude: /node_modules/,
                        use: [
                            isProduct ? MiniCssExtractPlugin.loader : 'style-loader',
                            { loader: 'css-loader' }
                        ]
                    },
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
                    },
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    // 生成的 html 文件有变化才会重新生成，如果没有变化就不会重新生成
                    cache: true,
                    template: './src/index.html',
                    // http 压缩功能开关
                    minify: isProduct ? {
                        // 压缩的时候移除注释
                        removeComments: true,
                        // 移除空属性
                        removeEmptyAttributes: true,
                        // 移除没什么用的属性
                        removeRedundantAttributes: true,
                        // 折叠空白字符
                        collapseWhitespace: true,
                        // 压缩内联的 CSS （style 标签中的）
                        minifyCSS: true,
                        // 压缩 html 文件中写在 body 标签中的 script 中的代码
                        minifyJS: {
                            mangle: {
                                toplevel: true
                            }
                        }
                    } : false
                }),
                new CleanWebpackPlugin()
            ]
        }
    )
}
module.exports = function(env) {
    console.log('env', env)
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)

    // { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, production: true }

    const isProduct = env.production

    let mergeConfig = isProduct ? prodConfig : devConfig
    const finalConfig = merge(getCommonConfig(isProduct), mergeConfig)
    return smp.wrap(finalConfig)
}