const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.config')
const { merge } = require('webpack-merge')

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        clean: true
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
})