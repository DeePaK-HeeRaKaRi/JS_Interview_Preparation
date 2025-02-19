function bfs(i,vis,adjList) {
    vis[i] = 1
    let s = [i]
    let curr 
    let head = 0
    // s.length > 0
    while( head < s.length) {
            // curr = s.shift()
            curr = s[head++]
            for(let t of adjList.get(curr)) {
                if(vis[t] == 0) {
                    s.push(t)
                    vis[t] = 1
                }
            }
    }
}

let V = 3
let adj = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
   ]
let adjList = new Map()
for(let i=0;i<V;i++) {
    adjList.set(i,[])
}

for(let i=0;i<V;i++){
    for(let j=0;j<V;j++) {
        if(i!=j && adj[i][j]==1 ){
            adjList.get(i).push(j)
            adjList.get(j).push(i)
        }
    }
}

// console.log(adjList)
let vis = new Array(V).fill(0)
// console.log(vis)
let res = 0
for(let i=0;i<V;i++) {
    // console.log(i)
    if(vis[i] == 0) {
        res++
        bfs(i,vis,adjList)
    }
}

console.log(res)