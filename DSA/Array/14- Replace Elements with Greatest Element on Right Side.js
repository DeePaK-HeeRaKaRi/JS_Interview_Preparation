var replaceElements = function(arr) {
    let n = arr.length
    let max_element = -1
    let ans = [max_element]
    for(let i=n-1;i>=1;i--) {
        max_element = Math.max(max_element,arr[i])
        ans.unshift(max_element)
    }
    return ans
};

let arr = [17,18,5,4,6,1]
arr = [400]
console.log(replaceElements(arr))