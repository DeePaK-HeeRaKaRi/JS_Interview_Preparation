function InsertInterval(intervals,newInterval){
    // Note - All the intervals are sorted in startTime
    let result = [];
    let i = 0;
    let n = intervals.length
    // Left Part
    while(i<n && intervals[i][1] < newInterval[0]){
        result.push(intervals[i]);
        i++
    }

    // OverLapping Part
    let mini = newInterval[0]
    let maxi = newInterval[1]

    // CHeck the startTime and endTime of newInterval .Then Take min and max of those intervals
    while(i<n && intervals[i][0] <= newInterval[1]) {
        mini = Math.min(mini,newInterval[0],intervals[i][0])
        maxi = Math.max(maxi,newInterval[1],intervals[i][1])
        i++
    }
    result.push([mini,maxi])

    // Remaining Part
    while(i<n){
        result.push(intervals[i])
        i++
    }
    return result
}

let arr = [[1,2],[3,4],[5,7],[8,10],[12,16]]
let newInterval = [6,8]
arr = [[1,2],[3,4],[7,7],[8,10],[12,16]]
newInterval = [5,5]
console.log(InsertInterval(arr,newInterval))