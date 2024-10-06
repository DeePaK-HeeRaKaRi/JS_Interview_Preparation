
function nextPermutation(nums) {

    //  Using recursion TC => O(N!*N)
    let n = nums.length;

    let ind = -1
    for(let i=n-2;i>=0;i--) {
        if(nums[i] < nums[i+1]) {
            ind = i
            break
        }
    }

    console.log(ind)
    if(ind == -1) return nums.reverse()

    for(let i=n-1;i>=ind;i--) {
        // Find next greater for nums[ind] and swap
        if(nums[i] > nums[ind]) {
            [nums[i],nums[ind]] = [nums[ind],nums[i]] 
            break
        }
    }

    // return [...nums.splice(0,ind+1),...nums.sort((a,b) => a-b)]
    // nums = [...nums.slice(0,ind+1),...nums.slice(ind+1).sort((a,b) => a-b)]
    
    //  Instead of sorting you can reverse
    let left = ind + 1;
    let right = n - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }

    console.log(nums)
    return  nums
}


let nums = [2,1,5,4,3,0,0]
nums = [1,3,2]
nums = [3,2,1]
nums = [1,1,5]
nums = [1,3,2]
console.log(nextPermutation(nums))

// The next permutation algorithm aims to find the next largest permutation in lexicographic order. 
// Lexicographical order refers to the natural "dictionary" order of sequences.