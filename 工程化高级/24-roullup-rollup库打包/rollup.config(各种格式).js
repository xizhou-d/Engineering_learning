module.exports = {
    input: './lib/index.js',
    /**
     * output: 
     * 对象类型，只能打包一种类型的格式
     * 数组类型，可以打包多种格式 umd, iife, cjs, amd
     */
    output: [
        {
            format: 'umd',
            name: 'xizhou_utils',
            file: './build/bundle.umd.js'
        },
        {
            format: 'cjs',
            file: './build/bundle.cjs.js'
        },
        {
            format: 'amd',
            file: './build/bundle.amd.js'
        },
        {
            format: 'iife',
            name: 'xizhou_utils',
            file: './build/bundle.iife.js'
        },
        {
            format: 'es',
            name: 'xizhou_utils',
            file: './build/bundle.es.js'
        }
    ]
} 