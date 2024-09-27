var findCheapestPrice = function(n, flights, src, dst, k) {
    let adjList = new Map()
    let priceList = new Array(n).fill(Infinity)
    let queue = []
    for(let i of flights) {
        let s = i[0]
        let d = i[1]
        let price = i[2]
        if(adjList.has(s)) {
            let getCurr = adjList.get(s)
            adjList.set(s,[...getCurr,[d,price]])
        }else{
            adjList.set(s,[[d,price]])
        }
    }
    
    let stopCount = 0
    let currPrice = 0
    queue.push([stopCount,src,currPrice])
    while(queue.length > 0) {
        let [stopCount,currNode,currPrice] = queue.shift() 
        if(stopCount > k) {
            break
        }
        if(adjList.has(currNode)) {
            for(let [dstNode,price] of adjList.get(currNode)) {
                let totalPrice = currPrice + price
                if(totalPrice < priceList[dstNode]) {
                    priceList[dstNode] = totalPrice
                    queue.push([stopCount+1,dstNode,totalPrice])
                }
            }
        }
    }  
    
    return priceList[dst] == Infinity ? -1 : priceList[dst]
};
// let n = 4
// let flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
// let src = 0 
// let dst = 3
// let k = 1
let n = 3
let flights = [[0,1,100],[1,2,100],[0,2,500]]
let src = 0
let dst = 2
let k = 1
console.log(findCheapestPrice(n, flights, src, dst, k))