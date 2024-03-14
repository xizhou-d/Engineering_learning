import axios from 'axios'
import React from 'react'

import { foo } from './utils/foo.js'
import { fn1 } from './utils/bar.js'
import './utils/abc.js'

import './css/style.css'

// 1. 如果一开始就将 about.js  category 两个文件引入，那么 about.js  category 两个文件都会同时被打包进 bundle.js，没有动态加载的效果；需要在点击按钮的时候 动态导入
// import './router/about.js'
// import './router/category.js'

const message = 'Hello main'
console.log('message', message)

function bar() {
    console.log('bar exec')
}
// 使用 axios
axios.get('http://123.207.32.32:8000/home/multidata').then(res => {
    console.log('res.data', res.data)
})

const btn1 = document.createElement('button')
btn1.textContent = 'about'

const btn2 = document.createElement('button')
btn2.textContent = 'catogory'

document.body.append(btn1)
document.body.append(btn2)

btn1.onclick = () => {
    // import 一旦在函数中使用，import 是作为一个函数被调用的，前边的注释叫做魔法注释，影响到 webpack 配置文件中 output 的配置 chunkFilename 的 name 占位符
    // 第二个魔法注释（magic comments）是 prefetch 预获取，在没有点击的情况下，浏览器空闲时间自己下载
    import(
        /* webpackChunkName: 'about' */
        /* webpackPrefetch: true */
        './router/about.js'
    )
}

btn2.onclick = () => {
    // import 一旦在函数中使用，import 是作为一个函数被调用的, 前边的注释叫做魔法注释，影响到 webpack 配置文件中 output 的配置 chunkFilename 的 name 占位符
    import(
        /* webpackChunkName: 'category' */
        /* webpackPrefetch: true */
        './router/category.js'
    )
}

/**
 * 使用动态加载，webpack会将 import 导入的文件单独的打包，打开页面只会下载主包，只有点击按钮的时候才会下载 about.js 和  category，这就是动态加载，缩短了首屏加载速度
 */