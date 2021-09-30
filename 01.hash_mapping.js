// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标
let twoSum = function(nums, target) {
    let map = new Map()
    for(let i = 0; i < nums.length; i++) {      
        if(map.has(nums[i])) {
            return [map.get(nums[i]), i]
        } else {
            map.set(target - nums[i], i)

        }
    }
    return []
}

// let nums = [2,7,11,15]
// let target = 9
// console.log(twoSum(nums, target))


// 给定两个数组，编写一个函数来计算它们的交集
let intersection = function(nums1, nums2) {
    let len1 = nums1.length
    let len2 = nums2.length
    if(len1 === 0 || len2 === 0) {
        return []
    }
    let map = new Map()
    let ret = []
    for(let m of nums1) {
        map.set(m, true)
    }

    for(let m of nums2) {
        if(map.get(m)) {
            ret.push(m)
            map.set(m, false)
        }
    }

    return ret
}

// let nums1 = [1, 2, 2, 1]
// let nums2 = [2, 2]
// let result = intersection(nums1, nums2)
// console.log(result)


// 罗马数字转整数
let romanToInt = function(roman) {
    const map = {
        I: 1,
        V: 5,
        IV: 4,
        IX: 9,
        X: 10,
        XL: 40,
        XC: 90,
        L: 50,
        C: 100,
        CD: 400,
        CM: 900,
        D: 500,
        M: 1000
    }
    num = 0
    for(let i = 0; i < roman.length; i++) {
        let meta = roman[i]
        if(map[meta] === undefined) {
            console.log("罗马数字中包含非法字符")
            return undefined
        }
        if(i + 2 <= roman.length) {
            let meta2 = roman.slice(i, i+2)
            if(map[meta2] !== undefined) {
                meta = meta2
                i++
            }
        }
        num += map[meta]
    }

    return num
}

// let roman = "CXCIX"
// console.log(romanToInt(roman))


// 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，则返回空字符串
let commonString = function(str_array) {
    let len = str_array.length
    let common = ""
    if(len === 0) {
        return ""
    }
    let short_str = str_array[0]
    for(let i = 1; i < len; i++) {
        if(short_str.length > str_array[i].length) {
            short_str = str_array[i]
        }
    }
    for(let i = short_str.length; i > 0; i--) {
        let common_temp = short_str.slice(0, i)
        let is_prefix = str_array.every((item, index, str_array) => item.startsWith(common_temp))
        if(is_prefix) {
            return common_temp
        }
    }
    return ""
}

// let strs = ["flower","flow","flight"]
// let strs = ["dog","racecar","car"]
// let strs = ["dog"]
// console.log(commonString(strs))


// 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成
// 简单起见使用数据代替链表
let mergeTwoLists = function(arr1, arr2) {
    let len1 = arr1.length
    let len2 = arr2.length
    let i = 0
    let j = 0
    let ret = []
    while(i < len1 && j < len2) {
        let a1 = arr1[i]
        let a2 = arr2[j]
        if(a1 <= a2) {
            ret.push(a1)
            i++
        } else {
            ret.push(a2)
            j++
        }
    }

    if(i === len1) {
        ret = ret.concat(arr2.slice(j))
    }
    if(j === len2) {
        ret = ret.concat(arr1.slice(i))
    }

    return ret
}

// let arr1 = [1,2,3]
// let arr2 = [2,5,6]
// let arr1 = [1,2,4]
// let arr2 = [1,3,4]
// console.log(mergeTwoLists(arr1, arr2))


// 给定两个字符串 haystack 和 needle，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回 -1
let indexOf = function(haystack, needle) {
    let haystack_len = haystack.length
    let needle_len = needle.length
    if(haystack_len < needle_len) return -1

    for(let i = 0; i < haystack_len; i++) {
        if(i + needle_len <= haystack_len) {
            let sub_str = haystack.slice(i, i + needle_len)
            if(sub_str === needle) return i
        } else {
            break
        }
    }
    return -1
}

// let haystack = "aaaaaa"
// let needle = "bba"
// console.log(indexOf(haystack, needle))

// console.log(needle.slice(0, 10))


// 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行
let generate = function(num_rows) {
    let ret = [[1]]
    for(let i = 1; i <= num_rows; i++) {
        let temp = []
        for(let j = 0; j < i+1; j++) {
            if(j === 0) {
                temp.push(1)
                continue
            }
            if(j === i) {
                temp.push(1)
                continue
            }
            let last_row = ret[i - 1]
            temp.push(last_row[j - 1] + last_row[j])
        }
        ret.push(temp)
    }

    return ret
}
// let num_rows = 5
// console.log(generate(5))


// 给定一个数组 prices，它的第 i 个元素 prices[i] 表示一支股票第 i 天的价格。
// 你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。设计一个算法来计算你所能获取的最大利润。
var maxProfit = function(prices) {
    let profit = 0
    let min = prices[0]
    for(let i = 1; i < prices.length; i++) {
        if(prices[i] < min) {
            min = prices[i]
        } else {
            profit = Math.max(profit, prices[i] - min)
        }
    }
    return profit
}

// let prices = [20, 10, 30, 5, 6, 7, 8]
// console.log(maxProfit(prices))

// 给定一个数组 prices，它的第 i 个元素 prices[i] 表示一支股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）
let maxProfit2 = function(prices) {
    let profit = 0
    let buy_p = -1 // 表示还未购买
    for(let i = 0; i < prices.length - 1; i++) {
        if(prices[i] < prices[i + 1]) { // 计算买入点
            if(buy_p === -1) {
                buy_p = prices[i]
            }
        }
        if(buy_p !==-1 && prices[i] > prices[i + 1]) { // 计算卖出点
            profit += prices[i] - buy_p
            buy_p = -1
        }
    }

    let last_p = prices[prices.length - 1]
    if(buy_p !==-1 && last_p > buy_p) {
        profit += last_p - buy_p
    }

    return profit
}

// let prices = [7,1,5,3,6,4]
// let prices = [1,2,3,4,5]
let prices = [7,6,4,3,1]
console.log(maxProfit2(prices))