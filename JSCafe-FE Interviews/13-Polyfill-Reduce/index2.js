Object.prototype.myReduce = function (callback, initialValue) {
    const obj = this;
    const entries = Object.entries(obj); // Convert the object into an array of [key, value] pairs
    if (!entries) throw new Error('Object should not be undefined');
    let index = 0;
    const n = entries.length;
    let preValue;

    if (n === 0) {
        if (initialValue !== undefined) {
            return initialValue;
        } else {
            throw new Error('You must pass initial Value if the object is empty');
        }
    }

    if (initialValue !== undefined) {
        preValue = initialValue;
    } else {
        preValue = entries[index][1]; // Use the value of the first entry as the initial value
        index += 1;
    }

    while (index < n) {
        const [key, value] = entries[index];
        preValue = callback(preValue, value, key, obj);
        index += 1;
    }

    return preValue;
};

// Example usage
const obj = { a: 1, b: 2, c: 3, d: 4 };
const callback = (prev, cur, key) => {
    console.log(`Reducing key: ${key}, prev: ${prev}, cur: ${cur}`);
    return prev + cur;
};
const initialValue = 10;
const result = obj.myReduce(callback, initialValue);
console.log(result); // Output: 20
