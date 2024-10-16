function leaders(n,arr) {
    let max_element = arr[n-1]
    let ans = [max_element]
    for(let i=n-2;i>=0;i--) {
        if(arr[i] >= max_element) {
            ans.unshift(arr[i])
            max_element = arr[i]
        }
    }
    return ans
}

let n=6
let arr = [16,17,4,3,5,2]
n=5
arr = [10,4,2,4,1]
n=1
arr=[100]
console.log(leaders(n,arr))