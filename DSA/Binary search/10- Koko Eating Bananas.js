var minEatingSpeed = function(piles, h) {
    
    function findTime(curr) {
        let time = 0;
        for (let pile of piles) {
            time += Math.ceil(pile / curr)
            console.log({time})
        }

        return time
    }

    let low = 1
    let high = Math.max(...piles)
    console.log(high)
    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        let target = findTime(mid)
        console.log({target, mid})
        if(target <= h) {
            high = mid - 1
        }
        else {
            low = mid+1
        }
    }
    return low
};

let piles = [3,6,7,11]
let h=8
console.log(minEatingSpeed(piles, h))