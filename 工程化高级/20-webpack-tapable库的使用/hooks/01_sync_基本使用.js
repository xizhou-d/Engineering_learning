const { SyncHook } = require('tapable')

class HyCompiler {
    constructor() {
        this.hooks = {
            syncHook: new SyncHook(['name', 'age'])
        }
        // 用 hooks 监听事件（自定义插件）
        // bail 如果有一个监听事件有返回值，那么后边的监听事件就不会再执行了 
        this.hooks.syncHook.tap('event1', (name, age) => {
            console.log('事件 event1 执行了', name, age)
        })

        this.hooks.syncHook.tap('event2', (name, age) => {
            console.log('事件 event2 执行了', name, age)
        })
    }
}

const compiler = new HyCompiler()
setTimeout(() => {
    compiler.hooks.syncHook.call('xizhou', 29)
}, 2000)
