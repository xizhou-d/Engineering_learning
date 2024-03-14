const path = require('path')
const glob = require('glob')
const webpack = require('webpack') // 作用域提升需要引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// terser-webpack-plugin是安装 webpack 的时候自动安装的 Scope Hoisting
const TerserPlugin = require('terser-webpack-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, '../src')
}

console.log('11111111111', glob.sync(`${PATHS.src}/**/*`, { nodir: true }))

module.exports = {
    mode: 'development',
    devtool: false,
    optimization: {
        /**
         * usedExports: 导入模块时，分析哪些函数有被使用，那些函数没有被使用
         */
        usedExports: true,
        chunkIds: 'named',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {},
        },
        // minimise 在生产环境是默认开启，development 需要手动设置为 true
        minimize: true,
        minimizer: [
            // JS 代码简化: TerserPlugin
            // terser 只能将入口文件不需要的代码在打包的时候删除，但是非入口文件的删不掉
            // 和 usedExports 结合使用，usedExports 可以分析哪些函数没有被使用，添加魔法注释标记，/* unused harmony export mul */，然后 terser 会将其删除
            new TerserPlugin({
                extractComments: false,
                // 手动配置压缩代码的选项
                terserOptions: {
                    compress: {
                        arguments: true,
                        unused: true, // 打包的时候是否删除没有用到的代码
                        arrows: false
                    },
                    mangle: false,
                    toplevel: false,
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
            filename: 'css/[name]_[contenthash].css',
            // chunkFilename: 'css/[name]_[contenthash].css'
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
        // 作用域提升 Scope Hoisting
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}
