const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AutomaticDeploymentWebpackPlugin = require('./plugins/AutomaticDeploymentWebpackPlugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new AutomaticDeploymentWebpackPlugin({
            host: "127.203.32.32",
            username: 'root',
            password: 'XXXXXX',
            remotePath: '/root/XXX/XXX'
        })
    ]
}