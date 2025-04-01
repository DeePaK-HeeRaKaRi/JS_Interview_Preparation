function permutations(arr) {
     
    let n = arr.length;
    let result = [];
    
    function dfs(i) {
        if (i === n) {
            result.push([...arr]); // Push a copy, not a reference
            return;
        }
        
        for (let j = i; j < n; j++) {
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
            dfs(i + 1);
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap back (backtrack)
        }
    }

    dfs(0);
    return result;
}
let arr = [1,2,3] //n > n! permutations
console.log(permutations(arr))