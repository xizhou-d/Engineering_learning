const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        main: './src/main.js'
    },
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css',
            chunkFilename: '[name]_[contenthash].css'
        })
    ]
}