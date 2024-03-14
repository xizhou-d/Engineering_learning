
const { AsyncParallelHook } = require('tapable')

// Parallel：并行，会同时执行次事件处理回调结束，才执行下一次事件处理回调；
class HyCompiler {
    constructor() {
        this.hooks = {
            asyncParallelHook: new AsyncParallelHook(['name', 'age'])
        }
        // 用 hooks 监听事件（自定义插件）
        this.hooks.asyncParallelHook.tapAsync('event1', (name, age) => {
            setTimeout(() => {
                console.log('事件 event1 执行了', name, age)
            }, 3000)
        })

        this.hooks.asyncParallelHook.tapAsync('event2', (name, age) => {
            setTimeout(() => {
                console.log('事件 event2 执行了', name, age)
            }, 3000)
        })
    }
}

const compiler = new HyCompiler()
setTimeout(() => {
    compiler.hooks.asyncParallelHook.callAsync('xizhou', 29)
}, 2000)
