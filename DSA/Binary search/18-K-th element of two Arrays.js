function kthElement(arr1,arr2,k) {
    if(arr2.length < arr1.length) {
        return kthElement(arr2,arr1,k);
    }

    let n1 = arr1.length
    let n2 = arr2.length
    let low = Math.max(0,k-n2) // a1len = 6 a2len = 5 k=7
    let high = Math.min(k,n1)

    console.log({n1,n2,arr1,arr2})
    let left = k
    while(low <= high) { 
        let cut_1 = Math.floor((low+high) / 2)
        let cut_2 = left - cut_1
        let l1 = -Infinity
        let l2 = -Infinity
        let r1 = Infinity
        let r2 = Infinity
    
        if(cut_1 != 0) {
            l1 = arr1[cut_1 - 1]
        }

        if(cut_2 != 0) {
            l2 = arr2[cut_2-1]
        }

        if(cut_1 != n1) {
            r1 = arr1[cut_1]
        }

        if(cut_2 != n2) {
            r2 = arr2[cut_2]
        }

        if( l1<=r2 && l2<=r1) { // means comparing all the left elements should be less than right elements
            // if((n1+n2) % 2 == 0) {
            //     return (Math.max(l1,l2) + Math.min(r1,r2))/2
            // }
            return Math.max(l1,l2)
        }
        else if(l1 > r2) {
            high = cut_1 - 1
        }
        else{
            low = cut_1 + 1
        }
    }
    console.log({low,high})
    // return null
}

let arr1 = [7,12,14,15]
let arr2 = [1,2,3,4,9,11]

arr1 = [2,3,6,7,9]
arr2 = [1,4,8,10]
k = 5

// k = 7
// arr1= [100, 112, 256, 349, 770]
// arr2= [72, 86, 113, 119, 265, 445, 892]
console.log(kthElement(arr1, arr2,k))