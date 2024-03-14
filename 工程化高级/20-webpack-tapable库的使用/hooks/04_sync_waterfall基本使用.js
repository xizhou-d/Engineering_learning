const { SyncWaterfallHook } = require('tapable')


// Waterfall：当返回值不为undefined时，会将这次返回的结果作为下次事件的第一个参数；
class HyCompiler {
    constructor() {
        this.hooks = {
            syncWaterfallHook: new SyncWaterfallHook(['name', 'age'])
        }
        // 用 hooks 监听事件（自定义插件）
        this.hooks.syncWaterfallHook.tap('event1', (name, age) => {
            console.log('事件 event1 执行了', name, age)
            // syncWaterfallHook: 会将返回值赋值给 下一个监听函数的第一个参数
            return 'dongzhou'
        })

        this.hooks.syncWaterfallHook.tap('event2', (name, age) => {
            console.log('事件 event2 执行了', name, age)
        })
    }
}

const compiler = new HyCompiler()
setTimeout(() => {
    compiler.hooks.syncWaterfallHook.call('xizhou', 29)
}, 2000)
