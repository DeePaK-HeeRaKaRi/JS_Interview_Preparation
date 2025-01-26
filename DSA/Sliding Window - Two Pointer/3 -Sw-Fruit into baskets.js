var totalFruit = function(fruits) {
    let hm = {}
    let baskets = 2
    let l = 0
    let r = 0
    let maxi = 0
    while(r<fruits.length) {
        if(hm.hasOwnProperty(fruits[r])){
            hm[fruits[r]]+=1
        }
        else{
            hm[fruits[r]] = 1
        }
        if(Object.keys(hm).length > baskets) {
            hm[fruits[l]]--
            if(hm[fruits[l]] == 0){
                delete hm[fruits[l]]
            }
            l++
        }
        if(Object.keys(hm).length <= baskets) {
            maxi = Math.max(maxi,r-l+1)
        }
        r++
    }
    return maxi
};

let fruits = [1,2,2,2,3,1,1]
console.log(totalFruit(fruits))