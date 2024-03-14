module.exports = function(content) {
    console.log('content2', content)
    const callback = this.async()

    setTimeout(() => {
        callback(null, content + 'bbb')
    }, 3000)

    return content + 'bbb'
}

// module.exports.pitch = function() {
//     console.log('loader pitch 02')
// }