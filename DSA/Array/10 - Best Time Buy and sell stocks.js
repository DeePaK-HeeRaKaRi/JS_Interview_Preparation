var maxProfit = function(prices) {
    let maxi = 0
    let curr_stock = Infinity
    for(let i of prices) {
        curr_stock = Math.min(curr_stock,i)
        if(i > curr_stock) {
            maxi = Math.max(maxi,i-curr_stock)
        }
    }
    return maxi
};


let prices = [7,1,5,3,6,4]
prices = [7,6,4,3,1]
console.log(maxProfit(prices))