var subsetsWithDup = function(arr) {
    let result = []
    let n = arr.length
    arr.sort((a,b) => a-b) // To maintain the order
    function dfs(i,sub) {
        result.push([...sub])
        for(let j= i;j<n;j++) {
            if(j>i && arr[j] == arr[j-1]) continue

            sub.push(arr[j])
            dfs(j+1,sub)
            sub.pop()
        }
    }
    dfs(0,[])
    return result
};

let arr = [4,4,4,1,4]
//output = [[],[1],[1,4],[1,4,4],[1,4,4,4],[1,4,4,4,4],[4],[4,4],[4,4,4],[4,4,4,4]]
console.log(subsetsWithDup(arr))