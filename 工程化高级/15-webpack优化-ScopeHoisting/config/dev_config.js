const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// tersr-webpack-plugin是安装 webpack 的时候自动安装的
const TerserPlugin = require('terser-webpack-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
    },
}
