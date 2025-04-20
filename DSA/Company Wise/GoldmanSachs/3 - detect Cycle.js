// https://leetcode.com/discuss/post/1218147/goldman-coderpad-by-anonymous_user-qk2i/

function findCycleLength(arr,index) {
    let n = arr.length
    let slow = index
    let fast = index
    while(fast < n && fast>=0 && arr[fast] < n && arr[fast] >=0) {
        slow = arr[slow]
        fast = arr[arr[fast]]
        if(slow == fast) {
            let cycle_length = 1
            let start_index = slow
            let next_index = arr[start_index]
            while(next_index != start_index) {
                cycle_length += 1
                next_index = arr[next_index]
            }
            return cycle_length
        }
    }
    return -1
}

console.log(findCycleLength([1,0],0))
console.log(findCycleLength([1,2,0],0))
console.log(findCycleLength([1,2,3,4,2],0))
console.log(findCycleLength([5,4,3,2,1],0))
console.log(findCycleLength([1,3,0,1],0))