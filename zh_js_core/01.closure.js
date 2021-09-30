/**
 * 作用域：作用域其实就是一个规则，这个规则用于确定在特定场景下如何查找变量
 * 在 JS 中，ES6 出现之前只有函数作用域和全局作用域之分，ES6 增加了 let 和 const 声明变量的块级作用域
 * 备注：变量声明后未赋值，值值为 undefined，变量未声明会报 Uncaught ReferenceError: xxx is not defined 
 * 暂时性死区（TDZ）：起始于函数开头，终止于相关变量声明的一行，这个范围内无法访问 let 或 const 声明的变量，这个范围被称为暂时性死区
 * 执行上下文：执行上下文就是当前代码的执行环境/作用域，和作用域链相辅相成。
 * 直观上看，执行上下文包含了作用域链，同时它们又像是一条河的上下游：有了作用域链，才有了执行上下文的一部分
 * 
 * JS 代码执行的两个阶段：
 * 代码预编译阶段：编译器将 JS 代码编译成可执行的代码。
 * 代码执行阶段：执行代码，执行上下文在这个阶段全部创建完成
 * 备注：预编译和编译并不一样，传统的编译非常复杂，涉及分词、解析、代码生成等过程。这里的预编译是 JS 中独特的概念，
 *      虽然 JS 是解释型语言，编译一行，执行一行。但是在代码执行前，JS 引擎确实会做一些「预先准备工作」
 * 在通过语法分析，确认语法无误之后， JS 代码在预编译阶段对变量的内存空间进行分配，我们熟悉的变量提升便是在此阶段完成的
 * 经过预编译过程，我们应该注意三点：
 * 1. 预编译阶段进行变量声明
 * 2. 预编译阶段变量声明进行提升，但是值为 undefined
 * 3. 预编译阶段所有非表达式的函数声明进行提升
 * 代码执行的整个过程就像是一条生产流水线：
 *   第一步是在预编译阶段创建「变量对象」（Variable Object），此时只是创建，而未赋值。
 *   第二步是代码执行阶段，变量对象转为「激活对象」（Active Object）。此时作用域也就被确定，它由当前执行环境的变量对象和所有外层已经完成的激活对象组成。
 * 
 * 执行上下文包括：
 * 1. 变量对象
 * 2. 作用域链
 * 3. this
 * 
 * 调用栈：我们在执行一个函数时，如果这个函数又调用了另外一个函数，而这个「另外一个函数」也调用了「另外一个函数」，便形成了一系列的调用栈
 * 
 * 闭包：函数嵌套函数时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局环境下可访问，就形成了闭包
 * 借助闭包来绑定数据，可以保护这些数据变量的内存块在闭包存活时，始终不被垃圾回收机制回收。因此，闭包使用不当，极可能引发内存泄漏，需要格外注意。
 * 
 * 内存管理的基本概念：
 * 1. 栈空间：由操作系统自动分配释放，存放函数的参数值，局部变量的值等，其操作方式类似于数据结构中的栈
 * 2. 堆空间：一般由开发者分配释放，这部分空间就要考虑垃圾回收的问题
 * JS 中数据类型：
 * 1. 基本数据类型，如 Undefined、Null、Number、Boolean、String 等，一般保存在栈内存中
 * 2. 引用类型，如 Object、Array、Function 等，一般保存在堆内存中
 * 内存泄漏：内存空间明明已经不再被使用，但由于某种原因并没有被释放的现象。
 * 浏览器的垃圾回收：ps 在原文链接中查看详细算法
 * 1. 标记清楚
 * 2. 引用计数
 * 
 * 
 * 
 */

console.log("====================调用栈=======================")
function foo1() {
    foo2()
}

function foo2() {
    foo3()
}

function foo3() {
    foo4()
}

function foo4() {
    console.log("foo4")
}

foo1()



console.log("====================内存泄漏场景举例=======================")
// // 场景一、
// var element = document.getElementById("element")
// element.mark = "marked"
// function remove() {
//     element.parentNode.removeChild(element) // 只是把 id 为 element 的节点移除，但是变量 element 依然存在，该节点占有的内存无法被释放
//     // element = null // 加上该字段后就不会内存泄漏了
//     debugger
// }

// // 场景二
// var element = document.getElementById("element")
// element.innerHTML = "<button id=\"button\"></button>"

// var button = document.getElementById("button")
// var clickListener = button.addEventListener("click", function() {
//     // 。。。。。。
// })

// element.innerHTML = '' // button 元素从 DOM 中移除了，但是由于其时间处理句柄还在，所有无法被垃圾回收。需要配合 removeEventListener()


// // 场景三
// function foo_mem() {
//     var name = "lucas"
//     window.setInterval(function() {
//         console.log(name)
//     }, 1000)
// }
// foo() // 由于 window.setInterval 的存在，导致 name 内存空间始终无法被释放，如果不是业务要求的话，一定要记得在合适的时机使用 clearInterval 进行清理



// console.log("====================垃圾回收&内存泄漏分析=======================")
// function foo() {
//     let value = Math.random()

//     function bar() {
//         console.log(value)
//         // debugger
//     }

//     return bar
// }

// let bar = foo()
// bar()
// bar = null // bar 不再被引用，value 也会被清楚


// var array = []
// function createNodes() {
//     let div
//     let i = 100
//     let frag = document.createDocumentFragment()
//     for(; i > 0; i--) {
//         div = document.createElement("div")
//         div.appendChild(document.createTextNode(i))
//         frag.appendChild(div)
//     }
//     document.body.appendChild(frag)
// }

// function badCode() {
//     array.push([...Array(100000).keys()])
//     createNodes()
//     setTimeout(badCode, 1000)
// }

// badCode()


console.log("====================例题分析=======================")
const foo_1 = function() {
    var v = 0
    return () => {
        return v++
    }
}()
for(let i = 0; i < 10; i++) {
    foo_1()
}

console.log(foo_1()) // 10


const foo_2 = () => {
    var arr = []
    var i

    for (i = 0; i < 10; i++) {
        arr[i] = function() {
            console.log(i)
        }
        
    }
    return arr[0]
}
foo_2()() // 10


var fn = null
const foo_3 = () => {
    var a = 2
    function innerFoo() {
        console.log(a)
    }
    fn = innerFoo
}
const bar_3 = () => {
    fn()
}

foo_3()
bar_3() //2

// var fn_4 = null
// const foo_4 = () => {
//     var a = 2
//     function innerFoo() {
//         console.log(c)
//         console.log(a)
//     }
//     fn_4 = innerFoo
// }

// const bar_4 = () => {
//     var c = 100
//     fn_4()
// }

// foo_4()
// bar_4() // 报错，ReferenceError: c is not defined


console.log("===============使用闭包实现单例模式===============")
function Person() {
    this.name = "lucas"
}

const getSingleInstance = (function() {
    var singleInstance
    return function() {
        if(singleInstance) {
            return singleInstance
        }
        return singleInstance = Person()
    }
})

const instance1 = new getSingleInstance()
const instance2 = new getSingleInstance()

console.log(instance1 === instance1) // true
