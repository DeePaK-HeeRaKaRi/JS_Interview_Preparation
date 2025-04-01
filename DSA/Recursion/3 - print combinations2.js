var combinationSum2 = function(arr, target) {
    let result = []
    let n = arr.length
    arr.sort((a,b) => a-b)
    function dfs(i,target,subarr){
        if(target == 0) result.push([...subarr])
        
        for(let j=i;j<n;j++) {

            if(j>i && arr[j] == arr[j-1]) continue

            if(arr[j] <= target) {
                subarr.push(arr[j])
                dfs(j+1,target-arr[j],subarr)
                subarr.pop()
            }
            else {
                break
            }
        }
    }
    dfs(0,target,[])
    return result
};
let candidates = [10,1,2,7,6,1,5]
let target = 8
/*
Output: 
[[1,1,6],[1,2,5],[1,7],[2,6]]
*/