
// babel.config.js 中 useBuiltIns 设置为 entry 需要引入这两部分的代码
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './react/App.jsx'
import axios from 'axios'

import { sum } from './ts/math'

// 1. es6 中 const 定义
const message = 'Hello Wrold.'
console.log('message', message)

// 2. es6 中的箭头函数
const foo = () => {
    console.log('foo funciton exec')
}
foo()

// 3. es6 对象解构
const obj = { name: 'xizhou', age: 18 }
const { name, age } = obj
console.log('name, age', name, age)

// 4. polyfill: 使用字符串中的 includes
const nickname = 'xizhou'
// 如果 babel.config.js 中的 useBuiltIns: 'usage', 那么 String.prototype.includes => String 相关的 polyfill 就会被打包
console.log(nickname.includes('zhou'))

// 5. 编写 react 代码
const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<App/>)

// 6. 使用 typescript 代码
console.log(sum(10, 20))

// 7. 新编写的逻辑
console.log(9999999)

// 8. 请求数据
axios.get('/api/users/list').then(res => {
    console.log('res.data', res.data)
})