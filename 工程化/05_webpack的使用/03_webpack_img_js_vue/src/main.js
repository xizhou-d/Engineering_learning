import { createApp } from 'vue'
import HelloVue from './vue_demo/HelloVue'
import "./utils/abc/cba/nba/why/test"

import { sum } from './utils/math'
import './components/cpns'

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