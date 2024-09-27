var maxTurbulenceSize = function(arr) {
    if(arr.length == 1) return 1
    let l = 0
    let r = 0
    let ans = 1
    while(r < arr.length) {
        if(((r%2 == 0) && (arr[r] < arr[r+1])) || ((r%2 == 1) && (arr[r] > arr[r+1]))) {
            ans = Math.max(ans,r-l+2)
        }else {
            // l = Math.max(l+1,r+1)
            l = r+1
        }
        r++
    }

    l = 0
    r = 0
    let ans1 = 1
    while(r < arr.length) {
        if(((r%2 == 0) && (arr[r] > arr[r+1])) || ((r%2 == 1) && (arr[r] < arr[r+1]))) {
            ans1 = Math.max(ans1,r-l+2)
        }else {
            // l = Math.max(l+1,r+1)
            l = r+1
        }
        r++
    }
    console.log(ans,ans1)
    return Math.max(ans,ans1)
};

let arr = [9,4,2,10,7,8,8,1,9]
arr = [4,8,12,16]
arr = [0,1,1,0,1,0,1,1,0,0]
console.log(maxTurbulenceSize(arr))