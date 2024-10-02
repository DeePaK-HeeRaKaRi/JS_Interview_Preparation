// GFG
function maxSum(arr,k) {
    arr = arr.sort((a, b) => a - b); 
    let l = 0;
    let r = arr.length - 1; 
    let ans = [-1, -1]; 
    let prevSum = -Infinity; 
    let prevAbs = -Infinity; 
    while (l < r) {
        let currSum = arr[l] + arr[r];

        if (currSum >= k) {
            r--; // Move the right pointer left if the sum is greater than or equal to K
        } else {
            // Update if the current sum is larger or if the absolute difference is larger  the same sum
            let absDiff = Math.abs(arr[l] - arr[r]);
            if (currSum > prevSum || ( absDiff > prevAbs)) {
                ans = [arr[l], arr[r]];
                prevSum = currSum;
                prevAbs = absDiff;
            }
            l++; // Move the left pointer right to check other pairs
        }
    }

    return ans;
}

let arr = [2, 3, 4, 6, 8, 10]
let k = 10
// arr = [2, 3, 4, 6, 8, 10]
// k = 0

// arr = [96,43,28,37]
// k = 92
console.log(maxSum(arr,k))