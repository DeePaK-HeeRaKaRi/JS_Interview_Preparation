/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(arr, target) {
    let ans = []
    function comb(i,target,sub){
        if(i==arr.length || target == 0) {
           if(target == 0) {
             ans.push([...sub])
           }
           return
        }

        if(arr[i] <= target) {
            sub.push(arr[i])
            comb(i,target - arr[i],sub)
            sub.pop()
        }
        comb(i+1,target,sub)
    }

    comb(0,target,[])
    return ans
};
let candidates = [2,3,6,7]
let target = 7
console.log(combinationSum(candidates, target))
// Output: [[2,2,3],[7]]