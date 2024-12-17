function jobSequencing(arr) {
    let sortByProfit = arr.sort((a,b) => b[2]-a[2])
    let maxDeadline = arr.reduce((prev,curr) => Math.max(prev,curr[1]),0)
    let deadlineArr = new Array(maxDeadline+1).fill(-1)
    let maxProfit = 0
    let count = 0
    for(let i=0;i<arr.length;i++) {
        let getJobId = sortByProfit[i][0]
        let getCurrDeadline = sortByProfit[i][1]
        let getCUrrProfit = sortByProfit[i][2]

        if(deadlineArr[getCurrDeadline] == -1) {
            deadlineArr[getCurrDeadline] = getJobId
            maxProfit += getCUrrProfit
            count++
        }
        else{
            for(let j=getCurrDeadline-1;j>=0;j--) {
                if(deadlineArr[j] == -1) {
                    deadlineArr[getCurrDeadline] = getJobId
                    maxProfit += getCUrrProfit
                    count++
                    break
                }
            }
        }
    }

    return {count,maxProfit}
}
let arr = [
  [6, 2, 80],
  [3, 6, 70],
  [4, 6, 65],
  [2, 5, 60],
  [5, 4, 25],
  [8, 2, 22],
  [1, 4, 20],
  [7, 2, 10],
];

console.log(jobSequencing(arr))