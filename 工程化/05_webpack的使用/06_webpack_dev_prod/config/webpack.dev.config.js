const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config')

// module.exports = {
//     mode: 'development',
//     devServer: {
//         hot: true,
//         port: 8888,
//         open: true,
//         compress: true
//     }
// }

module.exports = merge(commonConfig, {
    mode: 'development',
    devServer: {
        hot: true,
        port: 8888,
        open: true,
        compress: true
    }
})