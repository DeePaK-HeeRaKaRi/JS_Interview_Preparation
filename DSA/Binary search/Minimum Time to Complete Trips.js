var minimumTime = function(time, totalTrips) {
    function calculateTime(currTrip){
        let count = 0
        for(let i of time) {
            count += Math.floor(currTrip / i)
            // console.log({count})
            if(totalTrips <= count) return true
        }
        return false
    }

    
    let n = time.length
    // time[2], trips=6 so worts case it will have is 2*6 = 12
    // 2>1,4>2,6>3,8>4,10>5,12>6
    let start = 1
    let end = Math.max(...time)*totalTrips    
    while(start <= end) {
        // console.log({start,end})
        let mid = Math.floor((start + end) / 2)
        let canFinish = calculateTime(mid)
        if(canFinish) {
            end = mid - 1
        }
        else{
            start = mid + 1
        }
    }
    return start
};

let time = [1,2,3]
let totalTrips = 5
time = [2]  // 2>1,4>2,6>3,8>4,10>5,12>6
trips = 6
console.log(minimumTime(time, totalTrips))
