// The majority element is the element that appears more than ⌊n / 2⌋ times.
//  You may assume that the majority element always exists in the array.

function majorityElement(arr) {
    let count = 1
    let element = arr[0]
    for(let i of arr.slice(1)) {
        if(count == 0) {  // No majority element so you can take the curr element has majority element. As per elements are dominated
            element = i
        }

        if(element !=i) {
            count--
        }
        else{
            count++
        }
    }
    return element
}

let arr = [3,2,3,3,5,3]
console.log(majorityElement(arr))