import { sum, mul} from './utils/math.js'
import { formatPrice } from './utils/format.js'
import  _ from 'lodash'

function foo() {
    console.log('foo exec~')
    console.log(sum(10, 20))
    console.log(_.join(['abc', 'aaa']))
    console.log(formatPrice())

    const message = 'Hello Rollup.'
    console.log('message', message)
}

foo()

// DOM 操作
const titleEl = document.createElement('h2')
titleEl.textContent = '洛阳'
titleEl.className = 'title'
document.body.append(titleEl)


/**
 * 使用命令行打包的方式：
 * 在命令行输入: npx rollup ./lib/index.js -o dist/bundle.js
 */