import '../css/div-style.css'
import '../css/title-style.less'
import '../css/bg-style.css'

import zznh from '../img/zznh.png'
import nhlt from '../img/nhlt.jpg'
import uidls from '../images/zznh.png'

const divEl = document.createElement('div')
divEl.textContent = 'Hello World'
divEl.classList.add('content')
document.body.append(divEl)

const titleEl = document.createElement('h2')
titleEl.textContent = '哇哈哈'
titleEl.classList.add('title')
document.body.append(titleEl)

// 创建 img 元素 webpack 配置 type: 'asset'
const imgEl1 = document.createElement('img')
imgEl1.src = nhlt
document.body.append(imgEl1)

const imgEl2 = document.createElement('img')
imgEl2.src = uidls
document.body.append(imgEl2)

// 创建一个 div，设置背景
const divEl1 = document.createElement('div')
divEl1.classList.add('img-bg')
document.body.append(divEl1)