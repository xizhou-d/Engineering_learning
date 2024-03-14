// vite 会自动帮我们加上导入的文件的后缀名 （eg: .js ）
import { sum, mul } from './utils/math'
import _ from 'lodash-es'
import { formatPrice } from './ts/format'
import './css/style.css'
import './css/normal.less'
import App from './vue/App.vue'
import { createApp } from 'vue'
import AppReact from './react/App.jsx'
import ReactDOM from 'react-dom/client'
import React from 'react'

const message = 'Hello vite.'
console.log('message', message)

const foo = () => {
    console.log('foo function exec~.')
}
foo()

// 模块化代码的使用
console.log(sum(10, 20))
console.log(mul(11, 11))

console.log(_.join(['abc', 'cba']))

console.log(formatPrice(10000))

// DOM 操作
const titleEl = document.createElement('h2')
titleEl.textContent = 'Hello Vite'
titleEl.className = 'title'
document.body.append(titleEl)

// 增加 VUE 代码
const app = createApp(App)
app.mount(document.querySelector('#app'))

// 增加 react 代码
const root = ReactDOM.createRoot(document.querySelector('#root '));
root.render(<AppReact />)