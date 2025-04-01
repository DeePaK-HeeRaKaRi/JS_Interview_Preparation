function subsets(arr) {
    let res = []
    let n = arr.length
    function dfs(i,s) {
        if(i==n) {
            res.push(s)
            return
        }
        s+=arr[i]
        dfs(i+1,s)
        s-=arr[i]
        dfs(i+1,s)
    }
    dfs(0,0)
    return res
}

let arr = [5, 6, 7]
console.log(subsets(arr))
//Output: [0, 5, 6, 7, 11, 12, 13, 18]