const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader'}

                    // 以下方式配置的 postcss-loader 可以提出到文件 postcss.config.js
                    // { 
                    //   loader: 'postcss-loader',
                    //   options: {
                    //     postcssOptions: {
                    //         plugins: [
                    //             'autoprefixer'
                    //         ]
                    //     }
                    //   }
                    // }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader'},
                    { loader: 'less-loader'}
                ]
            }
        ]
    }
}