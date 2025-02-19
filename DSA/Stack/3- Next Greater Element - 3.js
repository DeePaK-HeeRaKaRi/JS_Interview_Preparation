
var nextGreaterElement = function(n) {
   // n is a int , convert to list
   let arr = String(n).split('').map(Number)

   let t = arr.length

    // Find the first index from the right where arr[i] < arr[i + 1]
   let i = t-2
   while(i >= 0 && arr[i] >= arr[i+1]) {
        i--
   }

   if(i<0) return -1 //No more index left

   //Find the  digit on the right of arr[i] that is next larger than arr[j]
   let j = t-1
   while(arr[j] <= arr[i]) {
    j--
   }

   [arr[i],arr[j]] = [arr[j],arr[i]]

   // Now reverse from i+1 to t-1
   let left = i+1
   let right = t-1
   while(left <= right) {
        [arr[left],arr[right]] = [arr[right],arr[left]]
        left++
        right--
   }
   

   let res = Number(arr.join(''))
   return res
};

let n = 125431
console.log(nextGreaterElement(n))