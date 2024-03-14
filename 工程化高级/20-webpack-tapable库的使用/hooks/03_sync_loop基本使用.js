const { SyncLoopHook } = require('tapable')

// Loop：当返回值为true，就会反复执行该事件，当返回值为undefined或者不返回内容，就退出事件；
let count = 0
class HyCompiler {
    constructor() {
        this.hooks = {
            syncLoopHook: new SyncLoopHook(['name', 'age'])
        }
        // 用 hooks 监听事件（自定义插件）
        this.hooks.syncLoopHook.tap('event1', (name, age) => {
            console.log('事件 event1 执行了', name, age)
            if (count < 5) {
                console.log('count', count)
                count++
                return true
            }
        })

        this.hooks.syncLoopHook.tap('event2', (name, age) => {
            console.log('事件 event2 执行了', name, age)
        })
    }
}

const compiler = new HyCompiler()
setTimeout(() => {
    compiler.hooks.syncLoopHook.call('xizhou', 29)
}, 2000)
