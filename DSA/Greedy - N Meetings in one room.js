function nMeetings(start,end){
    let meetings = [];
    for(let i = 0; i < start.length; i++){
        meetings.push([start[i],end[i],i+1])
    }
    // Think in terms of greedy > if you complete the meeting early you can attend more meetings 
    // So sort in terms of endTime
    meetings.sort((a,b) => a[1]-b[1])
    console.log(meetings)
    let count = 1
    let prevEndTime = meetings[0][1]
    let ans = [meetings[0][2]] 
    for(let i = 1; i < meetings.length; i++){
        let currStartTime = meetings[i][0]
        if(prevEndTime < currStartTime) {
            count++;
            ans.push(meetings[i][2])
            prevEndTime = meetings[i][1]
        }
    }

    return {count,ans}
}
let start = [0,3,1,5,5,8]
let end = [5,4,2,9,7,9]
console.log(nMeetings(start,end))