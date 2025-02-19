var trap = function(height) {
    let n = height.length
    let left = new Array(n).fill(0)
    // let right = new Array(n).fill(0)

    let l = -Infinity
    let r = -Infinity
    let ans = 0

    for(let i =0; i< n; i++) {
        l =Math.max(l,height[i])
        left[i] = l
    }

    for(let i=n-1;i>=0;i--) {
        r =Math.max(r,height[i])
        // right[i] = r
        ans += Math.abs(Math.min(left[i],r) - height[i])
    }

    // for(let i=0;i<n;i++) {
    //     ans += Math.abs(Math.min(left[i],right[i]) - height[i])
    // }

    return ans
    
};


var trap2 = function(height) {
    // Do 2 way traversal
    // Math.min(lmax,rmax) >  so get min
    //  tarverse the smaller one
    let n = height.length
    let l=0
    let r = n-1
    let lmax = 0
    let rmax = 0
    let ans = 0
    while(l<=r) {
        if(height[l] <= height[r]) {
            // If curr height >= lmax update the lmax
            if(height[l] >= lmax) {
                lmax = height[l]
            }
            else {
                ans += lmax - height[l]
            }
            l++
        }
        else {
            if(height[r] >= rmax) {
                rmax = height[r]
            }
            else {
                ans += rmax - height[r]
            }
            r--
        }
    }

    return ans
}
let height = [0,1,0,2,1,0,1,3,2,1,2,1]