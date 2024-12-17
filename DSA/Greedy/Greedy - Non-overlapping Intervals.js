var eraseOverlapIntervals = function(intervals) {
    // We need to remove the minimum 
    // To get max non overlapping intervals
    //  Same like N meetings in one room

    intervals = intervals.sort((a,b) => a[1]-b[1])
    let count = 1 //To find the max non overlapping intervals
    let prevEndTime = intervals[0][1]
    for(let i=1;i<intervals.length;i++) {
        let currStartTime = intervals[i][0]
        if(prevEndTime <= currStartTime) {
            count++
            prevEndTime = intervals[i][1]
        }
    }
    return intervals.length - count
};

let intervals = [[1,2],[2,3],[3,4],[1,3]]
intervals = [[1,2],[1,2],[1,2]]
console.log(eraseOverlapIntervals(intervals))