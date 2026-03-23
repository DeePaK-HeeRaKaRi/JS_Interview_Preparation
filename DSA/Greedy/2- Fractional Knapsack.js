function fractionalKnapsack(values, weights, capacity) {
    let n = values.length;

    let items = [];

    // Create array with weight, value, ratio
    for (let i = 0; i < n; i++) {
        let ratio = values[i] / weights[i];
        items.push([weights[i], values[i], ratio]);
    }

    // Sort by ratio descending
    items.sort((a, b) => b[2] - a[2]);

    let curWt = 0;
    let curVal = 0;

    for (let i = 0; i < n; i++) {
        if (curWt + items[i][0] <= capacity) {
            curVal += items[i][1];
            curWt += items[i][0];
        } else {
            let rem = capacity - curWt;
            curVal += (items[i][1] / items[i][0]) * rem;
            break;
        }
    }

    return curVal;
}

// Example
let val = [60, 100, 120];
let wt = [10, 20, 30];
let capacity = 50;

console.log(fractionalKnapsack(val, wt, capacity)); // 240

/* we want to maximize value per unit weight.
So we always pick the item with highest value/weight ratio first.
This greedy choice ensures maximum profit. */