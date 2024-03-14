const path = require('path')
const HtmlWebackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { DefinePlugin } = require('webpack')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.jpg|jpe?g|svg|gif|png$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 60 * 1024
                    }
                },
                generator: {
                    filename: 'img/[name]_[hash:8][ext]'
                }
            },
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    { loader: 'vue-loader' }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.jsx', '.ts', '.tsx'],
        alias: {
            utils: path.resolve(__dirname, './src/utils')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebackPlugin({
            template: './index.html',
            title: 'personal config'
        }),
        new DefinePlugin({
            'XIZHOU': "'XI'",
            'COUNT': 9999
        })
    ],
    devServer: {
        hot: true,
        port: 8080,
        open: true,
        compress: true
    }
}