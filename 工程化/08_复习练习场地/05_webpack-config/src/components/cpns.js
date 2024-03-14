import '../css/div-style.css'
import '../css/bg-style.css'
import '../css/title-style.less'

import nhlt from '../img/nhlt.jpg'
import zznh from '../img/zznh.png'

const divEl = document.createElement('div')
divEl.textContent = 'div element'
divEl.className = 'box'
document.body.append(divEl)

const titleEl = document.createElement('h1')
titleEl.className = 'title'
titleEl.textContent = 'h1 element'
document.body.append(titleEl)

const img1 = document.createElement('img')
img1.src = nhlt
document.body.append(img1)

// const img2 = document.createElement('img')
// img2.src = zznh
// document.body.append(img2)

const divEl2 = document.createElement('div')
divEl2.className = 'img-bg'
document.body.append(divEl2)