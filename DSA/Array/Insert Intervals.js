var insert = function(intervals, newInterval) {
    let flag = false
    for(let i=0;i<intervals.length;i++){
        if(intervals[i][0] > newInterval[0]){
            flag = true
            intervals.splice(i,0,newInterval)
            break
        }
    }
    if(flag == false){
        intervals.splice(i+1,0,newInterval)
    }
    let target = intervals[0]
    let ans = []
    intervals.forEach((interval,i)=>{
        if(target[1]>=interval[0]){
            target[1] = Math.max(target[1], interval[1]);
        }else{
            ans.push(target)
            target=interval
        }
    })
    ans.push(target)
    return ans
};
let intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]
let newInterval = [4,8]
console.log(insert(intervals,newInterval))