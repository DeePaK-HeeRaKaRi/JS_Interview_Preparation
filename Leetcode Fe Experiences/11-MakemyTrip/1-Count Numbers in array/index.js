function countNumbers(collection) {
    // write your solution below
    let count = 0
    collection.forEach((val) => {
        if (typeof val === 'number') {
            count++
        }else{
            if(typeof val === 'object') {
                if(Array.isArray(val)) {
                    count += countNumbers(val)
                }
            }
        }
    })
    return count;
};

console.log(countNumbers([ 1,"2", [3,4,[5]], function(){}, 8, 9 ]))