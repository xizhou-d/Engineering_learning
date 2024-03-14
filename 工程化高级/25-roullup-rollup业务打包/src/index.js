import { sum, mul} from './utils/math.js'
import { formatPrice } from './utils/format.js'
// import  _ from 'lodash'
import './css/style.css'
import App from './vue/App.vue'
import { createApp } from 'vue'

function foo() {
    console.log('foo exec~')
    console.log(sum(10, 20))
    // console.log(_.join(['abc', 'aaa']))
    console.log(formatPrice())

    const message = 'Hello Rollup.'
    console.log('message', message)
    console.log('aaaa')
}

foo() 

// DOM 操作
const titleEl = document.createElement('h2')
titleEl.textContent = '洛阳'
titleEl.className = 'title'
document.body.append(titleEl)

// vue 代码
const app = createApp(App)
app.mount(document.querySelector('#app'))