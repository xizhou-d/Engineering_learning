import '../css/div-style.css'
import '../css/title-style.less'

const divEl = document.createElement('div')
divEl.textContent = 'Hello World'
divEl.classList.add('content')
document.body.append(divEl)

const titleEl = document.createElement('h2')
titleEl.textContent = '哇哈哈'
titleEl.classList.add('title')
document.body.append(titleEl)