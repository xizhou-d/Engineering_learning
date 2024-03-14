const { AsyncSeriesHook } = require('tapable')

// Series：串行，会等待上一是异步的Hook；
class HyCompiler {
    constructor() {
        this.hooks = {
            seriesHook: new AsyncSeriesHook(['name', 'age'])
        }
        // 用 hooks 监听事件（自定义插件）
        this.hooks.seriesHook.tapAsync('event1', (name, age, callback) => {
            setTimeout(() => {
                console.log('事件 event1 执行了', name, age)
                callback()
            }, 3000)
        })

        this.hooks.seriesHook.tapAsync('event2', (name, age, callback) => {
            setTimeout(() => {
                console.log('事件 event2 执行了', name, age)
                callback()
                return 'bbbb'
            }, 3000)
        })
    }
}

const compiler = new HyCompiler()
setTimeout(() => {
    compiler.hooks.seriesHook.callAsync('xizhou', 29, () => {
        console.log('所有的任务都已经执行完成。')
    })
}, 0)
