
function longest_subArray_positives(arr, k) {
    let max_length = 0;
    let l=0
    let r = 0
    let s = 0
    while(r<arr.length) {
        s+=arr[r]
       
        while(l<=r && s > k) {
            s-=arr[l]
            l++
        }

        if(s == k ) {
            max_length = Math.max(max_length,r-l+1)
        }

        r++
    }
    return max_length
}
let arr=[10, 5, 2, 7, 1, 9]
let k = 15
arr = [1, -1, 5, -2, 3]
k = 3
console.log('longest_subArray_positives',longest_subArray_positives(arr,k))

function longest_subarra_pos_neg(arr,k) {
    let max_len = 0
    let s = 0
    let hm = {}
    for(let i=0; i<arr.length;i++) {
        s+=arr[i]
        if(s == k) {
            max_len = Math.max(max_len,i+1)
        }
        let rem = s - k
        if(rem in hm) { //[15,-2,2,-8,1,7] 15
            max_len = Math.max(max_len,i-hm[rem])
        }
        if(!(s in hm) ) {
            hm[s] = i
        }
    }

    return max_len
}
let arr1 = [1, -1, 5, -2, 3]
let k1 = 3

console.log('longest_subarra_pos_neg',longest_subarra_pos_neg(arr1,k1))
