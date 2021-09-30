// 给定一个整数数组，判断是否存在重复元素
const containDuplicate = function(nums) {
    let map = new Map()
    for(let i of nums) {
        if(map.has(i)) {
            return true
        }
        map.set(i, 1)
    }

    return false
}

// let nums = [1, 2, 2, 4]
// let result = containDuplicate(nums)
// console.log(result)


// 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1
const firstUniqueChar = function(string) {
    let map = new Map()
    for(let c of string) {
        map.set(c, (map.get(c) || 0) + 1)
    }
    for(let i = 0; i < string.length; i++) {
        if(map.get(string[i]) === 1) {
            return i
        }
    }
    return -1
}

// let string = "leetcode"
// let string = "leetcodeleetcode"
// let string = "loveleetcode"
// let result = firstUniqueChar(string)
// console.log(result)


// 给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词
// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词
let isAnagram = function(s, t) {
    if(s.length !== t.length) {
        return false
    }

    let s_map = new Map()
    let t_map = new Map()
    for(let i = 0; i < s.length; i++) {
        s_map.set(s[i], (s_map.get(s[i])) || 0 + 1)
        t_map.set(t[i], (t_map.get(s[i])) || 0 + 1)
    }

    for(let pair of s_map.entries()){ // 因为 s 和 t 长度相等，假设存在某个元素在 s_map 存在，但是在 t_map 不存在的情况，那必然会出现 s_map.get(pair[0]) !== pair[1] 的情况。因此仅遍历 s_map 就可以
        if(t_map.get(pair[0]) !== pair[1]) {
            return false
        }
    }

    return true
}

let isAnagram2 = function(s, t) {
    const s_len = s.length
    const t_len = t.length
    if(s_len !== t.length) {
        return false
    }

    const obj = {}
    for(let i = 0; i < s_len; i++) {
        const s_char = s[i]
        const t_char = t[i]
        obj[s_char] ? obj[s_char]++ : obj[s_char] = 1
        obj[t_char] ? obj[t_char]-- : obj[t_char] = -1
    }
    return Object.values(obj).every(v => v === 0)
}

// let s = "anagram"
// let t = "nagaram"
// console.log(isAnagram2(s, t))


// 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 n/2 的元素
let majorityElement = function(array) {
    let threshold = array.length / 2
    if(threshold === 0) {
        return array
    }
    let map = new Map()
    for(let item of array) {
        map[item] = (map[item] || 0) + 1
        if(map[item] > threshold) return item // 次数大于 n/2 的元素只会有一个，假设有两个的话，那数组总个数就大于 n 了
    }
}

// let array = [3,2,3]
// console.log(majorityElement(array))


// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 说明：你的算法应该具有线性时间复杂度。你可以不引用额外空间来实现吗 ？
let singleNumber = function(array) { // 不引用额外空间需要用异或操作处理，不考虑
    let map = new Map()
    for(let e of array) {
        // map[e] = (map[e] || 0) + 1
        map.set(e, (map.get(e) || 0) + 1)
    }

    console.log(map)
    for(let pair of map.entries()) {
        if(pair[1] === 1) return pair[0]
    }
}

// let array = [2,2,1]
// let array = [4,1,2,1,2]
// console.log(singleNumber(array))


// 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 ‘1’ 的个数（也被称为汉明重量）
let hammingWeight = function(num_s) {
    // num_s = num.toString(2)
    let count = 0
    for(let c of num_s) {
        if(c === '1') {
            count++
        }
    }
    return count
}

let num = '00000000000000000000000000001011'
console.log(hammingWeight(num))