var combinationSum3 = function(k, n) {
    if(k > n) return []
    let arr = [1,2,3,4,5,6,7,8,9]
    let result = []
    function dfs(i,target,subarr) {
        if(target == 0 && subarr.length == k){
            result.push([...subarr])
            return
        } 
        for(let j = i;j<arr.length;j++) {
            if(arr[j]<=target) {
                subarr.push(arr[j])
                dfs(j+1,target-arr[j],subarr)
                subarr.pop()
            }
            else{
                break
            }
        }
    }
    dfs(0,n,[])
    return result
};

let k = 3
let n = 9
print(combinationSum3(k,n))
//Output: [[1,2,6],[1,3,5],[2,3,4]]