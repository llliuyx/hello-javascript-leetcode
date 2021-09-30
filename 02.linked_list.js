// 反转链表
// 给你单链表的头节点 head，请你反转链表，并返回反转后的链表
function Node(data) {
    this.data = data
    this.next = null
}

let create_list = function(count) {
    if(count == 0) {
        return null
    }
    let head = new Node(0)
    let previous = head
    for(let i = 1; i < count; i++) {
        let o = new Node(i)
        previous.next = o
        previous = o
    }
    return head
}

let print_list = function(header) {
    let node = header
    let result = []
    while(node) {
        result.push(node.data)
        node = node.next
    }
    console.log(result)
}

let src_list = create_list(5)


let revert_list = function(header) {
    let node = header
    let previous = null
    while(node) {
        let next = node.next
        node.next = previous
        previous = node
        node = next
    }
    return previous
}

// console.log("src_list: ")
// print_list(src_list)
// dest_list = revert_list(src_list)
// console.log("dest_list: ")
// print_list(dest_list)


// 双指针
// 删除数组中的重复项
// 给你一个有序数组 nums，请你原地删除重复出现的元素，使每个元素只出现一次，返回删除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组，并在使用 O(1) 额外空间的条件下完成

remove_repeat = function(nums) {
    let later_i = 0
    for(let front_i = 1; front_i < nums.length; front_i++) {
        if (nums[later_i] == nums[front_i]) {
            // 相等，需要删除 front
            while(front_i + 1 < nums.length) {                
                front_i++
                if(nums[later_i] !== nums[front_i]) {
                    nums[++later_i] = nums[front_i]
                    break
                }
            }
        } else {
            // 不相等，later_i 前移
            later_i++
        }
    }
    return nums.slice(0, later_i + 1)
}

nums = [1, 1, 2, 2, 2, 2, 2, 3]
dest_nums = remove_repeat(nums)
console.log(dest_nums)