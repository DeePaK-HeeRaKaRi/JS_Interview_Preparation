var wiggleSort = function(nums) {
    const nums1 = [...nums.sort((a,b) => a-b)]
    let n=nums1.length - 1
    let mid = Math.floor(n/2)
    let high = n

    for(let i=0;i<nums1.length;i++) {
        if(i%2 == 0) {
            nums[i] = nums1[mid]
            mid--
        }
        else {
            nums[i] = nums1[high]
            high--
        }
    }
    return nums

    // const nums1 = [...nums.sort((a,b) => a-b)]
    // let n=nums1.length - 1
    // let mid = Math.floor(n/2)
    // let high = n
    // let i = 0
    // let j = 1
    // console.log(mid)
    // let flag = true
    // while(high != Math.floor(n/2) || mid >=0) {
    //     if(flag) {
    //         // res.push(nums[mid])
    //         nums[i] = nums1[mid]
    //         mid--
    //         i+=2
    //         flag = false
    //     }
    //     else{
    //         // res.push(nums[high])
    //         nums[j] = nums1[high]
    //         j+=2
    //         high--
    //         flag = true
    //     }
    // }
    // return nums
};


let nums  = [1,3,2,2,3,1]

// nums  = [1,2,3]
// nums = [1,5,1,1,6,4]
console.log(wiggleSort(nums))