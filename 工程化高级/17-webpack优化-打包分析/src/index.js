
import axios from 'axios'
// import('./abc.js')
import './style.css'

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