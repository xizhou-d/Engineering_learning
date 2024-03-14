const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// tersr-webpack-plugin是安装 webpack 的时候自动安装的
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
                extractComments: true,
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
        // 在使用 css module 的时候，这个插件会将 css module 的样式内容清空，导致没有样式  =>  解决方案： https://github.com/FullHuman/purgecss/issues/766  =>  https://github.com/FullHuman/purgecss/issues/163#issuecomment-1141698184
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
    ]
}
