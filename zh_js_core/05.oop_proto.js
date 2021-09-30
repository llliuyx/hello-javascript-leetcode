// new 关键字做了什么：
//  1. 首先创建一个空对象，这个对象将会作为执行 new 构造函数() 之后，返回的对象实例
//  2. 将上面创建的空对象的原型（__proto__），指向构造函数的 prototype 属性
//  3. 将这个空对象赋值给构造函数内部的 this，并执行构造函数逻辑
//  4. 根据构造函数执行逻辑，返回第一步创建的对象或构造函数的显示返回值


function newFunc(...args) {
    const constructor = args.shift()
    const obj = Object.create(constructor.prototype)
    const result = constructor.apply(obj, args)

    return (typeof result === 'object' && result != null) ? result : obj
}

function Person(name) {
    this.name = name
    // return {1: 1}
}

const person = new newFunc(Person, "lucas")
console.log(person)
