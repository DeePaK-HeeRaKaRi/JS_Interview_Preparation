function findMedian(arr1,arr2) {
    if(arr2.length < arr1.length) {
        return findMedian(arr2,arr1);
    }

    let n1 = arr1.length
    let n2 = arr2.length
    let low = 0
    let high = n1

    console.log({n1,n2,arr1,arr2})
     
    while(low <= high) {
        let cut_1 = Math.floor((low+high) / 2)
        let cut_2 = Math.floor((n1+n2+1)/2) - cut_1
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
            if((n1+n2) % 2 == 0) {
                return (Math.max(l1,l2) + Math.min(r1,r2))/2
            }
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

arr1 = [1,3]
arr2 = [2]

arr1 = []
arr2 =[1,2,3,4,5]

arr1 = []
arr2 =[2,3]

arr1 = [4]
arr2 = [1,2,3,4,5,6]
console.log(findMedian(arr1, arr2))