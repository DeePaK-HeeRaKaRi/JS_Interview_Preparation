function myReduce(input, callback, initialValue) {
    if (input == null) {
        throw new TypeError("Input should not be null or undefined");
    }
    
    let entries;
    let index = 0;
    let accumulator;

    // Check if input is an array or object
    if (Array.isArray(input)) {
        entries = input;
    } else if (typeof input === "object") {
        entries = Object.entries(input).map(([key, value]) => ({ key, value })); // Convert to array of objects
        console.log({entries})
    } else {
        throw new TypeError("myReduce only works on arrays and objects");
    }

    const length = entries.length;

    if (length === 0) {
        if (initialValue === undefined) {
            throw new TypeError("You must pass an initial value if the array or object is empty");
        }
        return initialValue;
    }

    if (initialValue !== undefined) {
        accumulator = initialValue;
    } else {
        accumulator = entries[0].value ?? entries[0]; // Use the first value for objects or arrays
        index = 1;
    }

    while (index < length) {
        const current = entries[index].value ?? entries[index]; // Handle both arrays and objects
        const key = entries[index].key ?? index; // Use key for objects, index for arrays
        accumulator = callback(accumulator, current, key, input);
        index++;
    }

    return accumulator;
}

const arr = [1, 2, 3, 4];
const sumArr = myReduce(arr, (prev, cur) => prev + cur, 0);
console.log(sumArr); // Output: 10

const obj = { a: 1, b: 2, c: 3, d: 4 };
const sumObj = myReduce(obj, (prev, cur, key) => {
    // console.log(`Processing key: ${key}, prev: ${prev}, cur: ${cur}`);
    return prev + cur;
}, 0);
console.log(sumObj); // Output: 10
