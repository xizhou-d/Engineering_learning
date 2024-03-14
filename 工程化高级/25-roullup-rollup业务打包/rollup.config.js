// 默认情况下 lodash 没有被打包，是因为它使用 commonjs, 而 rollup 默认情况下只会处理 es module
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')
const postcss = require('rollup-plugin-postcss')
const vuePlugin = require('rollup-plugin-vue')
const replace = require('@rollup/plugin-replace')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const path = require('path')

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const isProduction = process.env.NODE_ENV === 'production'
const plugins = [
    commonjs(),
    resolve(),
    babel({
        babelHelpers: 'bundled',
        exclude: /node_module/
    }),
    // postcs 不传参数，会用 js 创建一个 style 标签插入到 <head> 中
    // postcss()
    postcss({
        // extract: true,
        // Or with custom file name
        // extract: path.resolve('./build/my-custom-file-name.css'),
        plugins: [
            require('postcss-preset-env')
        ]
    }),
    vuePlugin(),
    replace({
        'process.env.NODE_ENV': `'production'`,
        preventAssignment: true
    }),
    
]

if (isProduction) {
    plugins.push(terser())
} else {
    const externalPlugins = [
        serve({
            port: 8080,
            host: 'localhost',
            open: true,
            contentBase: '.'
        }),
        // 当文件发生变化时自动刷新浏览器，启动的时候需要加上 -w   =>   npx rollup -c -w
        livereload()
    ]

    plugins.push(...externalPlugins)
}

module.exports = {
    input: './src/index.js',
    /**
     * output: 
     * 对象类型，只能打包一种类型的格式
     * 数组类型，可以打包多种格式 umd, iife, cjs, amd
     */
    output: {
        format: 'umd',
        name: 'xizhou_utils',
        file: './build/bundle.umd.js',
        globals: {
            lodash: '_'
        },
    },
    plugins: plugins
} 