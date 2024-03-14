import { createApp} from 'vue'
import { sum } from './utils/math.js'
import './utils/hot_demo.js'
import './components/cpns.js'
import 'utils/aaa/bbb/ccc/ddd/test_alias.js'

import HelloVue from './vue_demo/HelloVue.vue'

console.log(sum(10, 20))

let aaaaaaaa = 'xizhdddou'

const sub = () => {
    console.log('sub function exection')
}

createApp(HelloVue).mount('#app')

console.log('XIZHOU', XIZHOU)
console.log('COUNT', COUNT)
console.log('process.env.NNODE_ENV', process.env.NODE_ENV)

if (module.hot) {
    module.hot.accept("./utils/hot_demo.js")
}

