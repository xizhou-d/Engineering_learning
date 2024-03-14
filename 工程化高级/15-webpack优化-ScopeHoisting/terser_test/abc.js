const message = 'Hello Wrold.'
console.log('message', message)

// 2. es6 中的箭头函数
const foo = (num1, num2) => {
    console.log('foo funciton exec')
    // terser: -c arguments=true => 将 arguments[0], arguments[1] 转化成 num1,num2，减少代码量
    // console.log(arguments[1], arguments[2])
}
foo()

const obj = { 
    name: 'xizhou',
    // terser: -c arrows=true => 将普通函数，转化成 箭头函数，减少代码量
    bar() {
        return 'bar'
    }
}

// 不可达的代码
// terser: -c dead_code=true => 将不可达的代码删除

if (false) {
    console.log(11111111)
    console.log(2222222)
}

class Person {}
const p1 = new Person()

// npx terser abc.js -o abc.min.js -c arrows=trye,arguments=true,dead_code=true -m toplevel=true,keep_fnames=true,keep_classnames
// -m toplevel=true 会将名字比较长的变量，用一个字母替代
// -m keep_fnames=true 会将函数名称保留，其他的变量做丑化操作
// -m keep_classnames 会保留 class 的名称