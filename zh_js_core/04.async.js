function sleep(time) {
    return new Promise(resolve => setTimeout(resolve,time))
}

// console.log("===========移动页面上元素 target ============")
// let target = document.querySelector("#element")
// target.style.cssText = `
//     position: absolute;
//     left: 0px;
//     top: 0px
// `
// const walk = (direction, distance, callback) => {
//     setTimeout(() => {
//         let currentLeft = parseInt(target.style.left, 10)
//         let currentTop = parseInt(target.style.top, 10)
//         const shouldFinish = (direction === "right" && currentLeft === distance) || (direction === "bottom" && currentTop === distance)
//         if (shouldFinish) {
//             callback && callback()
//         }
//         else {
//             if (direction === "right") {
//                 currentLeft++
//                 target.style.left = `${currentLeft}px`
//             }
//             if (direction === "bottom") {
//                 currentTop++
//                 target.style.top = `${currentTop}px`
//             }

//             walk(direction, distance, callback)
//         }
//     }, 20)
// }

// const walk2 = (direction, distance) => {
//     return new Promise((resolve, reject) => {
//         const innerWalk = () => {
//             setTimeout(() => {
//                 let currentLeft = parseInt(target.style.left, 10)
//                 let currentTop = parseInt(target.style.top, 10)
//                 const shouldFinish = (direction === "right" && currentLeft === distance) || (direction === "bottom" && currentTop === distance)
//                 if (shouldFinish) {
//                     resolve()
//                 }
//                 else {
//                     if (direction === "right") {
//                         currentLeft++
//                         target.style.left = `${currentLeft}px`
//                     }
//                     if (direction === "bottom") {
//                         currentTop++
//                         target.style.top = `${currentTop}px`
//                     }
        
//                     innerWalk()
//                 }
//             }, 20)
//         }
//         innerWalk()
//     })
// }

// walk("right", 200, () => {
//     walk("bottom", 200, () => {
//         walk("right", 400, Function.prototype)
//     })
// })

// walk2("right", 200)
//     .then(() => walk2("bottom", 200))
//     .then(() => walk2("right", 400))

// function *taskGenerator() {
//     yield walk2("right", 200)
//     yield walk2("bottom", 200)
//     yield walk2("roght", 400)
// }
// const gen = taskGenerator()
// gen.next()


// await walk2("right", 200)
// await walk2("bottom", 200)
// await walk2("right", 400)

// const task = async function() {
//     await walk2("right", 200)
//     await walk2("bottom", 200)
//     await walk2("right", 400)
// }
// task()



// 红灯 3s 亮一次，绿灯 1s 亮一次，黄点 2s 亮一次；如何让三个灯不断交替重复亮灯 ？
function red() {
    console.log("red")
}

function green() {
    console.log("green")
}

function yellow() {
    console.log("yellow")
}

const trafficIndicator = (fun, second) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fun.apply()
            resolve()
        }, second)
    })
}

// const step = () => {
//     trafficIndicator(red, 3000)
//         .then(() => trafficIndicator(green, 1000))
//         .then(() => trafficIndicator(yellow, 2000))
//         .then(() => step())
// }
// step()

// const step = async function() {
//     await trafficIndicator(red, 3000)
//     await trafficIndicator(green, 1000)
//     await trafficIndicator(yellow, 2000)
//     step()
// }
// step()



// 请求图片进行预加载
const loadImg = urlId => {
    const url = `https://www.image.com/${urlId}`

    return new Promise((resolve, reject) => {
        // const img = new Image()
        // img.onerror = function() {
        //     reject(urlId)
        // }

        // img.onload = function() {
        //     resolve(urlId)
        // }

        // img.src = url

        setTimeout(() => {
            console.log(url)
            resolve(urlId)
        }, 1000)

    })
}

const urlIds = [1, 2, 3, 4, 5]

// urlIds.reduce((prevPromise, urlId) => {
//     return prevPromise.then(() => loadImg(urlId))
// }, Promise.resolve())

// const loadImgStepByStep = (index, total) => {
//     loadImg(urlIds[index]).then(() => {
//         if(++index === total) {
//             return
//         }
//         loadImgStepByStep(index, total)
//     })
// }
// loadImgStepByStep(0, urlIds.length)

// let loadImgStepByStep = async function() {
//     for(let id of urlIds)  {
//         await loadImg(id)
//     }
// }
// loadImgStepByStep()

// const urlPromises = urlIds.map(x => loadImg(x))
// Promise.all(urlPromises)
//     .then(() => {
//         console.log("success")
//     })
//     .catch(() => {
//         console.log("catch")
//     })


// console.log("====================setTimeout==================")
// // 1. 不会输出任何内容
// setTimeout(() => {
//     console.log("setTimeout block")
// }, 100)
// while(true) {

// }
// console.log("end here")

// // 2. 输出 end here
// setTimeout(() => {
//     while(true) {

//     }
// }, 0)
// console.log("end here")

// 总结：JS 所有任务分为同步任务和异步任务。当同步任务全都被消化，主线程空闲时，即 execution context stack 为空时，将会执行任务队列中的任务，即异步任务

// // 3. 输出内容
// // end here
// // setTimemout block
// // t3 - t1 = 200
// const t1 = new Date()
// setTimeout(() => {
//     const t3 = new Date()
//     console.log("setTimeout block")
//     console.log("t3 - t1 = ", t3 - t1)
// }, 100)

// let t2 = new Date()
// while(t2 - t1 < 200) {
//     t2 = new Date()
// }

// console.log("end here")

// // 4. 输出内容
// // here 0
// // here 100
// setTimeout(() => {
//     console.log("here 100")
// }, 100)

// setTimeout(() => {
//     console.log("here 0")
// }, 0)

// // 4. 输出内容
// // here 1
// // here 0
// setTimeout(() => {
//     console.log("here 1")
// }, 1)

// setTimeout(() => {
//     console.log("here 0")
// }, 0)

// 总结：setTimeout 「最小延迟时间」，1ms 和 0ms 的延迟完全等价，最小延迟时间是 1ms。
// 谁在 1ms 以内的定时，都以最小延迟时间处理。此时，在代码顺序上谁靠前，谁就会先在主线程空闲时有限执行
// MDN 给出的『最小延时』是 4ms，也有『最大延时』



// // 输出：
// // start here
// // end here
// // promise result
// // setTimeout
// console.log("start here")
// setTimeout(() => {
//     console.log("setTimeout")
// }, 0)

// new Promise((resolve, reject) => {
//     resolve("promise result")
// }).then( value => {
//     console.log(value)
// })
// console.log("end here")

// 总结：每次主线程执行栈为空的时候，引擎会优先处理微任务队列，处理完微任务队列里的所有任务，再去处理宏任务


console.log("=============自己实现 Promise=================")
function MyPromise(executor) {
    const self = this
    this.status = "pending" // pending/fulfilled/rejected
    this.value = null
    this.reason = null
    this.onFulFilledFunc = Function.prototype
    this.onRejectedFunc = Function.prototype

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if(self.status === "pending") {
                self.value = value
                self.status = "fulfilled"
                // console.log(this) // this 指向 window
    
                self.onFulFilledFunc(self.value)
            }
        });
    }

    function reject(reason) {
        setTimeout(() => {
            if(self.status === "pending") {
                self.reason = reason
                self.status = "rejected"
    
                self.onRejectedFunc(self.reason)
            }
        })
    }

    executor(resolve, reject)

}

MyPromise.prototype.then = function(onfulfilled = Function.prototype, onrejected = Function.prototype) {

    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : data => data
    onrejected = typeof onrejected === "function" ? onrejected : error => {throw error}

    if(this.status === "fulfilled") {
        onfulfilled(this.value)
    }
    if(this.status === "rejected") {
        onrejected(this.reason)
    }
    if(this.status === "pending") {
        this.onFulFilledFunc = onfulfilled
        this.onRejectedFunc = onrejected
    }

}


let promise1 = new MyPromise((resolve, reject) => {
    console.log("promise constructor")
    resolve("data")
})
promise1.then(data => {
    console.log(data)
})
console.log("end")

// let promise2 = new MyPromise((resolve, reject) => {
//     reject("data")
//     reject("error")
// })
// promise2.then(data => {
//     console.log(data)
// }, error => {
//     console.log(error)
// })

// let promise3 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("data")
//     }, 2000)
// })
// promise3.then(data => {
//     console.log(data)
// })
