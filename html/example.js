function debounce(fn) {
    let timeout = null
    
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(this, arguments)
        }, 500)
    }
}

function sayHi(event) {
    console.log("防抖成功", event.target.value)
}

let nameInput = document.getElementById("name")
nameInput.addEventListener("input", debounce(sayHi))


function throttle(fn) {
    let canRun = true

    return function() {
        if(!canRun) return
        canRun = false
        setTimeout(() => {
            fn.apply(this, arguments)
            canRun = true
        }, 1000)
    }
}

function sayHi2(event) {
    console.log("节流成功", event.target.value)
}

let passwordInput = document.getElementById("password")
passwordInput.addEventListener("input", throttle(sayHi2))

