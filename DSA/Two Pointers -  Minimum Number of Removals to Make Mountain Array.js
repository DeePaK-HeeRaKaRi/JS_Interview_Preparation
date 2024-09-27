// node './Two Pointers -  Minimum Number of Removals to Make Mountain Array.js'
var minimumMountainRemovals = function(nums) {
    let arr = [nums[0]]
    let r =1
    let l =0
    while(r < nums.length) {
        if(nums[l]==nums[r]){
            l=r
        }else{
            arr.push(nums[r])
            l=r
        }
        r++
    }
    // console.log('---------',arr)
    let n = arr.length
    let left = new Array(n).fill(0)
    let right = new Array(n).fill(0)
    let ans = 0
    // from left to right compare the curent index elemnt with the previous element [increasing order]
    let leftCount = 0
    let rightCount = 0
    for(let i=1;i<n;i++){
        if(arr[i-1] < arr[i]){
            leftCount += 1
            // left[i] = left[i-1]+1
            left[i] = leftCount
        }
    }

    // from right to left compare the  current index with next index element [decreasing order]
    for(let i=n-2;i>=0;i--){
        if(arr[i] > arr[i+1]) {
            rightCount+=1
            right[i] = rightCount
            // right[i] = right[i+1]+1
        }

        if(left[i] && right[i]) {
            ans=Math.max(ans,left[i]+right[i]+1)
        }
    }
    // console.log(left)
    // console.log(right)
    // console.log(nums.length - ans)
    // for(let i=0;i<n;i++) {
    //     if(left[i] && right[i]) {
    //         ans=Math.max(ans,left[i]+right[i]+1)
    //     }
    // }
    return nums.length - ans
};

let nums = [2,1,1,5,6,2,3,1]
// nums = [1,3,1]
// nums = [1,2,3,4,4,3,2,1]
console.log(minimumMountainRemovals(nums))