


/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let result = []
    let subarr = []
    function dfs(start) {
        if(subarr.length == k){
            result.push([...subarr])
            return
        } 
        for(let i = start;i<=n;i++) {
            subarr.push(i)
            dfs(i+1)
            subarr.pop()
        }
    }
    dfs(1)
    return result
};

let n = 4
let k = 2
console.log(combine(n,k))