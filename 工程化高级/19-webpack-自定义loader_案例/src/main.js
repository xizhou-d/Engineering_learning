import code from './md/learn.md'
import './css/code.css'
import 'highlight.js/styles/default.css'

const message = 'Hello World.'
console.log(message)

const foo = () => {
    console.log('foo functin exec~')
}

foo()
console.log('code', code)

// textContent 只会将标签显示为字符串，应该使用 innerHtml
// document.body.textContent = code;
document.body.innerHTML = code