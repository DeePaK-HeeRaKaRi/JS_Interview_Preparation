var rearrangeArray = function(nums) {
    const result = []
    let positive = 0
    let negative = 1
    for(let i of nums){
        if(i > 0) {
            result[positive] = i;
            positive += 2
        } else {
            result[negative] = i;
            negative += 2
        }
    }
    return result
};

console.log(rearrangeArray([3,1,2,-5,-2,-4]))