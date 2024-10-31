function three_sum_closest(arr,target) {
    let min_sum = Infinity
    let result = 0
    arr.sort((a,b) => a-b)
    for(let i=0;i<arr.length-2;i++) {
        let j = i+1
        let k = arr.length-1
        while(j<k) {
            let sum = arr[i]+arr[j]+arr[k]
            console.log({sum,i,j,k},arr[i],arr[j],arr[k])
            const target_diff = Math.abs(sum - target)
            if(target_diff < min_sum) {
                result = sum
                min_sum = target_diff
            }
            if(sum == target) {
                return target
            }
            else if(sum < target) {
                j++
            }
            else {
                k--
            }
        }
    }
   
    return result
}

let arr = [-1,2,1,-4]
let target = 1
// arr = [0,0,0]
// arr = [1,1,1,0]
// target = -100
console.log(three_sum_closest(arr, target)) // Output: 2