/**
 * this 指向谁
 * 通常的说：谁调用它，this 就指向谁。也就是说，this 的指向是调用时确定的
 * 规范的说：this 的指向，是在函数调用时根据执行上下文所动态确定的。
 * 几条规律：
 * 1. 在函数体中，简单函数调用是（非显示/隐私绑定下），严格模式下 this 绑定到 undefined，否则绑定到全局对象 window/global
 * 2. 一般构造函数 new 调用，绑定到新创建的对象上
 * 3. 一般由 call/apply/bind 方法显示调用，绑定到指定参数的对象上
 * 4. 一般由上下文对象调用，绑定在该对象上
 * 5. 箭头函数中，根据外层上下文绑定的 this 决定 this 指向
 */



console.log("==================例题组合 1：全局环境下的 this========================")
function f1() {
    console.log(this)
}

function f2() {
    'use strict'
    console.log(this)
}

f1() // global，浏览器中指向 window
f2() //undefined

const foo = {
    bar: 10,
    fn: function() {
        console.log(this)
        console.log(this.bar)
    }
}

var fn1 = foo.fn
fn1() // this 指向 global/window，this.bar 为 undefined

foo.fn() // this 指向 foo 对象，this.bar 为 10。

// 结论：在执行函数时，如果函数中的 this 是被上一级的对象所调用，那么 this 指向的就是上一级对象；否则指向全局环境




console.log("==================例题组合 2：上下文对象调用中的 this========================")
const student = {
    name: 'Lucas',
    fn: function() {
        return this
    }
}
console.log(student.fn() === student) // true

const person = {
    name: 'Lucas',
    brother: {
        name: 'Mike',
        fn: function() {
            return this.name
        }
    }
}

console.log(person.brother.fn()) // Mike，this 指向最后调用它的对象


const o1 = {
    text: 'o1',
    fn: function() {
        return this.text
    }
}

const o2 = {
    text: 'o2',
    fn: function() {
        return o1.fn()
    }
}


const o22 = {
    text: 'o2',
    fn: o1.fn
}

const o3 = {
    text: 'o3',
    fn: function() {
        var fn = o1.fn
        return fn()
    }
}

console.log(o1.fn()) // o1
console.log(o2.fn()) // o1
console.log(o3.fn()) // undefined
console.log(o22.fn()) // o2




console.log("==================例题组合 3：bind/call/apply 改变 this 指向========================")
/**
 * bind/call/apply 三者都是用来改变相关函数 this 指向的，但是 call/apply 是直接进行相关函数调用；
 * bind 不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 this 指向，开发者需要手动调用即可
 */
// TODO 不懂语法，先忽略





console.log("==================例题组合 4：构造函数和 this========================")
function Foo() {
    this.bar = "Lucas"
}

const instance = new Foo()
console.log(instance.bar) // Locas
/**
 * new 操作符调用构造函数，具体做了什么 ？
 * 1. 创建一个新的对象
 * 2. 将构造函数的 this 指向这个新对象
 * 3. 为这个对象添加属性、方法等
 * 4. 最终返回新对象
 */

function Foo2() {
    this.user = "Lucas"
    const o = {}
    return o
}

const instance2 = new Foo2()
console.log(instance2.user) // undefined

function Foo3() {
    this.user = "Lucas"
    return 1
}

const instance3 = new Foo3()
console.log(instance3.user) // Lucas

// 结论：如果构造函数中显示返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例





console.log("==================例题组合 5：箭头函数中的 this 指向========================")
const foo_jian = {
    fn: function() {
        setTimeout(function() {
            console.log(this)
        })
    }
}

const foo_jian2 = {
    fn: function() {
        setTimeout(() => {
            console.log(this)
        })
    }
}

console.log(foo_jian.fn()) // window 对象
console.log(foo_jian2.fn()) // foo_jian2 对象





console.log("==================例题组合 6：this 优先级相关========================")
// 通过 call、apply、bind、new 对 this 绑定的情况称为显示绑定；根据调用关系确定的 this 指向称为隐式绑定
// TODO 不熟悉 call/apply/bind 语法，暂时忽略