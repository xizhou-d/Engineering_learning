const path = require('path')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        // assetModuleFilename: 'abc.png'
        clean: true
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.jsx', '.ts', '.tsx'],
        alias: {
            utils: path.resolve(__dirname, './src/utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader'}
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
            },
            {
                test: /\.jpg|jpe?g|svg|gif|png$/,
                // 1. 打包两张图片，并且这两张图片有自己的地址，将地址设置到 img/bgi中
                //    缺点：多图片加载的两次网络请求
                //  type: 'asset/resource',

                // 2. 将图片进行 base64 的编码，并且将编码后的源码（图片的 base64格式的源码）直接放到打包的 js 文件中
                //    缺点：造成 js 文件非常大，下载 js 文件本身消耗时间非常长，造成 js 代码的下载和解析/执行时间非常长
                // type: 'asset/inline'

                // 3. 合理的规范
                // 3.1 对于小一点的图片，可以进行 base64 编码
                // 3.2 对于大一点的图片，单独的图片打包，形成 url 地址，单独的请求这个 url 图片

                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 60 * 1024 // 20kb
                    }
                },
                generator: {
                    // 占位符
                    // name: 指向原来的图片名称
                    // ext: 拓展名
                    // hase: webpack 生成的 hash 值(hasl:8 只用前八位)
                    filename: 'img/[name]_[hash:8][ext]'
                }
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(),
        new HtmlWebackPlugin({
            title: '电商项目',
            template: './index.html'
        }),
        new DefinePlugin({
            // 后面的双引号里面的内容会被当作代码执行，如果想传入一个字符串，需要双引号里面加单引号
            // ❗️ 该插件默认会注入一个变量 process.env.NODE_ENV, 根 webpack 设置的属性 mode 保持一致，默认值是 production
            "BASE_URL": "'./'",
            "XIZHOU": "'yangkun'",
            "COUNT": "18"
        })
    ]
}