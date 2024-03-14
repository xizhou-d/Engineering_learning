const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// tersr-webpack-plugin是安装 webpack 的时候自动安装的
const TerserPlugin = require('terser-webpack-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: false,
    // entry: {
    //     index: './src/index.js',
    //     main: './src/main.js'
    // },
    entry: './src/demo.js',
    output: {
        clean: true,
        path: path.resolve(__dirname, 'build'),
        filename: '[name]_[chunkhash]_bundle.js',
        chunkFilename: '[chunkhash]_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    optimization: {
        chunkIds: 'named',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {},
        },
        // minimise 在生产环境是默认开启，development 需要手动设置为 true
        minimize: true,
        minimizer: [
            // JS 代码简化: TerserPlugin
            new TerserPlugin({
                extractComments: true,
                // 手动配置压缩代码的选项
                terserOptions: {
                    compress: {
                        arguments: true,
                        unused: true, // 打包的时候是否删除没有用到的代码
                        arrows: true
                    },
                    mangle: true,
                    toplevel: true,
                    keep_fnames: true,
                }
            }),
            // CSS 代码简化: CSSMinimizerPlugin
            new CSSMinimizerPlugin({
                parallel: true // 利用多核 CPU 并行压缩提高效率，默认是 true，此处可省略
            })
            /** 凡是压缩的插件都是放在 optimization.minimizer中的，跟普通的 plugin 是不一样的 */
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css',
            chunkFilename: '[name]_[contenthash].css'
        })
    ]
}