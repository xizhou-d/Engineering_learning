
// 默认情况下 lodash 没有被打包，是因为它使用 commonjs, 而 rollup 默认情况下只会处理 es module
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')

module.exports = {
    input: './lib/index.js',
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
    external: ['lodash'],
    plugins: [
        commonjs(),
        resolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: /node_module/
        }),
        terser()
    ]
} 

/**
 * 如果自己写的 commonJS 规范的代码，那么需要安装 @rollup/plugin-commonjs
 * 如果导入的是 node_modules 里面的代码，还需要安装 @rollup/plugin-node-resolve
 */