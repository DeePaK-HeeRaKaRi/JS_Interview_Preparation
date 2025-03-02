var findClosestElements = function(arr, k, x) {
    // [1,2,3,4,5,6,7,8] k=4 x=3
    // l=0,m=2,r=4 so abs()

    let l = 0
    let r = arr.length - k
    while(l < r) {
        let mid = Math.floor((l+r)/2)
         if ((x -arr[mid]) > (arr[mid + k] -x)) {
            l = mid + 1;
        } else {
            r = mid;
        }
    }

    let res = []
    for(let i=l;i<l+k;i++){
        res.push(arr[i])
    }
    return res
};
