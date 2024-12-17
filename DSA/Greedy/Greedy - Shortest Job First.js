function sjf(bt) {
    let n = bt.length
    bt = bt.sort((a,b) => a-b)  //scheduling policy that selects the waiting process with the smallest execution time to execute next.
    let total_wait_time = 0
    let cur_wait_time = 0

    for(let i=0;i<bt.length;i++) {
        total_wait_time+=cur_wait_time // To start the next process it needs to wait for the previous process time untill it gets complete
        cur_wait_time += bt[i]
        // console.log(cur_wait_time,total_wait_time)
    }
    return Math.floor(total_wait_time/n)
}
let bt = [4,3,7,1,2]
console.log(sjf(bt))