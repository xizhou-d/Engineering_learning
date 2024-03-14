const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    resolveLoader: {
        modules: ["node_modules", "./xizhou_loaders"]
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/,
                use: {
                    loader: "xzbable_loader",
                    options: {
                        // plugins: [
                        //     '@babel/plugin-transform-arrow-functions'
                        // ]
                        // presets: [
                        //     '@babel/preset-env'
                        // ]
                    }
                }
            }, 
            {
                test: /\.md$/,
                use: {
                    loader: "xzmd_loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}