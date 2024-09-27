function mergeInterval(intervals) {
    intervals.sort((a,b) => a[0]-b[0])
    let result = [intervals[0]]
    for (let i = 1; i < intervals.length; i++) {
       let prevInterval = result[result.length-1]
       let curInterval = intervals[i]
       if(prevInterval[1] >= curInterval[0]){
            result.pop()
            result.push([prevInterval[0], Math.max(prevInterval[1],curInterval[1])])
       }
       else {
        result.push(intervals[i])
       }
    }

    return result
}

let intervals = [[1,2],[3,4],[5,9],[8,10],[12,16]]
intervals = [[1,2],[2,4],[5,6],[7,8],[8,9]]
intervals = [[7,9],[6,6]]
intervals = [[1,4],[0,0]]
// intervals = [[2,3],[4,5],[6,7],[8,9],[1,10]]
intervals =[[2,3],[5,5],[2,2],[3,4],[3,4]]
console.log(mergeInterval(intervals))