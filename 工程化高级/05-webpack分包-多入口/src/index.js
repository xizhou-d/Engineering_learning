const axios = require('axios')
// index.js 作为入口
const message = 'Hello World.'
console.log('message', message)

function foo() {
    console.log('foo funciton exec~')
}
foo()

// 使用 axios
axios.get('http://123.207.32.32:8000/home/multidata').then(res => {
    console.log('res.data', res.data)
})