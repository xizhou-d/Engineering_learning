import './style.css'
const message = 'Hello Wrold.'
console.log('message', message)

const foo = (num1, num2) => {
    console.log('foo funciton exec')
    console.log(arguments[1], arguments[2])
}
foo()

const obj = { 
    name: 'xizhou',
    bar() {
        return 'bar'
    }
}

if (false) {
    console.log(11111111)
    console.log(2222222)
}

class Person {}
const p1 = new Person()

// tree shaking
function sum(num1, num2) {
    return num1 + num2
}
// console.log(sum(10, 40))
