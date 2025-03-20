
var subsets = function(nums) {
    let result = []
    function subs(i,s) {
        if(i == nums.length) {
            result.push([...s])
            return
        }
        s.push(nums[i])
        subs(i+1,s)
        s.pop()
        subs(i+1,s)
    }

    subs(0,[])
    return result
};

let nums = [1,2,3]
// Output
// [[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3],[]]