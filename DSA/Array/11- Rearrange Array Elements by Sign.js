var rearrangeArray = function(nums) {
    let res = new Array(nums.length).fill(0)
    let odd = 1
    let even = 0
    for(let i of nums) {
        if(i>0) {  //nums starts from 1
            res[even] = i
            even+=2
        }
        else {
            res[odd] = i
            odd+=2
        }
    }
    return res

};


let nums = [3,1,-2,-5,2,-4]
console.log(rearrangeArray(nums))