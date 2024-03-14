const axios = require('axios')
// 使用 axios
axios.get('http://123.207.32.32:9002/lyrics?id=1842025914a').then(res => {
    console.log('res.data', res.data)
})