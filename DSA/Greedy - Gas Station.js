var canCompleteCircuit = function(gas, cost) {
    // gas  = [1,2,3,4,5]
    // cost = [3,4,5,1,2] 
    // at 0th index we have 1 & 3 which means 1unit of gas is required but the cost is 3 we cannot start at 0th index
    // The same goes for 1,2,3 index
    // at 4th index we have 4 & 1 which means 4 units of gas is required to travel to next index but the cost is 1 which means we have 4-1  = 3 , 3 more fuel is there
    // at 5th index we have 5 & 2 which 5-2 = 3 > 3 + 3 [prev fuel] = 6
    // So we can travel from 4th index 

    let gasSum = gas.reduce((prev,curr) => prev+curr,0)
    let costSum = cost.reduce((prev,curr) => prev+curr,0)
    if(gasSum < costSum) return -1
    let fuelLeft = 0
    let curIndex = 0
    let flag = true //Flag to change the index position
    for(let i=0;i<gas.length;i++) {
        // if(flag && gas[i]>cost[i]) {
        //     curIndex = i
        // }
        if(fuelLeft + (gas[i]-cost[i]) >=0) {
            fuelLeft = fuelLeft + gas[i] - cost[i]
        }else{
            curIndex = i
            fuelLeft = 0
        }
        // if(gas[i] >= cost[i]) {
        //     fuelLeft += (gas[i] - cost[i])
        //     flag = false
        // }else{
        //     flag = true
        // }
    }
    console.log({fuelLeft , curIndex,gasSum,costSum})
};
var gas = [1,2,3,4,5]
var cost = [3,4,5,1,2]
gas = [2,3,5,7,1,12]
cost = [4,7,2,6,8,4]
gas = [6,1,4,3,5]
cost = [3,8,2,4,2]
console.log(canCompleteCircuit(gas, cost))