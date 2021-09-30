/**
 * JS 七种内置数据类型：null、undefined、boolean、number、string、object、symbol
 * 前五种为基本类型，第六种 object 类型又包括了 function、array、date 等
 * 类型判断常用的方法：typeof、instanceof、Object.prototype.toString、constructor
 * 
 * 类型隐式转换
 * 加法操作：
 *      如果 + 后两边存在 NaN，则结果为 NaN（typeof NaN 是 Number）
 *      如果 Infinity + Infinity， 结果是 Infinity
 *      如果 -Intinity + (-Infinity) 结果是 -Infinity
 *      如果 Infinity +  (-Inifity)，结果是 NaN
 * 如果加号两边至少有一个字符串，其规则为：
 *      如果 + 号两边都是字符串，则执行字符串拼接
 *      如果 + 号两边只有一个值是字符串，则将另外的值转换为字符串，再执行拼接
 *      如果 + 号两边有一个是对象，则调用 valueOf 或 toString 方法取得值，转化为内基本类型在进行字符串拼接
 */

console.log("================使用 typeof 判断类型=================")
console.log(typeof 5) // "number"
console.log(typeof 'lucas') // "string"
console.log(typeof undefined) // "undefined"
console.log(typeof true) // "boolean"

console.log(typeof null) // "object"

const foo = () => 1
console.log(typeof foo) // "function"

const foo2 = {}
console.log(typeof foo2) // "object"

const foo3 = []
console.log(typeof foo3) // "object"

const foo4 = new Date()
console.log(typeof foo4) // "object"

const foo5 = Symbol("foo")
console.log(typeof foo5) // "symbol"

// 结论：使用 typeof 可以准确判断出除 null 以外的基本类型，以及 function 类型、symbol 类型；null 会被 typeof 判断为 object 


console.log("================使用 instanceof 判断类型=================")
// 使用 a instanceof B 判断的是：a 是否为 B 的实例，即 a 的原型链上是否存在 B 构造函数

function Person(name) {
    this.name = name
}
const p = new Person("lucas")
console.log(p instanceof Person) // true
console.log(p instanceof Object) // true

console.log(5 instanceof Number) // false，5 是基本类型，它并不是 Number 构造函数构造出来的实例
console.log(new Number(5) instanceof Number) // true


// 模拟 instanceof 原理
const instanceofMock = (L, R) => {
    if(typeof L !== "object") {
        return false
    }

    while(true) {
        if(L === null) {
            // 已经遍历到顶端
            return false
        }
        if(L.__proto__ === R.prototype) {
            return true
        }
        L = L.__proto__
    }
}
console.log(instanceofMock("",  String)) // false
console.log(instanceofMock(new String("asdf"), String)) // true
console.log(instanceofMock(p, Person)) // true


console.log("================使用 constructor 和 Object.prototype.toString 判断类型=================")
// Object.prototype.toString 我们称为「万能方法」，「终极方法」
console.log(Object.prototype.toString.call(1)) // [object Number]
console.log(Object.prototype.toString.call("lucas")) // [object String]

var foo_c = 5
console.log(foo_c.constructor)

// 插曲 prototype

function Person2 (name) {
    this.name = name
}
Person2.prototype.name = "hello"
console.log(typeof Person2.prototype)
console.log(Person2.prototype)



console.log("================类型及其转换=================")
console.log(typeof 1 + "1") // 11 字符串
console.log(1 + true) // 2
console.log(1 + false) // 1
console.log(1 + undefined) // NAN
console.log("lucas" + true) // lucastrue

console.log({} + true)

// 结论：对象在转换基本类型时，会调用该对象上 valueOf 或 toString 这两个方法，该方法返回值是转换为基本类型的结果。
// 具体是调用 valueOf 还是 toString 取决于 toPrimitive 调用结果，主观上说，这个对象倾向于转换成什么，就会优先调用哪个方法
const foo_convert = {
    toString() {
        return "lucas"
    },
    valueOf() {
        return 1
    }
}
alert(foo_convert) //:lucas
console.log(1 + foo_convert) // 1


console.log("================cannot read property of undefined=================")
obj.user && xxx  // 检测是否 undefined
obj.user || xxx  // 默认值
// try catch


