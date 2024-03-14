const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    /** resolveLoader: 配置项决定了 webpack 会到那个文件夹找 loader, 默认是 node_modules，可配置，如果配置上我们自己 loader 文件夹，可以不用写前缀 */
    resolveLoader: {
        modules: ["node_modules", "xizhou_loaders"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'loader01',
                    'loader02',
                    'loader03',
                    // 2. 给 loader 传递参数
                    {
                        loader: 'loader04',
                        options: {
                            name: 'xizhou',
                            age: 29
                        }
                    }
                ]
            },
            // 1. 修改 loader 执行顺序
            // {
            //     test: /\.js$/,
            //     use: [
            //         'loader01',
            //     ]
            // },
            // {
            //     test: /\.js$/,
            //     use: [
            //         'loader02',
            //     ],
            //     // enforce 属性四个值，可以修改 loader 执行顺序
            //     enforce: 'pre'
            // },
            // {
            //     test: /\.js$/,
            //     use: [
            //         'loader03'
            //     ]
            // }
        ]
    }
}