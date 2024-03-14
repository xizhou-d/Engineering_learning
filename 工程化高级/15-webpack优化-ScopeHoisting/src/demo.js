import { sum1 } from './demo/math.js'
/** 1. 正常使用方式 */
// import { parselylics } from './demo/parse_lyric.js'
// parselylics()

/** 2. 只导入模块，但是不引入任何内容 */
import './demo/parse_lyric.js'

/** 3. ⚠️：package.json 中设置的 sideEffects: false, 将所有文件都声明为没有副作用，那么 css 文件就会被删除掉，不会再打包了，所以，需要设置 sideEffects 的时候排除掉 css 文件 */
import './style.css'

sum1(10, 5000)

const message = 'Hello Wrold.'
console.log('message', message)

const foo = (num1, num2) => {
    console.log('foo funciton exec')
    // console.log(arguments[1], arguments[2])
}
foo()

const obj = { 
    name: 'xizhou',
    bar() {
        return 'bar'
    }
}

if (false) {
    console.log(11111111)
    console.log(2222222)
}

class Person {}
const p1 = new Person()

// tree shaking
function sum(num1, num2) {
    return num1 + num2
}
// console.log(sum(10, 40))

// 添加 div， 添加 classname
const divT = document.createElement('div')
divT.className = 'ccc'
divT.textContent = 'div title class'
document.body.append(divT)