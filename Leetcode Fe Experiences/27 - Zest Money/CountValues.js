
/*

https://saideepesh.hashnode.dev/frontend-engineer-interview-experience-at-zestmoney

Given an array of objects [{banana: 5, apples:5}, {pear: 6}, {apples: 5}, {banana:2}], return an object with the sum of all the fruits

Ex: { apples: 10, banana: 7, pear:6 }

*/


function countValues(obj) {
    // let result= {}
    // for(let current of obj) {
    //     for(let key in current) {
    //         result[key] = (result[key] || 0) + current[key];
    //     }
    // }

    // return result

    return obj.reduce((prev,curr) => {
        for(let key in curr) {
            prev[key] = (prev[key] || 0) + curr[key];
        }
        return prev
    },{})

}
let obj = [{banana: 5, apples:5}, {pear: 6}, {apples: 5}, {banana:2}]
console.log(countValues(obj))