module.exports = {
    // plugins: [
    //     '@babel/plugin-transform-arrow-functions',
    //     '@babel/plugin-transform-block-scoping'
    // ],
    // 如果使用 plugins 来对 js 代码做转换，那么就需要安装很多的插件，所以，一般用 @babel/preset-env 来替代。
    // 我们一般使用 browersslist 
    presets: [
        ['@babel/preset-env', {
            // 在开发中一般不会只用这种方式，会覆盖.babelrc 文件中
            // 因为 browserslist 工具, 可以在多个前端工具之间进行浏览器兼容性
            // targets: '> 5%'
            // corejs: 3,
            /**
             * useBuiltIns 的取值：
             * 1. false: 如果不使用 polyfill 来适配，这个时候是不需要设置 corejs 属性的
             * 2. usage: 将使用到的特性，打包进 bundle.js
             * 3. entry: 举个例子，如果自己本身的代码没有用到 promise，但是依赖的第三方包有用到 promise，这时打包的时候只会讲自己代码用到的特性，引入进 bundle.js，
             *      但是第三方依赖的 promise 就不会被打包进 bundle.js，设置成 entry 可以防止这种情况的发生，并且需要将 core-js/stable 和 regenerator-runtime/runtime
             *      引入到自己的代码里
             */
            // useBuiltIns: false
            // useBuiltIns: 'usage'
            // useBuiltIns: 'entry'
        }],
        ['@babel/preset-react'],
        ['@babel/preset-typescript', {
            // corejs: 3,
            // useBuiltIns: 'usage'
        }]
    ]
}