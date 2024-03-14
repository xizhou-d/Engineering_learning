const { SyncBailHook } = require('tapable')

// bail：当有返回值时，就不会执行后续的事件触发了；
class HyCompiler {
    constructor() {
        this.hooks = {
            syncBailHook: new SyncBailHook(['name', 'age'])
        }
        // 用 hooks 监听事件（自定义插件）
        this.hooks.syncBailHook.tap('event1', (name, age) => {
            console.log('事件 event1 执行了', name, age)
            return 'aaaa'
        })

        this.hooks.syncBailHook.tap('event2', (name, age) => {
            console.log('事件 event2 执行了', name, age)
        })
    }
}

const compiler = new HyCompiler()
setTimeout(() => {
    compiler.hooks.syncBailHook.call('xizhou', 29)
}, 2000)
