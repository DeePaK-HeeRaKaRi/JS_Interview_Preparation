/*
https://leetcode.com/discuss/post/6638321/goldman-sachs-coderpad-test-by-anonymous-exqs/

Q1. Walking robot starts at (0,0) coordinates and where the input string contains 'UDLR' 
to determine path like up down left and right and we have to return final coordinate it is at.

*/

function findCoordinate(path) {
    const directions = {
        U: [-1, 0],
        D: [1, 0],
        L: [0, -1],
        R: [0, 1]
    };

    let result = [0, 0];

    for (let move of path) {
        const [dx, dy] = directions[move];
        result = [result[0] + dx, result[1] + dy];
    }

    return result;
}

// Example usage:
console.log(findCoordinate("URDL")); // Output: [0, 0]
console.log(findCoordinate("UUDDLRLR")); // Output: [0, 0]
console.log(findCoordinate("UUU")); // Output: [-3, 0]