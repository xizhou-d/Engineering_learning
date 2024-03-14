import { createApp } from 'vue'
import HelloVue from './vue_demo/HelloVue'
import "./utils/abc/cba/nba/why/test"

import { sum } from './utils/math'
import './components/cpns'
import './utils/demo.js'

const message = 'Hello World.'

console.log(sum(1, 2))
console.log(sum(19, 11))

console.log('message.length', message.length)
console.log(sum(1, message.length))

const bar = () => {
    console.log('bar functio excution')
}

bar() 
bar()

createApp(HelloVue).mount('#app')

console.log('XIZHOU', XIZHOU)
console.log('COUNT', COUNT)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

console.log('ccccccc')

// if (module.hot) {
//     module.hot.accept('./utils/math.js')
// }

if (module.hot) {
    module.hot.accept('./utils/demo.js', () => {
        console.log('demo 模块发生了更新。')
    })
}