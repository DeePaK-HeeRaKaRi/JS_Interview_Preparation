/*
Since it's a permutation:

If the maximum value seen till index i is i,
then:

There are exactly i+1 elements in that prefix

And they must be {0,1,2,...,i}

So the prefix is self-contained.

Greedy works here

*/

var maxChunksToSorted = function(arr) {
    let max_number = -1
    let res = 0
    for(let i=0;i < arr.length; i++) {
        max_number = Math.max(max_number,arr[i])
        if(max_number == i) {
            res++
        }
    }
    return res
};

let arr = [1,0,2,3,4]
arr = [4,3,2,1,0]
arr = [3,4,5,0,1,2]
arr = [0,1,2,3,4]
arr = [0,2,1]
arr = [2,1,3,4,4]
console.log(maxChunksToSorted(arr))